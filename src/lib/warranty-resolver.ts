import { parseSerialCode } from './serial';

export type SerialRecord = {
  id: string;
  serialCode: string;
  modelCode: string;
  productName: string;
  status: string;
  dealerName: string | null;
};

export type ActiveWarrantyRecord = {
  serialId: string;
  customerPhone: string;
  customerEmail: string | null;
  licensePlate: string;
  chassisNo: string | null;
  carBrand: string;
  carModel: string;
  installDate: string;
  warrantyStartDate: string;
  warrantyEndDate: string;
  coverageType: string;
};

export type WarrantyLookupRepository = {
  findSerial(serialCode: string): Promise<SerialRecord | null>;
  findActiveWarranty(serialId: string): Promise<ActiveWarrantyRecord | null>;
};

export type PublicWarrantyStatus =
  | {
      status: 'Active';
      productSeries: string;
      serialNumber: string;
      vehicle: string;
      licensePlate: string;
      customerPhone: string;
      installationDate: string;
      warrantyExpiryDate: string;
      dealerInstaller: string | null;
      warrantyCoverage: string;
    }
  | {
      status: 'Not Registered';
      productSeries: string;
      serialNumber: string;
      message: string;
      instruction: string;
      dealerLoginPath: '/login';
    }
  | {
      status: 'Invalid / Not Found';
      message: string;
    };

export async function resolveWarrantyStatus(
  input: string,
  repository: WarrantyLookupRepository,
): Promise<PublicWarrantyStatus> {
  const { serialCode } = parseSerialCode(input);
  const serial = await repository.findSerial(serialCode);

  if (!serial) {
    return { status: 'Invalid / Not Found', message: 'This QR code is not found in the NEXS system.' };
  }

  const activeWarranty = await repository.findActiveWarranty(serial.id);

  if (!activeWarranty) {
    return {
      status: 'Not Registered',
      productSeries: serial.productName,
      serialNumber: serial.serialCode,
      message: 'This warranty code has not been registered yet.',
      instruction: 'Please contact your installer/dealer to complete warranty registration.',
      dealerLoginPath: '/login',
    };
  }

  return {
    status: 'Active',
    productSeries: serial.productName,
    serialNumber: serial.serialCode,
    vehicle: `${activeWarranty.carBrand} ${activeWarranty.carModel}`,
    licensePlate: maskLicensePlate(activeWarranty.licensePlate),
    customerPhone: maskPhone(activeWarranty.customerPhone),
    installationDate: activeWarranty.installDate,
    warrantyExpiryDate: activeWarranty.warrantyEndDate,
    dealerInstaller: serial.dealerName,
    warrantyCoverage: activeWarranty.coverageType,
  };
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7) return 'xxx';
  return `${digits.slice(0, 3)}-xxx-${digits.slice(-4)}`;
}

export function maskLicensePlate(licensePlate: string): string {
  const trimmed = licensePlate.trim();
  if (trimmed.length <= 3) return 'xxx';
  return `${trimmed.slice(0, 2)}***${trimmed.slice(-2)}`;
}
