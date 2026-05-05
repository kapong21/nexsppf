export type ApprovedImageAsset = {
  readonly path: string;
  readonly source: 'nexslabs';
  readonly usage: readonly string[];
  readonly caution?: string;
};

export type RiskyImageAsset = {
  readonly path: string;
  readonly risk: string;
};

export type ImageSlotKey =
  | 'hero_image'
  | 'begin_product_visual'
  | 'prime_product_visual'
  | 'pro_product_visual'
  | 'ultimate_product_visual'
  | 'qr_warranty_visual'
  | 'packaging_visual'
  | 'dealer_workflow_visual'
  | 'maintenance_visual'
  | 'support_request_visual';

export type ImageSlot = {
  readonly key: ImageSlotKey;
  readonly path: string | null;
  readonly alt: string;
  readonly usage: string;
  readonly replacementNote: string;
};

export const APPROVED_IMAGE_ASSETS: readonly ApprovedImageAsset[] = [
  {
    path: '/nexs-logo.png',
    source: 'nexslabs',
    usage: ['header', 'footer', 'login', 'digital_warranty_card', 'dealer_dashboard', 'admin_dashboard'],
  },
  {
    path: '/images/hero-porsche.jpg',
    source: 'nexslabs',
    usage: ['home_hero', 'warranty_hero', 'product_overview_hero'],
  },
  {
    path: '/images/installer-hood.jpg',
    source: 'nexslabs',
    usage: ['dealer_workflow', 'warranty_registration', 'after_sales', 'maintenance_placeholder'],
  },
  {
    path: '/images/nexs-ultimate-box.jpg',
    source: 'nexslabs',
    usage: ['packaging', 'product_proof', 'qr_warranty_explanation'],
  },
  {
    path: '/images/matte-bmw-full.jpg',
    source: 'nexslabs',
    usage: ['product_mood', 'vehicle_detail_supporting_image'],
    caution: 'Use only as mood/detail visual. Do not imply all public product groups are matte film.',
  },
  {
    path: '/images/matte-bmw-closeup.jpg',
    source: 'nexslabs',
    usage: ['film_surface_mood', 'vehicle_detail_supporting_image'],
    caution: 'Use only as mood/detail visual. Do not imply matte-only product scope.',
  },
] as const;

export const RISKY_V1_IMAGE_ASSETS: readonly RiskyImageAsset[] = [
  { path: '/images/self-healing-closeup.jpg', risk: 'May imply self-healing claim.' },
  { path: '/images/non-yellowing.jpg', risk: 'May imply anti-yellowing or non-yellowing claim.' },
  { path: '/images/optical-clarity.jpg', risk: 'May imply unapproved optical clarity performance claim.' },
  { path: '/images/optical-clarity-maserati.jpg', risk: 'May imply unapproved optical clarity performance claim.' },
  { path: '/images/color-ppf-mclaren.jpg', risk: 'May imply color PPF product scope.' },
  { path: '/images/color-1000-swatchbook.jpg', risk: 'May imply 1000+ colors product scope.' },
  { path: '/images/color-ppf-green.jpg', risk: 'May imply color PPF product scope.' },
  { path: '/images/headlight-install.jpg', risk: 'May imply headlight PPF product scope.' },
] as const;

export const IMAGE_SLOTS: Readonly<Record<ImageSlotKey, ImageSlot>> = {
  hero_image: {
    key: 'hero_image',
    path: '/images/hero-porsche.jpg',
    alt: 'NEXS Paint Protection Film hero vehicle visual',
    usage: 'Home, Warranty, and Product overview hero image.',
    replacementNote: 'Replace with approved premium automotive hero image when nexppf-specific hero is ready.',
  },
  begin_product_visual: {
    key: 'begin_product_visual',
    path: null,
    alt: 'NEXS BEGIN product visual placeholder',
    usage: 'BEGIN product card visual slot.',
    replacementNote: 'Use product card color system until exact BEGIN product image is approved.',
  },
  prime_product_visual: {
    key: 'prime_product_visual',
    path: null,
    alt: 'NEXS PRIME product visual placeholder',
    usage: 'PRIME product card visual slot.',
    replacementNote: 'Use product card color system until exact PRIME product image is approved.',
  },
  pro_product_visual: {
    key: 'pro_product_visual',
    path: null,
    alt: 'NEXS PRO product visual placeholder',
    usage: 'PRO product card visual slot.',
    replacementNote: 'Use product card color system until exact PRO product image is approved.',
  },
  ultimate_product_visual: {
    key: 'ultimate_product_visual',
    path: null,
    alt: 'NEXS ULTIMATE product visual placeholder',
    usage: 'ULTIMATE product card visual slot.',
    replacementNote: 'Use product card color system until exact ULTIMATE product image is approved.',
  },
  qr_warranty_visual: {
    key: 'qr_warranty_visual',
    path: '/images/nexs-ultimate-box.jpg',
    alt: 'NEXS product packaging and warranty QR visual',
    usage: 'Warranty, QR explanation, and Digital Warranty Card support visual.',
    replacementNote: 'Replace with approved QR/Digital Warranty Card mockup when available.',
  },
  packaging_visual: {
    key: 'packaging_visual',
    path: '/images/nexs-ultimate-box.jpg',
    alt: 'NEXS product packaging visual',
    usage: 'Packaging and product proof section.',
    replacementNote: 'Avoid implying only ULTIMATE has QR/warranty if used for general warranty messaging.',
  },
  dealer_workflow_visual: {
    key: 'dealer_workflow_visual',
    path: '/images/installer-hood.jpg',
    alt: 'Professional NEXS dealer installation workflow visual',
    usage: 'Dealer workflow, warranty registration, installation, and after-sales sections.',
    replacementNote: 'Replace with approved real dealer workflow image when ready.',
  },
  maintenance_visual: {
    key: 'maintenance_visual',
    path: '/images/installer-hood.jpg',
    alt: 'NEXS after-sales and maintenance workflow placeholder visual',
    usage: 'Maintenance and after-sales placeholder image.',
    replacementNote: 'Replace with approved maintenance-specific visual when available.',
  },
  support_request_visual: {
    key: 'support_request_visual',
    path: '/images/nexs-ultimate-box.jpg',
    alt: 'NEXS warranty support visual',
    usage: 'Lost warranty, support request, and inspection request supporting visual.',
    replacementNote: 'Replace with approved support-request visual when available.',
  },
} as const;

export function getImageSlot(key: string): ImageSlot {
  if (!(key in IMAGE_SLOTS)) {
    throw new Error(`Unknown image slot: ${key}`);
  }

  return IMAGE_SLOTS[key as ImageSlotKey];
}
