import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { IMAGE_SLOTS, RISKY_V1_IMAGE_ASSETS } from '../src/content/image-assets';

const repoRoot = process.cwd();
const readRepoFile = (relativePath: string) => readFileSync(join(repoRoot, relativePath), 'utf8');

const publicPages = [
  'src/app/page.tsx',
  'src/app/products/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/dealer/page.tsx',
  'src/app/warranty/page.tsx',
  'src/app/r/[serial]/page.tsx',
].map((relativePath) => ({ relativePath, content: readRepoFile(relativePath) }));

describe('Legacy Image Layout Integration Pass', () => {
  it('documents the pre-implementation mini-plan and risk controls', () => {
    const plan = readRepoFile('docs/LEGACY_IMAGE_LAYOUT_INTEGRATION_PLAN.md');

    expect(plan).toContain('Current Image Problem');
    expect(plan).toContain('Image Mapping Plan');
    expect(plan).toContain('Images Avoided');
    expect(plan).toContain('Section-by-Section Visual Change');
    expect(plan).toContain('Risk Control');
    expect(plan).toContain('Expected Files to Change');
    expect(plan).toContain('No production deploy');
  });

  it('adds reusable layout metadata to every image slot so images are replaceable without layout rewrites', () => {
    for (const slot of Object.values(IMAGE_SLOTS)) {
      expect(slot).toHaveProperty('aspectRatio');
      expect(slot).toHaveProperty('objectPosition');
      expect(slot).toHaveProperty('layoutClass');
      expect(slot).toHaveProperty('placement');
      expect(slot).toHaveProperty('priority');
      expect(slot.aspectRatio).toMatch(/^(16\/10|4\/3|3\/2|1\/1|auto)$/);
      expect(slot.objectPosition).toMatch(/^(center|center top|center bottom|left center|right center)$/);
      expect(slot.layoutClass).toMatch(/^image-layout-/);
      expect(['hero', 'section', 'card', 'inline', 'background', 'reserved']).toContain(slot.placement);
      expect(['high', 'medium', 'low', 'reserved']).toContain(slot.priority);
    }
  });

  it('uses legacy nexslabs images only in approved public slots and keeps product-tier slots reserved', () => {
    expect(IMAGE_SLOTS.hero_brand_visual.path).toBe('/images/hero-porsche.jpg');
    expect(IMAGE_SLOTS.product_line_visual.path).toBe('/images/matte-bmw-closeup.jpg');
    expect(IMAGE_SLOTS.warranty_qr_visual.path).toBe('/images/nexs-ultimate-box.jpg');
    expect(IMAGE_SLOTS.dealer_installation_visual.path).toBe('/images/installer-hood.jpg');
    expect(IMAGE_SLOTS.contact_lead_visual.path).toBe('/images/matte-bmw-full.jpg');

    expect(IMAGE_SLOTS.begin_product_visual.path).toBeNull();
    expect(IMAGE_SLOTS.prime_product_visual.path).toBeNull();
    expect(IMAGE_SLOTS.pro_product_visual.path).toBeNull();
    expect(IMAGE_SLOTS.ultimate_product_visual.path).toBeNull();
  });

  it('renders curated image slots on home, products, contact, dealer, and warranty pages', () => {
    const home = readRepoFile('src/app/page.tsx');
    const products = readRepoFile('src/app/products/page.tsx');
    const contact = readRepoFile('src/app/contact/page.tsx');
    const dealer = readRepoFile('src/app/dealer/page.tsx');
    const warranty = readRepoFile('src/app/warranty/page.tsx');

    expect(home).toContain('MarketingHero');
    expect(home).toContain('CategoryOverview');
    expect(products).toContain('ComparisonMatrix');
    expect(products).toContain('CategoryOverview');
    expect(contact).toContain("getImageSlot('contact_lead_visual')");
    expect(contact).toContain('contact-visual-panel');
    expect(dealer).toContain('../for-dealers/page');
    expect(warranty).toContain('visual.layoutClass');
  });

  it('defines reusable CSS for aspect ratios, crop placement, and responsive curated image rhythm', () => {
    const css = readRepoFile('src/app/globals.css');

    expect(css).toContain('.image-layout-hero');
    expect(css).toContain('.image-layout-editorial');
    expect(css).toContain('.image-layout-product-proof');
    expect(css).toContain('.image-aspect-16-10');
    expect(css).toContain('.image-aspect-4-3');
    expect(css).toContain('.image-object-center-top');
    expect(css).toContain('.product-line-visual-band');
    expect(css).toContain('.contact-visual-panel');
    expect(css).toContain('.dealer-visual-panel');
  });

  it('does not introduce risky legacy images, public pricing, or forbidden public claims on public pages', () => {
    const riskyPaths = RISKY_V1_IMAGE_ASSETS.map((asset) => asset.path);
    const forbiddenTerms = [
      'self-healing',
      'anti-yellowing',
      'non-yellowing',
      'optical clarity',
      '1000+ colors',
      'dealer price',
      'factory cost',
      'discount',
      'promotion',
      'Bayer',
      'Wanhua',
      'Covestro',
      'Lubrizol',
      'Ashland',
    ];

    for (const { relativePath, content } of publicPages) {
      for (const riskyPath of riskyPaths) {
        expect(content, `${relativePath} must not render ${riskyPath}`).not.toContain(riskyPath);
      }

      for (const term of forbiddenTerms) {
        expect(content.toLowerCase(), `${relativePath} must not contain ${term}`).not.toContain(term.toLowerCase());
      }
    }
  });
});
