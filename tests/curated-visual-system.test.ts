import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SITE_COPY, collectPublicContentText, findForbiddenPublicClaimTerms, PUBLIC_PRODUCT_GROUPS } from '../src/content/site-content';

const repoRoot = process.cwd();
const homeSource = readFileSync(join(repoRoot, 'src/app/page.tsx'), 'utf8');
const cssSource = readFileSync(join(repoRoot, 'src/app/globals.css'), 'utf8');
const srcPublicSources = [
  'src/app/page.tsx',
  'src/app/products/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/dealer/page.tsx',
  'src/app/warranty/page.tsx',
  'src/app/r/[serial]/page.tsx',
].map((relativePath) => ({ relativePath, content: readFileSync(join(repoRoot, relativePath), 'utf8') }));

describe('curated visual system pass', () => {
  it('adds a web-native Why PPF section with four short education cards', () => {
    expect(SITE_COPY.visualSystem.whyPpf.title).toBe('Why PPF');
    expect(SITE_COPY.visualSystem.whyPpf.cards).toHaveLength(4);
    expect(SITE_COPY.visualSystem.whyPpf.cards.map((card) => card.title)).toEqual([
      'รอยเล็ก ๆ เกิดขึ้นได้ทุกวัน',
      'ความสวยของรถค่อย ๆ ลดลง',
      'PPF เป็นชั้นปกป้องผิวสีรถ',
      'ปกป้องตั้งแต่แรกเพื่อความมั่นใจ',
    ]);

    for (const card of SITE_COPY.visualSystem.whyPpf.cards) {
      expect(card.body.length).toBeLessThanOrEqual(95);
    }
  });

  it('adds a safe Why NEXS brand story made from reference concepts, not poster copy', () => {
    expect(SITE_COPY.visualSystem.brandStory.title).toBe('Why NEXS');
    expect(SITE_COPY.visualSystem.brandStory.cards).toHaveLength(4);
    expect(SITE_COPY.visualSystem.brandStory.cards.map((card) => card.title)).toEqual([
      'เข้าใจผิวรถจากการใช้งานจริง',
      'ออกแบบให้เลือกรุ่นง่าย',
      'ปกป้องโดยไม่ลดทอนความสวย',
      'มีระบบดูแลหลังติดตั้ง',
    ]);

    for (const card of SITE_COPY.visualSystem.brandStory.cards) {
      expect(card.body.length).toBeLessThanOrEqual(95);
    }
  });

  it('renders curated visual sections on homepage before product and warranty decisions', () => {
    expect(homeSource).toContain('id="why-ppf"');
    expect(homeSource).toContain('className="curated-section why-ppf-section"');
    expect(homeSource).toContain('className="curated-section brand-story-section"');
    expect(homeSource.indexOf('id="why-ppf"')).toBeLessThan(homeSource.indexOf('id="products"'));
    expect(homeSource.indexOf('className="curated-section brand-story-section"')).toBeLessThan(homeSource.indexOf('Digital Warranty System'));
  });

  it('keeps curated sections visually designed with composable CSS instead of poster image dumps', () => {
    expect(cssSource).toContain('.curated-section');
    expect(cssSource).toContain('.curated-card');
    expect(cssSource).toContain('.visual-orbit');
    expect(cssSource).toContain('.paint-layer-stack');
    expect(homeSource).not.toContain('img_07005c2fa183');
    expect(homeSource).not.toContain('img_4e34d74550f0');
  });

  it('keeps reference-derived public copy free from forbidden claims and pricing', () => {
    const contentText = collectPublicContentText({ siteCopy: SITE_COPY, products: PUBLIC_PRODUCT_GROUPS });
    expect(findForbiddenPublicClaimTerms(contentText)).toEqual([]);

    const blockedReferenceTerms = [
      'Self-Healing',
      'UV & Stain Resistant',
      'Crystal Clear Finish',
      'Hydrophobicity',
      'Yellowing Resistance',
      'Gloss >90',
      'Gloss >94',
      '10-Year Warranty',
      'nexsfilm.com',
      'Germany TPU',
      'USA TPU',
      'China TPU',
      'PCU Technology',
      'ซ่อมแซมตัวเอง',
      'ป้องกันรังสี UV สูงสุด',
      'ไม่เหลืองง่าย',
      'ไล่น้ำดี',
    ];

    for (const source of srcPublicSources) {
      for (const term of blockedReferenceTerms) {
        expect(source.content, `${source.relativePath} should not include ${term}`).not.toContain(term);
      }
    }
  });
});
