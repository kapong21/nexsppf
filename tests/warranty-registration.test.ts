import { describe, expect, it } from 'vitest';
import { DuplicateWarrantyRegistrationError, registerDealerWarranty } from '@/lib/warranty-registration';
import type { DealerWarrantyRegistrationInput, WarrantyRegistrationRepository } from '@/lib/warranty-registration';

function baseInput(overrides: Partial<DealerWarrantyRegistrationInput> = {}): DealerWarrantyRegistrationInput {
  return {
    session: { userId: 'dealer-user-a', role: 'dealer', dealerId: 'dealer-a' },
    serialCode: 'B-1196MXY0401175Q',
    customer: {
      customerName: 'Somchai Customer',
      customerPhone: '0812341234',
      customerEmail: 'customer@example.com',
    },
    vehicle: {
      carBrand: 'Toyota',
      carModel: 'Camry',
      carYear: 2024,
      licensePlate: 'กข 1234',
      province: 'Bangkok',
      chassisNo: 'PRIVATECHASSIS123',
    },
    install: {
      installDate: '2026-05-05',
      coverageType: 'Full car',
      carSize: 'Standard',
      notes: 'internal dealer note',
    },
    ...overrides,
  };
}

function baseRepository(overrides: Partial<WarrantyRegistrationRepository> = {}): WarrantyRegistrationRepository {
  const repository: WarrantyRegistrationRepository = {
    async runInTransaction(work) {
      return work(repository);
    },
    async findSerialForRegistration(serialCode) {
      return { id: 'serial-1', serialCode, modelCode: 'B', productName: 'BEGIN', status: 'issued', dealerId: null };
    },
    async findActiveWarrantyBySerialId() {
      return null;
    },
    async createActiveWarranty(payload) {
      return { id: 'warranty-1', ...payload };
    },
    async markSerialRegistered() {},
  };

  return Object.assign(repository, overrides);
}

describe('POC-006 dealer warranty registration', () => {
  it('registers an existing unregistered serial and activates warranty through a transaction', async () => {
    const created: unknown[] = [];
    let transactionCalled = false;
    const repository = baseRepository();
    repository.runInTransaction = async (work) => {
      transactionCalled = true;
      return work(repository);
    };
    repository.createActiveWarranty = async (payload) => {
      created.push(payload);
      return { id: 'warranty-1', ...payload };
    };
    repository.markSerialRegistered = async (serialId, dealerId) => {
      created.push({ serialId, dealerId, status: 'registered' });
    };

    const result = await registerDealerWarranty(baseInput(), repository);

    expect(transactionCalled).toBe(true);
    expect(result).toMatchObject({ ok: true, warrantyId: 'warranty-1', serialCode: 'B-1196MXY0401175Q', status: 'active' });
    expect(created).toHaveLength(2);
    expect(created[0]).toMatchObject({
      serialId: 'serial-1',
      dealerId: 'dealer-a',
      customerName: 'Somchai Customer',
      customerPhone: '0812341234',
      carBrand: 'Toyota',
      warrantyStartDate: '2026-05-05',
      status: 'active',
      createdBy: 'dealer-user-a',
    });
  });

  it('rejects non-dealer session and dealer session without dealer_id', async () => {
    const repository = baseRepository();

    await expect(registerDealerWarranty(baseInput({ session: { userId: 'admin-1', role: 'admin', dealerId: null } }), repository)).resolves.toEqual({ ok: false, reason: 'Dealer session required' });
    await expect(registerDealerWarranty(baseInput({ session: { userId: 'dealer-no-id', role: 'dealer', dealerId: null } }), repository)).resolves.toEqual({ ok: false, reason: 'Dealer session required' });
  });

  it('rejects serial that does not exist', async () => {
    const repository = baseRepository({
      async findSerialForRegistration() {
        return null;
      },
      async createActiveWarranty() {
        throw new Error('should not write');
      },
      async markSerialRegistered() {
        throw new Error('should not write');
      },
    });

    await expect(registerDealerWarranty(baseInput({ serialCode: 'U-UNKNOWN' }), repository)).resolves.toEqual({ ok: false, reason: 'Serial not found' });
  });

  it('rejects serial that already has active warranty', async () => {
    const repository = baseRepository({
      async findSerialForRegistration(serialCode) {
        return { id: 'serial-1', serialCode, modelCode: 'B', productName: 'BEGIN', status: 'registered', dealerId: 'dealer-a' };
      },
      async findActiveWarrantyBySerialId() {
        return { id: 'existing-warranty' };
      },
      async createActiveWarranty() {
        throw new Error('should not write');
      },
    });

    await expect(registerDealerWarranty(baseInput(), repository)).resolves.toEqual({ ok: false, reason: 'Serial already registered' });
  });

  it('maps unique violation during transaction to duplicate registration rejection', async () => {
    const repository = baseRepository({
      async createActiveWarranty() {
        throw new DuplicateWarrantyRegistrationError();
      },
    });

    await expect(registerDealerWarranty(baseInput(), repository)).resolves.toEqual({ ok: false, reason: 'Serial already registered' });
  });

  it('rejects serial assigned to another dealer', async () => {
    const repository = baseRepository({
      async findSerialForRegistration(serialCode) {
        return { id: 'serial-1', serialCode, modelCode: 'B', productName: 'BEGIN', status: 'assigned', dealerId: 'dealer-b' };
      },
      async createActiveWarranty() {
        throw new Error('should not write');
      },
    });

    await expect(registerDealerWarranty(baseInput(), repository)).resolves.toEqual({ ok: false, reason: 'Serial assigned to another dealer' });
  });

  it('rejects mismatched model_code between serial identity and database record', async () => {
    const repository = baseRepository({
      async findSerialForRegistration(serialCode) {
        return { id: 'serial-1', serialCode, modelCode: 'P', productName: 'PRIME', status: 'issued', dealerId: null };
      },
      async createActiveWarranty() {
        throw new Error('should not write');
      },
    });

    await expect(registerDealerWarranty(baseInput({ serialCode: 'B-1196MXY0401175Q' }), repository)).resolves.toEqual({ ok: false, reason: 'Serial product mismatch' });
  });

  it('supports PRO variant serial registration', async () => {
    const repository = baseRepository({
      async findSerialForRegistration(serialCode) {
        return { id: 'serial-r75', serialCode, modelCode: 'R75', productName: 'PRO 7.5', status: 'issued', dealerId: null };
      },
      async createActiveWarranty(payload) {
        return { id: 'warranty-r75', ...payload };
      },
    });

    const result = await registerDealerWarranty(baseInput({ serialCode: 'R75-1196MXY0401178Q' }), repository);
    expect(result).toMatchObject({ ok: true, warrantyId: 'warranty-r75', productName: 'PRO 7.5', status: 'active' });
  });
});
