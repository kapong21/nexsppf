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

export type ImageReadiness = 'public-ready' | 'placeholder' | 'hold';

export type ImageSlotKey =
  | 'hero_brand_visual'
  | 'product_line_visual'
  | 'begin_product_visual'
  | 'prime_product_visual'
  | 'pro_product_visual'
  | 'ultimate_product_visual'
  | 'warranty_qr_visual'
  | 'digital_warranty_card_mockup'
  | 'dealer_installation_visual'
  | 'packaging_product_proof_visual'
  | 'maintenance_after_sales_visual'
  | 'contact_lead_visual';

export type ImageSlot = {
  readonly key: ImageSlotKey;
  readonly role: ImageSlotKey;
  readonly path: string | null;
  readonly alt: string;
  readonly section: string;
  readonly cropDirection: string;
  readonly visualPurpose: string;
  readonly claimRisk: string;
  readonly readiness: ImageReadiness;
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
  hero_brand_visual: {
    key: 'hero_brand_visual',
    role: 'hero_brand_visual',
    path: '/images/hero-porsche.jpg',
    alt: 'Premium NEXS PPF vehicle hero visual',
    section: 'Home hero and product overview hero',
    cropDirection: 'Wide editorial crop. Keep car dominant, clean, and aspirational with breathing space around the body line.',
    visualPurpose: 'Lead the page visually and communicate premium vehicle protection before the user reads details.',
    claimRisk: 'Low if used as brand mood only with no performance or supplier captions.',
    readiness: 'public-ready',
    usage: 'Home, Warranty, and Product overview hero image.',
    replacementNote: 'Replace with approved nexppf-specific premium hero image when ready.',
  },
  product_line_visual: {
    key: 'product_line_visual',
    role: 'product_line_visual',
    path: '/images/matte-bmw-closeup.jpg',
    alt: 'NEXS PPF surface mood visual',
    section: 'Product line support visual',
    cropDirection: 'Tight surface/detail crop with no claim caption; use only as finish mood, not as product proof.',
    visualPurpose: 'Give product tiles a premium material mood without adding a photo to every SKU card.',
    claimRisk: 'Medium. Do not imply matte-only product scope or add performance claims.',
    readiness: 'public-ready',
    usage: 'Product line mood/detail image.',
    replacementNote: 'Replace with approved neutral PPF surface visual when available.',
  },
  begin_product_visual: {
    key: 'begin_product_visual',
    role: 'begin_product_visual',
    path: null,
    alt: 'NEXS BEGIN product visual placeholder',
    section: 'BEGIN product card',
    cropDirection: 'Use silver/light-grey product tile accent instead of a forced photo.',
    visualPurpose: 'Keep BEGIN clean and accessible while preserving product-card consistency.',
    claimRisk: 'Low. No image-specific claim risk because the slot is graphical.',
    readiness: 'placeholder',
    usage: 'BEGIN product card visual slot.',
    replacementNote: 'Use product card color system until exact BEGIN product image is approved.',
  },
  prime_product_visual: {
    key: 'prime_product_visual',
    role: 'prime_product_visual',
    path: null,
    alt: 'NEXS PRIME product visual placeholder',
    section: 'PRIME product card',
    cropDirection: 'Use graphite/blue-silver product tile accent instead of a forced photo.',
    visualPurpose: 'Position PRIME as the balanced core product without clutter.',
    claimRisk: 'Low. No image-specific claim risk because the slot is graphical.',
    readiness: 'placeholder',
    usage: 'PRIME product card visual slot.',
    replacementNote: 'Use product card color system until exact PRIME product image is approved.',
  },
  pro_product_visual: {
    key: 'pro_product_visual',
    role: 'pro_product_visual',
    path: null,
    alt: 'NEXS PRO product visual placeholder',
    section: 'PRO product card',
    cropDirection: 'Use carbon/red product tile accent instead of a forced photo.',
    visualPurpose: 'Make PRO visually distinct as the public premium product group.',
    claimRisk: 'Low. No image-specific claim risk because the slot is graphical.',
    readiness: 'placeholder',
    usage: 'PRO product card visual slot.',
    replacementNote: 'Use product card color system until exact PRO product image is approved.',
  },
  ultimate_product_visual: {
    key: 'ultimate_product_visual',
    role: 'ultimate_product_visual',
    path: null,
    alt: 'NEXS ULTIMATE product visual placeholder',
    section: 'ULTIMATE product card',
    cropDirection: 'Use platinum/gold product tile accent instead of a forced photo.',
    visualPurpose: 'Signal flagship product identity without adding unapproved claims.',
    claimRisk: 'Low. No image-specific claim risk because the slot is graphical.',
    readiness: 'placeholder',
    usage: 'ULTIMATE product card visual slot.',
    replacementNote: 'Use product card color system until exact ULTIMATE product image is approved.',
  },
  warranty_qr_visual: {
    key: 'warranty_qr_visual',
    role: 'warranty_qr_visual',
    path: '/images/nexs-ultimate-box.jpg',
    alt: 'NEXS packaging and QR support visual',
    section: 'Warranty QR explanation',
    cropDirection: 'Crop with generous white/grey negative space and avoid readable risky packaging claims if present.',
    visualPurpose: 'Support the QR verification story as product proof, not as a random box image.',
    claimRisk: 'Medium. Avoid visible unapproved packaging text or imply only ULTIMATE has warranty.',
    readiness: 'public-ready',
    usage: 'Warranty, QR explanation, and support visual.',
    replacementNote: 'Replace with approved QR/Digital Warranty Card mockup when available.',
  },
  digital_warranty_card_mockup: {
    key: 'digital_warranty_card_mockup',
    role: 'digital_warranty_card_mockup',
    path: null,
    alt: 'Digital Warranty Card mockup',
    section: 'Digital Warranty System',
    cropDirection: 'Use clean UI/card composition rather than a photo crop.',
    visualPurpose: 'Make warranty feel like premium support status similar to AppleCare-style product support.',
    claimRisk: 'Low if customer data remains masked and no sensitive fields are shown.',
    readiness: 'public-ready',
    usage: 'Digital Warranty Card visual mockup.',
    replacementNote: 'Replace with real approved UI screenshot only after PDPA and data masking review.',
  },
  dealer_installation_visual: {
    key: 'dealer_installation_visual',
    role: 'dealer_installation_visual',
    path: '/images/installer-hood.jpg',
    alt: 'Professional NEXS dealer installation visual',
    section: 'Dealer and installer section',
    cropDirection: 'Editorial crop around hands, tool, film, and vehicle surface; avoid making it feel like a back-office snapshot.',
    visualPurpose: 'Show professional installation craft and support dealer recruitment.',
    claimRisk: 'Low if copy stays about dealer workflow and does not expand service scope.',
    readiness: 'public-ready',
    usage: 'Dealer workflow, warranty registration, installation, and after-sales sections.',
    replacementNote: 'Replace with approved real dealer workflow image when ready.',
  },
  packaging_product_proof_visual: {
    key: 'packaging_product_proof_visual',
    role: 'packaging_product_proof_visual',
    path: '/images/nexs-ultimate-box.jpg',
    alt: 'NEXS product packaging proof visual',
    section: 'QR and product proof section',
    cropDirection: 'Product-proof crop with breathing space; keep the box intentional and premium, not full-card filler.',
    visualPurpose: 'Connect physical product packaging with QR verification and digital warranty trust.',
    claimRisk: 'Medium. Avoid readable risky claim text and avoid implying only one tier has QR/warranty.',
    readiness: 'public-ready',
    usage: 'Packaging and product proof section.',
    replacementNote: 'Use approved neutral packaging/sticker asset when available.',
  },
  maintenance_after_sales_visual: {
    key: 'maintenance_after_sales_visual',
    role: 'maintenance_after_sales_visual',
    path: '/images/installer-hood.jpg',
    alt: 'NEXS after-sales and maintenance workflow visual',
    section: 'Maintenance and after-sales support',
    cropDirection: 'Close editorial crop of installation/detail workflow; do not show sensitive customer records.',
    visualPurpose: 'Support the after-sales story while real maintenance-specific assets are pending.',
    claimRisk: 'Low if used as workflow mood only.',
    readiness: 'public-ready',
    usage: 'Maintenance and after-sales placeholder image.',
    replacementNote: 'Replace with approved maintenance-specific visual when available.',
  },
  contact_lead_visual: {
    key: 'contact_lead_visual',
    role: 'contact_lead_visual',
    path: '/images/matte-bmw-full.jpg',
    alt: 'NEXS PPF premium vehicle contact visual',
    section: 'Contact and lead generation',
    cropDirection: 'Wide calm vehicle crop with soft grey/white balance; avoid making the page feel matte-only.',
    visualPurpose: 'Give the contact form a premium brand context without distracting from the fields.',
    claimRisk: 'Medium. Use only as visual mood and do not add matte-only product claims.',
    readiness: 'public-ready',
    usage: 'Contact lead support visual.',
    replacementNote: 'Replace with approved neutral brand/contact visual when available.',
  },
} as const;

export function getImageSlot(key: string): ImageSlot {
  if (!(key in IMAGE_SLOTS)) {
    throw new Error(`Unknown image slot: ${key}`);
  }

  return IMAGE_SLOTS[key as ImageSlotKey];
}
