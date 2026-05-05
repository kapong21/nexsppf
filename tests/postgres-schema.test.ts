import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('PostgreSQL migration contract', () => {
  it('defines serial uniqueness and one-active-warranty protection', () => {
    const sql = readFileSync('drizzle/0001_initial_warranty_system.sql', 'utf8');
    expect(sql).toContain('CREATE UNIQUE INDEX serials_serial_code_unique');
    expect(sql).toContain('CREATE UNIQUE INDEX warranties_one_active_per_serial_unique');
    expect(sql).toContain("WHERE status = 'active'");
  });

  it('seeds approved product warranty years including config-only PRO', () => {
    const sql = readFileSync('drizzle/0001_initial_warranty_system.sql', 'utf8');
    expect(sql).toContain("('B', 'BEGIN', 5, true");
    expect(sql).toContain("('P', 'PRIME', 6, true");
    expect(sql).toContain('parent_model_code text');
    expect(sql).toContain("('PRO', 'PRO', 8, true, NULL");
    expect(sql).toContain("('R75', 'PRO 7.5', 8, false, 'PRO'");
    expect(sql).toContain("('R85', 'PRO 8.5', 8, false, 'PRO'");
    expect(sql).toContain("('U', 'ULTIMATE', 9, true, NULL");
  });
});
