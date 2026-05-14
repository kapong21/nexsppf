import { describe, expect, it } from 'vitest';
import { FORBIDDEN_PUBLIC_CLAIM_TERMS, findForbiddenPublicClaimTerms } from '../src/content/site-content';
import { BRAND_STRINGS } from '../src/lib/design-tokens';

describe('brand guardrails', () => {
  it('blocks "Shine and Shield" in any capitalisation', () => {
    expect(findForbiddenPublicClaimTerms('Shine and Shield is our best film')).toContain('Shine and Shield');
    expect(findForbiddenPublicClaimTerms('shine and shield coating')).toContain('Shine and Shield');
  });

  it('blocks "Shine & Shield" variant', () => {
    expect(findForbiddenPublicClaimTerms('Shine & Shield premium')).toContain('Shine & Shield');
  });

  it('enforces correct brand tagline', () => {
    expect(BRAND_STRINGS.tagline).toBe('ENGINEERED FOR PERFECT SURFACES');
  });

  it('enforces correct sub-tagline', () => {
    expect(BRAND_STRINGS.subTagline).toBe('Think New. Think NEXS.');
  });

  it('enforces correct hero headline', () => {
    expect(BRAND_STRINGS.heroHeadline).toBe('Engineered to Be Invisible. Better Than Day One.');
  });

  it('enforces correct Thai hero headline', () => {
    expect(BRAND_STRINGS.heroThaiHeadline).toBe('ยิ่งมองไม่เห็นฟิล์ม ยิ่งเห็นความสมบูรณ์แบบ');
  });

  it('enforces correct hero quote', () => {
    expect(BRAND_STRINGS.heroQuote).toBe('A Higher Standard for Invisible Surfaces.');
  });

  it('enforces correct contact handle', () => {
    expect(BRAND_STRINGS.contactHandle).toBe('nexsppf');
  });

  it('blocks pricing terms', () => {
    const pricingTerms = ['dealer price', 'retail installed price', 'dealer roll price', 'factory cost', 'margin'];
    for (const term of pricingTerms) {
      expect(FORBIDDEN_PUBLIC_CLAIM_TERMS).toContain(term);
    }
  });

  it('blocks discount and promotion terms', () => {
    expect(findForbiddenPublicClaimTerms('Get a 20% discount on this promotion')).toContain('discount');
    expect(findForbiddenPublicClaimTerms('Get a 20% discount on this promotion')).toContain('promotion');
  });

  it('does not block clean brand copy', () => {
    const cleanCopy = 'NEXS Paint Protection Film — Engineered to Be Invisible. Better Than Day One.';
    expect(findForbiddenPublicClaimTerms(cleanCopy)).toEqual([]);
  });
});
