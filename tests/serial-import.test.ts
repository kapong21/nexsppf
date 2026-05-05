import { describe, expect, it } from 'vitest';
import { confirmSerialImport, dryRunSerialImport } from '@/lib/serial-import';
import type { SerialImportRepository } from '@/lib/serial-import';

const validCsv = `serial_code,model_code,factory_serial,product_name,factory_name,batch_no,status
B-1196MXY0401175Q,B,1196MXY0401175Q,BEGIN,Factory A,BATCH-001,issued
P-1196MXY0401176Q,P,1196MXY0401176Q,PRIME,Factory A,BATCH-001,issued
PRO-1196MXY0401178Q,PRO,1196MXY0401178Q,PRO,Factory B,BATCH-PRO-001,issued
R75-1196MXY0401178Q,R75,1196MXY0401178Q,PRO 7.5,Factory B,BATCH-PRO-001,issued
R85-1196MXY0401179Q,R85,1196MXY0401179Q,PRO 8.5,Factory B,BATCH-PRO-001,issued
U-1196MXY0401177Q,U,1196MXY0401177Q,ULTIMATE,Factory A,BATCH-001,issued`;

describe('POC-007 admin serial CSV import dry-run', () => {
  it('dry-runs valid CSV without writing and returns preview rows', async () => {
    let writeCalled = false;
    const repository: SerialImportRepository = {
      async findExistingSerialCodes() {
        return new Set();
      },
      async insertSerials() {
        writeCalled = true;
      },
    };

    const result = await dryRunSerialImport(validCsv, repository);

    expect(result.ok).toBe(true);
    expect(result.summary).toEqual({ totalRows: 6, validRows: 6, errorRows: 0 });
    expect(result.validRows.map((row) => row.modelCode)).toEqual(['B', 'P', 'PRO', 'R75', 'R85', 'U']);
    expect(writeCalled).toBe(false);
  });

  it('detects duplicate serials inside the same CSV file', async () => {
    const csv = `serial_code,model_code,factory_serial,product_name,factory_name,batch_no,status
B-1196MXY0401175Q,B,1196MXY0401175Q,BEGIN,Factory A,BATCH-001,issued
B-1196MXY0401175Q,B,1196MXY0401175Q,BEGIN,Factory A,BATCH-001,issued`;
    const repository: SerialImportRepository = {
      async findExistingSerialCodes() {
        return new Set();
      },
      async insertSerials() {
        throw new Error('dry-run should not write');
      },
    };

    const result = await dryRunSerialImport(csv, repository);

    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({ rowNumber: 3, serialCode: 'B-1196MXY0401175Q', reason: 'Duplicate serial in file' });
  });

  it('detects serials that already exist in database', async () => {
    const repository: SerialImportRepository = {
      async findExistingSerialCodes() {
        return new Set(['P-1196MXY0401176Q']);
      },
      async insertSerials() {
        throw new Error('dry-run should not write');
      },
    };

    const result = await dryRunSerialImport(validCsv, repository);

    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({ rowNumber: 3, serialCode: 'P-1196MXY0401176Q', reason: 'Duplicate serial already exists' });
  });

  it('detects malformed serial, model mismatch, unknown model_code, and unsupported status', async () => {
    const csv = `serial_code,model_code,factory_serial,product_name,factory_name,batch_no,status
BADVALUE,B,1196MXY0401175Q,BEGIN,Factory A,BATCH-001,issued
B-1196MXY0401175Q,P,1196MXY0401175Q,PRIME,Factory A,BATCH-001,issued
X-1196MXY0401176Q,X,1196MXY0401176Q,UNKNOWN,Factory A,BATCH-001,issued
U-1196MXY0401177Q,U,1196MXY0401177Q,ULTIMATE,Factory A,BATCH-001,active`;
    const repository: SerialImportRepository = {
      async findExistingSerialCodes() {
        return new Set();
      },
      async insertSerials() {
        throw new Error('dry-run should not write');
      },
    };

    const result = await dryRunSerialImport(csv, repository);

    expect(result.ok).toBe(false);
    expect(result.errors).toEqual([
      { rowNumber: 2, serialCode: 'BADVALUE', reason: 'Malformed serial_code' },
      { rowNumber: 3, serialCode: 'B-1196MXY0401175Q', reason: 'model_code does not match serial_code prefix' },
      { rowNumber: 4, serialCode: 'X-1196MXY0401176Q', reason: 'Unknown model_code' },
      { rowNumber: 5, serialCode: 'U-1196MXY0401177Q', reason: 'Unsupported serial status' },
    ]);
  });

  it('confirm import writes only after a clean dry-run', async () => {
    const inserted: unknown[] = [];
    const repository: SerialImportRepository = {
      async findExistingSerialCodes() {
        return new Set();
      },
      async insertSerials(rows) {
        inserted.push(...rows);
      },
    };

    const result = await confirmSerialImport(validCsv, repository);

    expect(result.ok).toBe(true);
    expect(result.summary).toEqual({ totalRows: 6, validRows: 6, errorRows: 0 });
    expect(inserted).toHaveLength(6);
  });

  it('confirm import does not write when dry-run has errors', async () => {
    let writeCalled = false;
    const csv = `serial_code,model_code,factory_serial,product_name,factory_name,batch_no,status
X-1196MXY0401176Q,X,1196MXY0401176Q,UNKNOWN,Factory A,BATCH-001,issued`;
    const repository: SerialImportRepository = {
      async findExistingSerialCodes() {
        return new Set();
      },
      async insertSerials() {
        writeCalled = true;
      },
    };

    const result = await confirmSerialImport(csv, repository);

    expect(result.ok).toBe(false);
    expect(writeCalled).toBe(false);
  });
});
