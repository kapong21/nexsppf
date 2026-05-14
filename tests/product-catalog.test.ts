import { describe, expect, it } from 'vitest';
import { PRODUCT_CATEGORIES, PRODUCT_OPTIONS } from '../sanity/seed/productCatalog';

describe('product catalog seed', () => {
  it('defines exactly 3 product categories', () => {
    expect(PRODUCT_CATEGORIES).toHaveLength(3);
    expect(PRODUCT_CATEGORIES.map((c) => c.name)).toEqual(['clear', 'matte', 'color']);
  });

  it('defines exactly 12 product options', () => {
    expect(PRODUCT_OPTIONS).toHaveLength(12);
  });

  it('has 4 Clear PPF products in tier order', () => {
    const clear = PRODUCT_OPTIONS.filter((p) => p.category === 'clear');
    expect(clear).toHaveLength(4);
    expect(clear.map((p) => p.tier)).toEqual(['begin', 'prime', 'pro', 'ultimate']);
  });

  it('has 3 Matte PPF products in tier order', () => {
    const matte = PRODUCT_OPTIONS.filter((p) => p.category === 'matte');
    expect(matte).toHaveLength(3);
    expect(matte.map((p) => p.tier)).toEqual(['prime', 'pro', 'ultimate']);
  });

  it('has 5 Color PPF products in tier order', () => {
    const color = PRODUCT_OPTIONS.filter((p) => p.category === 'color');
    expect(color).toHaveLength(5);
    expect(color.map((p) => p.tier)).toEqual(['begin', 'prime', 'pro', 'ultimate', 'ultimate_cf']);
  });

  it('gives all products unique SKUs', () => {
    const skus = PRODUCT_OPTIONS.map((p) => p.sku);
    expect(new Set(skus).size).toBe(skus.length);
  });

  it('assigns valid warranty years to all products', () => {
    const validYears = [5, 6, 8, 9];
    for (const product of PRODUCT_OPTIONS) {
      expect(validYears).toContain(product.warrantyYears);
    }
  });

  it('assigns sequential display orders 1-12', () => {
    const orders = PRODUCT_OPTIONS.map((p) => p.order).sort((a, b) => a - b);
    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('has no pricing data in any product field', () => {
    for (const product of PRODUCT_OPTIONS) {
      const text = JSON.stringify(product).toLowerCase();
      expect(text).not.toContain('price');
      expect(text).not.toContain('฿');
      expect(text).not.toContain('baht');
      expect(text).not.toContain('discount');
    }
  });

  it('all Clear PPF SKUs start with CLEAR-', () => {
    PRODUCT_OPTIONS.filter((p) => p.category === 'clear').forEach((p) => {
      expect(p.sku).toMatch(/^CLEAR-/);
    });
  });

  it('all Matte PPF SKUs start with MATTE-', () => {
    PRODUCT_OPTIONS.filter((p) => p.category === 'matte').forEach((p) => {
      expect(p.sku).toMatch(/^MATTE-/);
    });
  });

  it('all Color PPF SKUs start with COLOR-', () => {
    PRODUCT_OPTIONS.filter((p) => p.category === 'color').forEach((p) => {
      expect(p.sku).toMatch(/^COLOR-/);
    });
  });
});
