import { parseSerialCode, resolveProductFromSerial } from './serial';
import type { AuthSession } from './auth';

export type SerialForRegistration = {
  id: string;
  serialCode: string;
  modelCode: string;
  productName: string;
  status: 'issued' | 'assigned' | 'registered' | 'suspended' | 'invalid';
  dealerId: string | null;
};

export type DealerWarrantyRegistrationInput = {
  session: Pick<AuthSession, 'userId' | 'role' | 'dealerId'>;
  serialCode: string;
  customer: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
  };
  vehicle: {
    carBrand: string;
    carModel: string;
    carYear?: number;
    licensePlate: string;
    province?: string;
    chassisNo?: string;
  };
  install: {
    installDate: string;
    coverageType: string;
    carSize: string;
    notes?: string;
  };
};

export type CreateActiveWarrantyPayload = {
  serialId: string;
  dealerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  carBrand: string;
  carModel: string;
  carYear: number | null;
  licensePlate: string;
  province: string | null;
  chassisNo: string | null;
  installDate: string;
  warrantyStartDate: string;
  warrantyEndDate: string;
  coverageType: string;
  carSize: string;
  status: 'active';
  notes: string | null;
  createdBy: string;
};

export type CreatedWarranty = CreateActiveWarrantyPayload & {
  id: string;
};

export class DuplicateWarrantyRegistrationError extends Error {
  constructor(message = 'Duplicate warranty registration') {
    super(message);
    this.name = 'DuplicateWarrantyRegistrationError';
  }
}

export type WarrantyRegistrationRepository = {
  runInTransaction<T>(work: (transactionRepository: WarrantyRegistrationRepository) => Promise<T>): Promise<T>;
  findSerialForRegistration(serialCode: string): Promise<SerialForRegistration | null>;
  findActiveWarrantyBySerialId(serialId: string): Promise<{ id: string } | null>;
  createActiveWarranty(payload: CreateActiveWarrantyPayload): Promise<CreatedWarranty>;
  markSerialRegistered(serialId: string, dealerId: string): Promise<void>;
};

export type WarrantyRegistrationResult =
  | {
      ok: true;
      warrantyId: string;
      serialCode: string;
      productName: string;
      status: 'active';
    }
  | {
      ok: false;
      reason:
        | 'Dealer session required'
        | 'Serial not found'
        | 'Serial already registered'
        | 'Serial assigned to another dealer'
        | 'Serial product mismatch'
        | 'Serial is not registerable';
    };

export async function registerDealerWarranty(
  input: DealerWarrantyRegistrationInput,
  repository: WarrantyRegistrationRepository,
): Promise<WarrantyRegistrationResult> {
  if (input.session.role !== 'dealer' || !input.session.dealerId) {
    return { ok: false, reason: 'Dealer session required' };
  }

  const dealerId = input.session.dealerId;
  const parsed = parseSerialCode(input.serialCode);
  const product = resolveProductFromSerial(parsed.serialCode);

  try {
    return await repository.runInTransaction(async (transactionRepository) => {
      const serial = await transactionRepository.findSerialForRegistration(parsed.serialCode);

      if (!serial) {
        return { ok: false, reason: 'Serial not found' };
      }

      if (serial.modelCode !== parsed.modelCode || serial.modelCode !== product.modelCode) {
        return { ok: false, reason: 'Serial product mismatch' };
      }

      if (serial.status === 'registered') {
        return { ok: false, reason: 'Serial already registered' };
      }

      if (serial.status === 'suspended' || serial.status === 'invalid') {
        return { ok: false, reason: 'Serial is not registerable' };
      }

      if (serial.dealerId && serial.dealerId !== dealerId) {
        return { ok: false, reason: 'Serial assigned to another dealer' };
      }

      const existingWarranty = await transactionRepository.findActiveWarrantyBySerialId(serial.id);
      if (existingWarranty) {
        return { ok: false, reason: 'Serial already registered' };
      }

      const warrantyStartDate = input.install.installDate;
      const warrantyEndDate = addYearsToIsoDate(warrantyStartDate, product.warrantyYears);

      const created = await transactionRepository.createActiveWarranty({
        serialId: serial.id,
        dealerId,
        customerName: input.customer.customerName,
        customerPhone: input.customer.customerPhone,
        customerEmail: input.customer.customerEmail ?? null,
        carBrand: input.vehicle.carBrand,
        carModel: input.vehicle.carModel,
        carYear: input.vehicle.carYear ?? null,
        licensePlate: input.vehicle.licensePlate,
        province: input.vehicle.province ?? null,
        chassisNo: input.vehicle.chassisNo ?? null,
        installDate: input.install.installDate,
        warrantyStartDate,
        warrantyEndDate,
        coverageType: input.install.coverageType,
        carSize: input.install.carSize,
        status: 'active',
        notes: input.install.notes ?? null,
        createdBy: input.session.userId,
      });

      await transactionRepository.markSerialRegistered(serial.id, dealerId);

      return {
        ok: true,
        warrantyId: created.id,
        serialCode: serial.serialCode,
        productName: serial.productName,
        status: 'active',
      };
    });
  } catch (error) {
    if (error instanceof DuplicateWarrantyRegistrationError) {
      return { ok: false, reason: 'Serial already registered' };
    }
    throw error;
  }
}

function addYearsToIsoDate(isoDate: string, years: number): string {
  const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    throw new Error(`Invalid install date: ${isoDate}`);
  }

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, monthIndex, day));

  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== monthIndex || date.getUTCDate() !== day) {
    throw new Error(`Invalid install date: ${isoDate}`);
  }

  date.setUTCFullYear(year + years);
  return date.toISOString().slice(0, 10);
}
