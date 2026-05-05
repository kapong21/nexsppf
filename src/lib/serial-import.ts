import { parseSerialCode, PRODUCT_CONFIG } from './serial';

export type SerialImportRow = {
  serialCode: string;
  modelCode: string;
  factorySerial: string;
  productName: string;
  factoryName: string | null;
  batchNo: string | null;
  status: 'issued' | 'assigned' | 'registered' | 'suspended' | 'invalid';
};

export type SerialImportError = {
  rowNumber: number;
  serialCode: string;
  reason:
    | 'Malformed serial_code'
    | 'model_code does not match serial_code prefix'
    | 'Unknown model_code'
    | 'Unsupported serial status'
    | 'Duplicate serial in file'
    | 'Duplicate serial already exists'
    | 'Missing required field';
};

export type SerialImportSummary = {
  totalRows: number;
  validRows: number;
  errorRows: number;
};

export type SerialImportResult = {
  ok: boolean;
  summary: SerialImportSummary;
  validRows: SerialImportRow[];
  errors: SerialImportError[];
};

export type SerialImportRepository = {
  findExistingSerialCodes(serialCodes: string[]): Promise<Set<string>>;
  insertSerials(rows: SerialImportRow[]): Promise<void>;
};

const REQUIRED_HEADERS = ['serial_code', 'model_code', 'factory_serial', 'product_name', 'factory_name', 'batch_no', 'status'] as const;
const SUPPORTED_STATUSES = new Set(['issued', 'assigned', 'registered', 'suspended', 'invalid']);

export async function dryRunSerialImport(csv: string, repository: SerialImportRepository): Promise<SerialImportResult> {
  const parsed = parseCsv(csv);
  const seen = new Set<string>();
  const errors: SerialImportError[] = [];
  const candidateRows: Array<{ rowNumber: number; row: SerialImportRow }> = [];

  for (const parsedRow of parsed.rows) {
    const serialCode = parsedRow.values.serial_code?.trim().toUpperCase() ?? '';
    const modelCode = parsedRow.values.model_code?.trim().toUpperCase() ?? '';
    const status = parsedRow.values.status?.trim().toLowerCase() ?? '';

    if (!serialCode || !modelCode || !parsedRow.values.factory_serial || !parsedRow.values.product_name || !status) {
      errors.push({ rowNumber: parsedRow.rowNumber, serialCode, reason: 'Missing required field' });
      continue;
    }

    let parsedSerial: ReturnType<typeof parseSerialCode>;
    try {
      parsedSerial = parseSerialCode(serialCode);
    } catch {
      errors.push({ rowNumber: parsedRow.rowNumber, serialCode, reason: 'Malformed serial_code' });
      continue;
    }

    if (parsedSerial.modelCode !== modelCode) {
      errors.push({ rowNumber: parsedRow.rowNumber, serialCode, reason: 'model_code does not match serial_code prefix' });
      continue;
    }

    if (!PRODUCT_CONFIG[modelCode]) {
      errors.push({ rowNumber: parsedRow.rowNumber, serialCode, reason: 'Unknown model_code' });
      continue;
    }

    if (!SUPPORTED_STATUSES.has(status)) {
      errors.push({ rowNumber: parsedRow.rowNumber, serialCode, reason: 'Unsupported serial status' });
      continue;
    }

    if (seen.has(serialCode)) {
      errors.push({ rowNumber: parsedRow.rowNumber, serialCode, reason: 'Duplicate serial in file' });
      continue;
    }
    seen.add(serialCode);

    candidateRows.push({
      rowNumber: parsedRow.rowNumber,
      row: {
        serialCode,
        modelCode,
        factorySerial: parsedRow.values.factory_serial.trim(),
        productName: parsedRow.values.product_name.trim(),
        factoryName: optionalText(parsedRow.values.factory_name),
        batchNo: optionalText(parsedRow.values.batch_no),
        status: status as SerialImportRow['status'],
      },
    });
  }

  const existing = await repository.findExistingSerialCodes(candidateRows.map((candidate) => candidate.row.serialCode));
  const validRows: SerialImportRow[] = [];

  for (const candidate of candidateRows) {
    if (existing.has(candidate.row.serialCode)) {
      errors.push({ rowNumber: candidate.rowNumber, serialCode: candidate.row.serialCode, reason: 'Duplicate serial already exists' });
      continue;
    }
    validRows.push(candidate.row);
  }

  return {
    ok: errors.length === 0,
    summary: {
      totalRows: parsed.rows.length,
      validRows: validRows.length,
      errorRows: errors.length,
    },
    validRows,
    errors,
  };
}

export async function confirmSerialImport(csv: string, repository: SerialImportRepository): Promise<SerialImportResult> {
  const result = await dryRunSerialImport(csv, repository);
  if (!result.ok) {
    return result;
  }

  await repository.insertSerials(result.validRows);
  return result;
}

function parseCsv(csv: string): { rows: Array<{ rowNumber: number; values: Record<string, string> }> } {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return { rows: [] };
  }

  const headers = splitCsvLine(lines[0]).map((header) => header.trim());
  for (const required of REQUIRED_HEADERS) {
    if (!headers.includes(required)) {
      throw new Error(`Missing required CSV header: ${required}`);
    }
  }

  const rows = lines.slice(1).map((line, index) => {
    const cells = splitCsvLine(line);
    const values: Record<string, string> = {};
    headers.forEach((header, cellIndex) => {
      values[header] = cells[cellIndex] ?? '';
    });
    return { rowNumber: index + 2, values };
  });

  return { rows };
}

function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === ',' && !inQuotes) {
      cells.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  cells.push(current);
  return cells.map((cell) => cell.trim());
}

function optionalText(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}
