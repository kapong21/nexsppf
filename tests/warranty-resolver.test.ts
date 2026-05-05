import { describe, expect, it } from 'vitest';
import { resolveWarrantyStatus } from '@/lib/warranty-resolver';
import type { WarrantyLookupRepository } from '@/lib/warranty-resolver';

const repository: WarrantyLookupRepository = {
  async findSerial(serialCode) {
    if (serialCode === 'B-1196MXY0401175Q') {
      return { id: 'serial-1', serialCode, modelCode: 'B', productName: 'BEGIN', status: 'registered', dealerName: 'NEXS Dealer A' };
    }
    if (serialCode === 'P-1196MXY0401176Q') {
      return { id: 'serial-2', serialCode, modelCode: 'P', productName: 'PRIME', status: 'issued', dealerName: null };
    }
    return null;
  },
  async findActiveWarranty(serialId) {
    if (serialId !== 'serial-1') return null;
    return {
      serialId,
      customerPhone: '0812341234',
      customerEmail: 'customer@example.com',
      licensePlate: 'กข 1234',
      chassisNo: 'SECRETCHASSIS123',
      carBrand: 'Toyota',
      carModel: 'Camry',
      installDate: '2026-05-01',
      warrantyStartDate: '2026-05-01',
      warrantyEndDate: '2031-05-01',
      coverageType: 'Full car',
    };
  },
};

describe('QR warranty resolver', () => {
  it('returns Active with masked public data when serial has active warranty', async () => {
    const result = await resolveWarrantyStatus('B-1196MXY0401175Q', repository);
    expect(result.status).toBe('Active');
    if (result.status !== 'Active') throw new Error('Expected Active result');
    expect(result.serialNumber).toBe('B-1196MXY0401175Q');
    expect(result.productSeries).toBe('BEGIN');
    expect(result.customerPhone).toBe('081-xxx-1234');
    expect(JSON.stringify(result)).not.toContain('customer@example.com');
    expect(JSON.stringify(result)).not.toContain('SECRETCHASSIS123');
  });

  it('returns Not Registered when serial exists without active warranty', async () => {
    const result = await resolveWarrantyStatus('P-1196MXY0401176Q', repository);
    expect(result).toMatchObject({ status: 'Not Registered', serialNumber: 'P-1196MXY0401176Q', productSeries: 'PRIME' });
  });

  it('returns Invalid / Not Found when serial does not exist', async () => {
    const result = await resolveWarrantyStatus('U-1196MXY0401177Q', repository);
    expect(result).toEqual({ status: 'Invalid / Not Found', message: 'This QR code is not found in the NEXS system.' });
  });
});
