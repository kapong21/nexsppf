import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PUBLIC_PRODUCT_GROUPS, SITE_COPY } from '../src/content/site-content';

const repoRoot = process.cwd();
const publicSources = [
  'src/app/page.tsx',
  'src/app/products/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/dealer/page.tsx',
  'src/app/warranty/page.tsx',
  'src/app/r/[serial]/page.tsx',
].map((relativePath) => ({ relativePath, content: readFileSync(join(repoRoot, relativePath), 'utf8') }));

describe('launch readiness polish public contract', () => {
  it('removes internal/product-management wording from public page sources', () => {
    const blockedTerms = [
      'warranty years',
      'positioning',
      'CTA',
      'safe wording',
      'guardrail',
      'primary identity',
      'serial_code',
      'database logic',
      'สื่อสารได้อย่างปลอดภัย',
      'คำกล่าวอ้างที่ยังไม่อนุมัติ',
    ];

    for (const source of publicSources) {
      for (const term of blockedTerms) {
        expect(source.content, `${source.relativePath} should not include ${term}`).not.toContain(term);
      }
    }
  });

  it('uses customer-facing product intro and Why NEXS copy', () => {
    // Thai tagline is now exported from src/content/spec-v52.ts and rendered
    // in the homepage stat strip. Combine sources so the assertion survives
    // the spec v5.2 content extraction refactor.
    const homeBundle = [
      'src/app/page.tsx',
      'src/content/spec-v52.ts',
    ]
      .map((path) => readFileSync(join(repoRoot, path), 'utf8'))
      .join('\n');

    expect(homeBundle).toContain('ฟิล์มรถยนต์ระดับพรีเมียม 3 กลุ่ม 12 ทางเลือก');
    expect(SITE_COPY.whyNexs.description).toBe('มั่นใจได้ด้วยระบบลงทะเบียนสินค้า ตรวจสอบสถานะรับประกัน และติดตามประวัติการดูแลหลังติดตั้ง');
  });

  it('defines Thai product decision support labels', () => {
    expect(PUBLIC_PRODUCT_GROUPS.map((product) => product.badge)).toEqual(['เริ่มต้น', 'รุ่นแนะนำ', 'พรีเมียม', 'รุ่นสูงสุด']);
    for (const product of PUBLIC_PRODUCT_GROUPS) {
      expect(product.warrantyLabel).toBe(`รับประกัน ${product.warrantyYears} ปี`);
      expect(product.benefits.length).toBeGreaterThanOrEqual(2);
      expect(product.primaryCta).toBe('Book Consultation');
      expect(product.secondaryCta).toBe('ดูรายละเอียด');
    }
  });

  it('defines Thai contact dropdown values and PDPA readiness copy', () => {
    expect(SITE_COPY.leadForm.customerTypes).toEqual([
      'ลูกค้าสนใจติดตั้ง',
      'ร้านค้าสนใจสมัครตัวแทนจำหน่าย',
      'สอบถามเรื่องบัตรรับประกัน',
      'อื่น ๆ',
    ]);
    expect(SITE_COPY.leadForm.submitCta).toBe('ส่งข้อมูลให้ทีมงานติดต่อกลับ');
    expect(SITE_COPY.leadForm.requiredFields).toEqual(['name', 'phone', 'province', 'customerType', 'pdpaConsent']);
    expect(SITE_COPY.leadForm.pdpaConsentLabel).toContain('ยินยอมให้ทีมงาน NEXS ติดต่อกลับ');
  });

  it('renders branded warranty mockup and 4-step warranty flow on homepage', () => {
    const home = readFileSync(join(repoRoot, 'src/app/page.tsx'), 'utf8');

    expect(home).toContain('NEXS Digital Warranty');
    expect(home).toContain('Active');
    expect(home).toContain('ติดตั้งกับตัวแทนจำหน่าย');
    expect(home).toContain('Dealer ลงทะเบียน Serial');
    expect(home).toContain('ลูกค้าสแกน QR Code');
    expect(home).toContain('ดู Digital Warranty Card และประวัติการดูแลได้');
  });
});
