import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PUBLIC_PRODUCT_GROUPS, SITE_COPY, findForbiddenPublicClaimTerms } from '../src/content/site-content';

const repoRoot = process.cwd();
const readRepoFile = (relativePath: string) => readFileSync(join(repoRoot, relativePath), 'utf8');

const publicRouteSources = [
  'src/app/page.tsx',
  'src/app/products/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/dealer/page.tsx',
  'src/app/warranty/page.tsx',
  'src/app/r/[serial]/page.tsx',
].map((relativePath) => ({ relativePath, content: readRepoFile(relativePath) }));

describe('premium public site correction contract', () => {
  it('removes internal placeholder and implementation notes from public route sources', () => {
    const blockedPublicTerms = [
      'static skeleton',
      'ก่อนต่อ database',
      'database จริง',
      'เมื่อเปิดใช้งานฟอร์มจริง',
      'เปิดใช้งานฟอร์มจริง',
      'Product family visual',
      'visual band',
      'mood/detail',
      'TODO',
    ];

    for (const source of publicRouteSources) {
      for (const term of blockedPublicTerms) {
        expect(source.content, `${source.relativePath} must not expose internal term: ${term}`).not.toContain(term);
      }
    }
  });

  it('keeps all public route sources free from forbidden claims, pricing, supplier, and claim-approval wording', () => {
    const blockedTerms = [
      'claim approved',
      'เคลมได้ทันที',
      'dealer price',
      'supplier cost',
      'factory cost',
      'margin',
      'discount',
      'promotion',
      'Bayer',
      'Lubrizol',
      'Covestro',
      'BASF',
      'self-healing',
      'anti-yellowing',
      'non-yellowing',
      'optical clarity',
    ];

    for (const source of publicRouteSources) {
      for (const term of blockedTerms) {
        expect(source.content.toLowerCase(), `${source.relativePath} must not include ${term}`).not.toContain(term.toLowerCase());
      }
      expect(findForbiddenPublicClaimTerms(source.content), `${source.relativePath} must pass claim scanner`).toEqual([]);
    }
  });

  it('promotes NEXS differentiators in the homepage hero and trust bar', () => {
    // Content that the homepage renders may live in dedicated content modules.
    // Combine the page source with those modules so the assertions stay valid
    // when strings are extracted into typed constants (spec v5.2 refactor).
    const home = [
      'src/app/page.tsx',
      'src/content/spec-v52.ts',
    ]
      .map(readRepoFile)
      .join('\n');

    expect(SITE_COPY.homeHero.primaryCta).toBe('ดูสินค้า');
    expect(SITE_COPY.homeHero.secondaryCta).toBe('Book Consultation');
    expect(SITE_COPY.homeHero.tertiaryCta).toBe('ตรวจสอบบัตรรับประกัน');
    expect(SITE_COPY.homeHero.subtitle).toContain('Digital Warranty');
    expect(SITE_COPY.homeHero.subtitle).toContain('บัตรรับประกันดิจิทัล');
    expect(SITE_COPY.homeHero.subtitle).toContain('ตรวจสอบได้ผ่าน QR Code');
    expect(SITE_COPY.homeHero.subtitle).toContain('Serial');

    expect(home).toContain('THINK NEW. THINK NEXS.');
    expect(home).toContain('Engineered to Be Invisible. Better Than Day One.');
    expect(home).toContain('Lifetime up to 10 Years');
    expect(home).toContain('Digital Warranty');
    expect(home).toContain('12 Film Options');
  });

  it('adds decision-support fields and product-specific CTAs for all public products', () => {
    expect(PUBLIC_PRODUCT_GROUPS).toHaveLength(4);

    for (const product of PUBLIC_PRODUCT_GROUPS) {
      const productDecision = product as unknown as {
        suitableFor?: string;
        keyDifference?: string;
        protectionLevel?: string;
        packageSuggestion?: string;
        decisionLabel?: string;
        primaryCta?: string;
      };

      expect(productDecision.suitableFor, `${product.name} needs suitableFor`).toMatch(/^เหมาะสำหรับ/);
      expect(productDecision.keyDifference, `${product.name} needs keyDifference`).toBeTruthy();
      expect(productDecision.protectionLevel, `${product.name} needs protectionLevel`).toMatch(/ระดับการปกป้อง/);
      expect(productDecision.packageSuggestion, `${product.name} needs packageSuggestion`).toMatch(/แพ็กเกจที่เหมาะ/);
      expect(productDecision.decisionLabel, `${product.name} needs decisionLabel`).toBeTruthy();
      expect(productDecision.primaryCta).toBe('Book Consultation');
    }
  });

  it('renders product decision support and a 4-tier comparison table on the products page', () => {
    const productsPage = readRepoFile('src/app/products/page.tsx');

    expect(productsPage).toContain('ComparisonMatrix');
    expect(productsPage).toContain('CategoryOverview');
    expect(productsPage).toContain('Film Systems');
    expect(productsPage).toContain('Compare All');

    for (const product of PUBLIC_PRODUCT_GROUPS) {
      expect(product.primaryCta).toBe('Book Consultation');
      expect(product.warrantyLabel).toMatch(/รับประกัน \d ปี/);
    }
  });

  it('reframes warranty as a premium selling point without allowing customer self-activation', () => {
    const warrantyPage = readRepoFile('src/app/warranty/page.tsx');

    expect(warrantyPage).toContain('premium-warranty-hero');
    expect(warrantyPage).toContain('Digital Warranty');
    expect(warrantyPage).toContain('Serial Number');
    expect(warrantyPage).toContain('กรอกหมายเลข Serial Number');
    expect(warrantyPage).toContain('Dealer/Admin ลงทะเบียน');
    expect(warrantyPage).toContain('ลูกค้าไม่สามารถเปิดใช้งานบัตรรับประกันเอง');
  });

  it('adds fast contact shortcuts without inventing unapproved contact details', () => {
    const contactPage = readRepoFile('src/app/contact/page.tsx');
    const quickContact = (SITE_COPY as unknown as {
      quickContact?: readonly { label: string; value: string; status: string }[];
    }).quickContact;

    expect(contactPage).toContain('quick-contact-grid');
    expect(quickContact?.map((item) => item.label)).toEqual(['LINE', 'Facebook', 'Instagram', 'TikTok', 'YouTube']);
    expect(quickContact?.map((item) => item.value)).toEqual(['nexsppf', 'nexsppf', '@nexsppf', '@nexsppf', '@nexsppf']);
  });

  it('adds dealer trust proof, dealer program CTA, safe inspection process, and FAQ sections', () => {
    const home = readRepoFile('src/app/page.tsx');
    const dealerPage = readRepoFile('src/app/dealer/page.tsx');
    const warrantyPage = readRepoFile('src/app/warranty/page.tsx');

    expect(home).toContain('FAQ Preview');
    expect(SITE_COPY.trustProof.map((proof) => proof.title)).toContain('Authorized Dealer');
    expect(SITE_COPY.trustProof.map((proof) => proof.title)).toContain('Warranty Coverage');
    expect(SITE_COPY.faq.length).toBeGreaterThanOrEqual(3);
    expect(SITE_COPY.claimProcess.map((step) => step.title).join(' ')).toContain('ตรวจสอบ');

    expect(dealerPage).toContain('../for-dealers/page');

    expect(warrantyPage).toContain('inspection-process');
    expect(warrantyPage).toContain('ส่งคำขอตรวจสอบ');
    expect(warrantyPage).toContain('ไม่ใช่การอนุมัติเคลมอัตโนมัติ');
  });
});
