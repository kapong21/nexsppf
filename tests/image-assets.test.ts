import { describe, expect, it } from 'vitest';
import {
  APPROVED_IMAGE_ASSETS,
  IMAGE_SLOTS,
  RISKY_V1_IMAGE_ASSETS,
  getImageSlot,
} from '../src/content/image-assets';

describe('image asset policy', () => {
  it('defines all required replaceable image slots with designer-facing role names', () => {
    expect(Object.keys(IMAGE_SLOTS).sort()).toEqual([
      'begin_product_visual',
      'contact_lead_visual',
      'dealer_installation_visual',
      'digital_warranty_card_mockup',
      'hero_brand_visual',
      'maintenance_after_sales_visual',
      'packaging_product_proof_visual',
      'prime_product_visual',
      'pro_product_visual',
      'product_line_visual',
      'ultimate_product_visual',
      'warranty_qr_visual',
    ]);
  });

  it('documents image role map fields for art direction and claim risk review', () => {
    for (const slot of Object.values(IMAGE_SLOTS)) {
      expect(slot.role).toBe(slot.key);
      expect(slot.section).toBeTruthy();
      expect(slot.cropDirection).toBeTruthy();
      expect(slot.visualPurpose).toBeTruthy();
      expect(slot.claimRisk).toBeTruthy();
      expect(['public-ready', 'placeholder', 'hold']).toContain(slot.readiness);
    }
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
    expect(getImageSlot('hero_brand_visual').path).toBe('/images/hero-porsche.jpg');
    expect(() => getImageSlot('unknown_slot')).toThrow('Unknown image slot: unknown_slot');
  });
});
