import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  VARIANT_B_NAV_ITEMS,
  VARIANT_B_PAGES,
  VARIANT_B_PRODUCT_CARDS,
  collectVariantBPublicText,
} from '../src/content/variant-b-preview';
import { findForbiddenPublicClaimTerms } from '../src/content/site-content';

const repoFile = (path: string) => readFileSync(path, 'utf8');

describe('Variant B preview design contract', () => {
  it('defines isolated preview routes for all approved public pages', () => {
    expect(VARIANT_B_PAGES.map((page) => page.path)).toEqual([
      '/preview-redesign',
      '/preview-redesign/products',
      '/preview-redesign/warranty',
      '/preview-redesign/dealer',
      '/preview-redesign/contact',
    ]);

    expect(VARIANT_B_PAGES.every((page) => page.variant === 'B')).toBe(true);
    expect(VARIANT_B_PAGES.every((page) => page.productionReady === false)).toBe(true);
  });

  it('keeps Variant B navigation inside the preview namespace', () => {
    expect(VARIANT_B_NAV_ITEMS).toEqual([
      { label: 'หน้าแรก', href: '/preview-redesign' },
      { label: 'สินค้า', href: '/preview-redesign/products' },
      { label: 'บัตรรับประกัน', href: '/preview-redesign/warranty' },
      { label: 'ตัวแทนจำหน่าย', href: '/preview-redesign/dealer' },
      { label: 'ติดต่อเรา', href: '/preview-redesign/contact' },
    ]);
  });

  it('uses exactly four public product cards with approved warranty years', () => {
    expect(VARIANT_B_PRODUCT_CARDS.map((card) => [card.name, card.modelCode, card.warrantyYears])).toEqual([
      ['BEGIN', 'B', 5],
      ['PRIME', 'P', 6],
      ['PRO', 'PRO', 8],
      ['ULTIMATE', 'U', 9],
    ]);
  });

  it('contains no forbidden public claims or public pricing numbers', () => {
    const publicText = collectVariantBPublicText();
    expect(findForbiddenPublicClaimTerms(publicText)).toEqual([]);
    expect(publicText).not.toMatch(/฿|บาท|dealer price|factory cost|margin|discount|promotion/i);
    expect(publicText).toContain('สอบถามราคา');
  });

  it('creates preview page files without changing existing production route files', () => {
    const previewShell = repoFile('src/app/preview-redesign/variant-b-preview.tsx');
    const homePage = repoFile('src/app/preview-redesign/page.tsx');
    const productsPage = repoFile('src/app/preview-redesign/products/page.tsx');
    const warrantyPage = repoFile('src/app/preview-redesign/warranty/page.tsx');
    const dealerPage = repoFile('src/app/preview-redesign/dealer/page.tsx');
    const contactPage = repoFile('src/app/preview-redesign/contact/page.tsx');

    for (const file of [previewShell, homePage, productsPage, warrantyPage, dealerPage, contactPage]) {
      expect(file).toContain('Variant B');
      expect(file).not.toContain('PrototypeNav');
      expect(file).not.toContain('TweaksPanel');
      expect(file).not.toContain('unpkg.com');
    }
  });
});
