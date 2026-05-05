import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();
const publicPageSources = [
  'src/app/page.tsx',
  'src/app/products/page.tsx',
  'src/app/dealer/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/warranty/page.tsx',
  'src/app/r/[serial]/page.tsx',
].map((relativePath) => ({
  relativePath,
  content: readFileSync(join(repoRoot, relativePath), 'utf8'),
}));

describe('public copy cleanup pass', () => {
  it('removes machine-like warranty wording from public pages', () => {
    const blockedTerms = ['masked @', 'maintenance summary', 'request inspection', 'issue request'];

    for (const source of publicPageSources) {
      for (const term of blockedTerms) {
        expect(source.content, `${source.relativePath} should not include ${term}`).not.toContain(term);
      }
    }
  });

  it('removes database identity wording from public page source', () => {
    const blockedTerms = ['serial_code', 'primary identity', 'full URL', 'FULL', 'database logic'];

    for (const source of publicPageSources) {
      for (const term of blockedTerms) {
        expect(source.content, `${source.relativePath} should not include ${term}`).not.toContain(term);
      }
    }
  });

  it('uses customer-facing QR warranty explanation on homepage', () => {
    const home = readFileSync(join(repoRoot, 'src/app/page.tsx'), 'utf8');

    expect(home).toContain('ตรวจสอบสินค้าและบัตรรับประกันผ่าน QR Code');
    expect(home).toContain('QR Code และ Serial Number ช่วยให้ลูกค้าตรวจสอบสถานะสินค้าและบัตรรับประกันได้อย่างชัดเจน');
  });
});
