import { describe, expect, it } from 'vitest';
import { schemaTypes } from '../sanity/schemas';

const REQUIRED_SCHEMA_NAMES = [
  'siteSettings',
  'navigation',
  'page',
  'hero',
  'productCategory',
  'productOption',
  // Spec v5.2 additions: comparison rows + installer directory
  'productSpec',
  'installerLocation',
  'imageAsset',
  'faq',
  'resourcePost',
  'leadForm',
  'routeConfig',
  'footerLegal',
];

describe('sanity schema config', () => {
  it('exports all required schema types', () => {
    const names = schemaTypes.map((s) => s.name);
    for (const name of REQUIRED_SCHEMA_NAMES) {
      expect(names).toContain(name);
    }
  });

  it('exports exactly the expected number of schema types', () => {
    expect(schemaTypes).toHaveLength(REQUIRED_SCHEMA_NAMES.length);
  });

  it('every schema type has a name and type', () => {
    for (const schema of schemaTypes) {
      expect(schema.name).toBeTruthy();
      expect(schema.type).toBeTruthy();
    }
  });

  it('productOption schema has required fields', () => {
    const productOption = schemaTypes.find((s) => s.name === 'productOption');
    expect(productOption).toBeDefined();
    const fieldNames = (productOption as { fields?: { name: string }[] }).fields?.map((f) => f.name) ?? [];
    expect(fieldNames).toContain('name');
    expect(fieldNames).toContain('sku');
    expect(fieldNames).toContain('category');
    expect(fieldNames).toContain('tier');
    expect(fieldNames).toContain('warrantyYears');
  });

  it('siteSettings schema includes all brand string fields', () => {
    const siteSettings = schemaTypes.find((s) => s.name === 'siteSettings');
    expect(siteSettings).toBeDefined();
    const fieldNames = (siteSettings as { fields?: { name: string }[] }).fields?.map((f) => f.name) ?? [];
    expect(fieldNames).toContain('tagline');
    expect(fieldNames).toContain('heroHeadline');
    expect(fieldNames).toContain('heroThaiHeadline');
    expect(fieldNames).toContain('heroQuote');
    expect(fieldNames).toContain('contactHandle');
  });

  it('hero schema includes Thai headline and quote fields', () => {
    const hero = schemaTypes.find((s) => s.name === 'hero');
    expect(hero).toBeDefined();
    const fieldNames = (hero as { fields?: { name: string }[] }).fields?.map((f) => f.name) ?? [];
    expect(fieldNames).toContain('thaiHeadline');
    expect(fieldNames).toContain('quote');
    expect(fieldNames).toContain('eyebrow');
    expect(fieldNames).toContain('headline');
  });

  it('leadForm schema includes PDPA consent field', () => {
    const leadForm = schemaTypes.find((s) => s.name === 'leadForm');
    expect(leadForm).toBeDefined();
    const fieldNames = (leadForm as { fields?: { name: string }[] }).fields?.map((f) => f.name) ?? [];
    expect(fieldNames).toContain('pdpaConsentLabel');
  });

  it('productCategory schema includes Thai label field', () => {
    const productCategory = schemaTypes.find((s) => s.name === 'productCategory');
    expect(productCategory).toBeDefined();
    const fieldNames = (productCategory as { fields?: { name: string }[] }).fields?.map((f) => f.name) ?? [];
    expect(fieldNames).toContain('thaiLabel');
    expect(fieldNames).toContain('order');
  });

  it('faq schema supports FAQ schema fields without pricing fields', () => {
    const faq = schemaTypes.find((s) => s.name === 'faq');
    expect(faq).toBeDefined();
    const fieldNames = (faq as { fields?: { name: string }[] }).fields?.map((f) => f.name) ?? [];
    expect(fieldNames).toContain('question');
    expect(fieldNames).toContain('answer');
    expect(fieldNames).toContain('category');
    expect(fieldNames).toContain('sortOrder');
    expect(fieldNames).toContain('includeInFaqSchema');
    expect(fieldNames.join(' ')).not.toMatch(/price|pricing|cost/i);
  });

  it('resourcePost schema supports future blog resources and SEO', () => {
    const resourcePost = schemaTypes.find((s) => s.name === 'resourcePost');
    expect(resourcePost).toBeDefined();
    const fieldNames = (resourcePost as { fields?: { name: string }[] }).fields?.map((f) => f.name) ?? [];
    expect(fieldNames).toContain('title');
    expect(fieldNames).toContain('slug');
    expect(fieldNames).toContain('body');
    expect(fieldNames).toContain('seoTitle');
    expect(fieldNames).toContain('seoDescription');
    expect(fieldNames).toContain('ogImage');
    expect(fieldNames.join(' ')).not.toMatch(/price|pricing|cost/i);
  });
});
