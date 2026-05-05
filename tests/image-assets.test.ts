import { describe, expect, it } from 'vitest';
import {
  APPROVED_IMAGE_ASSETS,
  IMAGE_SLOTS,
  RISKY_V1_IMAGE_ASSETS,
  getImageSlot,
} from '../src/content/image-assets';

describe('image asset policy', () => {
  it('defines all required replaceable image slots', () => {
    expect(Object.keys(IMAGE_SLOTS).sort()).toEqual([
      'begin_product_visual',
      'dealer_workflow_visual',
      'hero_image',
      'maintenance_visual',
      'packaging_visual',
      'prime_product_visual',
      'pro_product_visual',
      'qr_warranty_visual',
      'support_request_visual',
      'ultimate_product_visual',
    ]);
  });

  it('uses only v1 approved assets for default slots', () => {
    const approvedPaths = new Set(APPROVED_IMAGE_ASSETS.map((asset) => asset.path));

    for (const slot of Object.values(IMAGE_SLOTS)) {
      if (slot.path !== null) {
        expect(approvedPaths.has(slot.path)).toBe(true);
      }
    }
  });

  it('does not assign risky v1 assets to any default image slot', () => {
    const riskyPaths = new Set(RISKY_V1_IMAGE_ASSETS.map((asset) => asset.path));

    for (const slot of Object.values(IMAGE_SLOTS)) {
      if (slot.path !== null) {
        expect(riskyPaths.has(slot.path)).toBe(false);
      }
    }
  });

  it('keeps product-specific visuals replaceable when exact product photos are not ready', () => {
    expect(IMAGE_SLOTS.begin_product_visual.path).toBeNull();
    expect(IMAGE_SLOTS.prime_product_visual.path).toBeNull();
    expect(IMAGE_SLOTS.pro_product_visual.path).toBeNull();
    expect(IMAGE_SLOTS.ultimate_product_visual.path).toBeNull();
  });

  it('returns a slot by key and throws for unknown keys', () => {
    expect(getImageSlot('hero_image').path).toBe('/images/hero-porsche.jpg');
    expect(() => getImageSlot('unknown_slot')).toThrow('Unknown image slot: unknown_slot');
  });
});
