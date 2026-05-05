import { describe, expect, it } from 'vitest';
import {
  APPROVED_PUBLIC_WORDING,
  FORBIDDEN_PUBLIC_CLAIM_TERMS,
  PUBLIC_PRODUCT_GROUPS,
  SITE_COPY,
  collectPublicContentText,
  findForbiddenPublicClaimTerms,
} from '../src/content/site-content';

describe('site content policy', () => {
  it('shows all 4 required public product groups in order', () => {
    expect(PUBLIC_PRODUCT_GROUPS.map((product) => product.name)).toEqual([
      'BEGIN',
      'PRIME',
      'PRO',
      'ULTIMATE',
    ]);
  });

  it('keeps approved warranty years for every public product group', () => {
    expect(PUBLIC_PRODUCT_GROUPS.map((product) => [product.name, product.warrantyYears])).toEqual([
      ['BEGIN', 5],
      ['PRIME', 6],
      ['PRO', 8],
      ['ULTIMATE', 9],
    ]);
  });

  it('keeps exact product model codes and image slots for public product groups', () => {
    expect(PUBLIC_PRODUCT_GROUPS.map((product) => [product.name, product.modelCode, product.imageSlot])).toEqual([
      ['BEGIN', 'B', 'begin_product_visual'],
      ['PRIME', 'P', 'prime_product_visual'],
      ['PRO', 'PRO', 'pro_product_visual'],
      ['ULTIMATE', 'U', 'ultimate_product_visual'],
    ]);
  });

  it('uses safe approved public wording categories', () => {
    expect(APPROVED_PUBLIC_WORDING).toContain('NEXS Paint Protection Film');
    expect(APPROVED_PUBLIC_WORDING).toContain('QR-based warranty verification');
    expect(APPROVED_PUBLIC_WORDING).toContain('Digital warranty card');
    expect(APPROVED_PUBLIC_WORDING).toContain('Professional dealer installation workflow');
    expect(APPROVED_PUBLIC_WORDING).toContain('Warranty-backed after-sales support');
  });

  it('does not contain forbidden public claim terms in site copy or product content', () => {
    const text = collectPublicContentText({ siteCopy: SITE_COPY, products: PUBLIC_PRODUCT_GROUPS });
    expect(findForbiddenPublicClaimTerms(text)).toEqual([]);
  });

  it('keeps forbidden public claim terms explicitly tracked', () => {
    expect(FORBIDDEN_PUBLIC_CLAIM_TERMS).toEqual(
      expect.arrayContaining([
        'Bayer',
        'Wanhua',
        'Covestro',
        'Lubrizol',
        'Ashland',
        'self-healing',
        'anti-yellowing',
        'non-yellowing',
        'chemical resistance',
        '1000+ colors',
        'made in USA',
      ]),
    );
  });

  it('detects forbidden public claim terms in arbitrary content', () => {
    expect(findForbiddenPublicClaimTerms('Made with Bayer material and self-healing performance.')).toEqual([
      'Bayer',
      'self-healing',
    ]);
  });
});
