import type { ImageSlotKey } from './image-assets';

export type PublicProductGroup = {
  readonly name: 'BEGIN' | 'PRIME' | 'PRO' | 'ULTIMATE';
  readonly modelCode: 'B' | 'P' | 'PRO' | 'U';
  readonly warrantyYears: 5 | 6 | 8 | 9;
  readonly positioning: string;
  readonly colorDirection: readonly string[];
  readonly imageSlot: ImageSlotKey;
  readonly headline: string;
  readonly thaiDescription: string;
};

export type SiteCopy = {
  readonly homeHero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
  readonly warranty: {
    readonly title: string;
    readonly description: string;
  };
  readonly dealerWorkflow: {
    readonly title: string;
    readonly description: string;
  };
  readonly productProof: {
    readonly title: string;
    readonly description: string;
  };
  readonly maintenance: {
    readonly title: string;
    readonly description: string;
  };
};

export const APPROVED_PUBLIC_WORDING = [
  'NEXS Paint Protection Film',
  'QR-based warranty verification',
  'Digital warranty card',
  'Professional dealer installation workflow',
  'Warranty-backed after-sales support',
  'Product tier names',
  'Approved warranty years',
] as const;

export const FORBIDDEN_PUBLIC_CLAIM_TERMS = [
  'Bayer',
  'Wanhua',
  'Covestro',
  'Lubrizol',
  'Ashland',
  'supplier material',
  'supplier/material',
  'self-healing',
  'anti-yellowing',
  'non-yellowing',
  'chemical resistance',
  '1000+ colors',
  'optical clarity',
  'highest quality raw materials',
  'made in USA',
  'TPU source',
  'PCU',
  'factory cost',
  'dealer price',
] as const;

export const PUBLIC_PRODUCT_GROUPS: readonly PublicProductGroup[] = [
  {
    name: 'BEGIN',
    modelCode: 'B',
    warrantyYears: 5,
    positioning: 'Entry / Value Protection',
    colorDirection: ['silver', 'light grey'],
    imageSlot: 'begin_product_visual',
    headline: 'NEXS BEGIN',
    thaiDescription: 'ฟิล์มปกป้องสีรถสำหรับการใช้งานประจำวัน คุ้มค่า เข้าถึงง่าย',
  },
  {
    name: 'PRIME',
    modelCode: 'P',
    warrantyYears: 6,
    positioning: 'Core / Hero SKU',
    colorDirection: ['graphite', 'blue silver'],
    imageSlot: 'prime_product_visual',
    headline: 'NEXS PRIME',
    thaiDescription: 'รุ่นหลักของ NEXS สำหรับลูกค้าที่ต้องการความสมดุลระหว่างความใส การปกป้อง และความคุ้มค่า',
  },
  {
    name: 'PRO',
    modelCode: 'PRO',
    warrantyYears: 8,
    positioning: 'Premium Performance',
    colorDirection: ['carbon black', 'red accent'],
    imageSlot: 'pro_product_visual',
    headline: 'NEXS PRO',
    thaiDescription: 'ฟิล์มปกป้องสีรถระดับพรีเมียม สำหรับลูกค้าที่ต้องการการปกป้องที่สูงขึ้น',
  },
  {
    name: 'ULTIMATE',
    modelCode: 'U',
    warrantyYears: 9,
    positioning: 'Flagship / Top-tier',
    colorDirection: ['deep black', 'gold', 'platinum'],
    imageSlot: 'ultimate_product_visual',
    headline: 'NEXS ULTIMATE',
    thaiDescription: 'ฟิล์มปกป้องสีรถรุ่นสูงสุดของ NEXS สำหรับลูกค้าที่ต้องการตัวเลือกระดับเรือธง',
  },
] as const;

export const SITE_COPY: SiteCopy = {
  homeHero: {
    eyebrow: 'NEXS Paint Protection Film',
    title: 'ฟิล์มปกป้องสีรถ NEXS พร้อมระบบบัตรรับประกันดิจิทัล',
    subtitle: 'ตรวจสอบสถานะสินค้าและการรับประกันผ่าน QR พร้อม workflow สำหรับตัวแทนจำหน่ายและการดูแลหลังการขาย',
    primaryCta: 'ตรวจสอบบัตรรับประกัน',
    secondaryCta: 'ดูรุ่นสินค้า',
  },
  warranty: {
    title: 'QR-based warranty verification',
    description: 'สแกน QR เพื่อตรวจสอบสถานะการรับประกันและข้อมูลการลงทะเบียนสินค้า',
  },
  dealerWorkflow: {
    title: 'Professional dealer installation workflow',
    description: 'ขั้นตอนติดตั้งโดยตัวแทนจำหน่าย พร้อมระบบดูแลหลังการขายและบันทึกการรับประกัน',
  },
  productProof: {
    title: 'Product registration from approved serial records',
    description: 'การรับประกันเริ่มจาก serial และ QR ที่ผ่านการลงทะเบียนในระบบ',
  },
  maintenance: {
    title: 'Warranty-backed after-sales support',
    description: 'บันทึกการดูแลรักษาช่วยให้ลูกค้าและตัวแทนจำหน่ายติดตามการดูแลหลังการติดตั้งได้ชัดเจน',
  },
} as const;

export function collectPublicContentText(input: { siteCopy: SiteCopy; products: readonly PublicProductGroup[] }): string {
  return [
    ...flattenText(input.siteCopy),
    ...input.products.flatMap((product) => flattenText(product)),
  ].join('\n');
}

export function findForbiddenPublicClaimTerms(content: string): string[] {
  const normalizedContent = content.toLowerCase();

  return FORBIDDEN_PUBLIC_CLAIM_TERMS.filter((term) => normalizedContent.includes(term.toLowerCase()));
}

function flattenText(value: unknown): string[] {
  if (typeof value === 'string' || typeof value === 'number') {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => flattenText(item));
  }

  if (value && typeof value === 'object') {
    return Object.values(value).flatMap((item) => flattenText(item));
  }

  return [];
}
