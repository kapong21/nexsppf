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
  readonly recommendedUseCase: string;
  readonly primaryCta: 'สอบถามราคา';
  readonly secondaryCta: 'ติดต่อ Dealer';
};

export type SiteCopy = {
  readonly homeHero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly thaiTitle: string;
    readonly subtitle: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly tertiaryCta: string;
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
  readonly whyNexs: {
    readonly title: string;
    readonly points: readonly string[];
  };
  readonly dealer: {
    readonly title: string;
    readonly description: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
  readonly leadForm: {
    readonly title: string;
    readonly description: string;
    readonly fields: readonly ['name', 'phone', 'lineId', 'province', 'carModel', 'interestedProduct', 'customerType', 'message'];
    readonly customerTypes: readonly ['customer', 'dealer', 'installer'];
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
  'retail installed price',
  'dealer roll price',
  'margin',
  'discount',
  'promotion',
  'supplier cost',
  'minimum advertised installed price',
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
    recommendedUseCase: 'เหมาะกับลูกค้าที่ต้องการเริ่มต้นดูแลสีรถในชีวิตประจำวัน',
    primaryCta: 'สอบถามราคา',
    secondaryCta: 'ติดต่อ Dealer',
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
    recommendedUseCase: 'เหมาะกับลูกค้าที่ต้องการตัวเลือกหลักสำหรับรถใช้งานและรถพรีเมียม',
    primaryCta: 'สอบถามราคา',
    secondaryCta: 'ติดต่อ Dealer',
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
    recommendedUseCase: 'เหมาะกับลูกค้าที่ต้องการรุ่นพรีเมียมและการดูแลหลังการขายที่ชัดเจน',
    primaryCta: 'สอบถามราคา',
    secondaryCta: 'ติดต่อ Dealer',
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
    recommendedUseCase: 'เหมาะกับลูกค้าที่ต้องการรุ่นสูงสุดของ NEXS พร้อมระยะรับประกันยาวที่สุด',
    primaryCta: 'สอบถามราคา',
    secondaryCta: 'ติดต่อ Dealer',
  },
] as const;

export const SITE_COPY: SiteCopy = {
  homeHero: {
    eyebrow: 'NEXS Paint Protection Film',
    title: 'NEXS Paint Protection Film',
    thaiTitle: 'ฟิล์มปกป้องสีรถ NEXS',
    subtitle: 'ฟิล์มปกป้องสีรถ พร้อมระบบบัตรรับประกันดิจิทัลผ่าน QR Code',
    primaryCta: 'ดูสินค้า',
    secondaryCta: 'สอบถามราคา',
    tertiaryCta: 'ตรวจสอบบัตรรับประกัน',
  },
  warranty: {
    title: 'QR-based warranty verification',
    description: 'สแกน QR Code เพื่อตรวจสอบสถานะบัตรรับประกันและข้อมูลสินค้าอย่างปลอดภัย',
  },
  dealerWorkflow: {
    title: 'Professional dealer installation workflow',
    description: 'ขั้นตอนติดตั้งโดยตัวแทนจำหน่าย พร้อมระบบดูแลหลังการขายและบันทึกการรับประกัน',
  },
  productProof: {
    title: 'QR Code และ Serial Number',
    description: 'การตรวจสอบเริ่มจาก QR Code และ Serial Number ที่เชื่อมกับข้อมูลการลงทะเบียนสินค้า',
  },
  maintenance: {
    title: 'Warranty-backed after-sales support',
    description: 'บันทึกการดูแลรักษาช่วยให้ลูกค้าและตัวแทนจำหน่ายติดตามการดูแลหลังการติดตั้งได้ชัดเจน',
  },
  whyNexs: {
    title: 'Why NEXS',
    points: [
      'เลือกรุ่นง่ายตามการใช้งาน',
      'ตรวจสอบรับประกันผ่าน QR Code',
      'บัตรรับประกันดิจิทัล',
      'ลงทะเบียนโดย Dealer',
      'มีประวัติการดูแลหลังติดตั้ง',
    ],
  },
  dealer: {
    title: 'สำหรับตัวแทนจำหน่ายและร้านติดตั้ง',
    description: 'Dealer สามารถลงทะเบียนบัตรรับประกัน ดูแลข้อมูลการติดตั้ง และติดตามงานหลังการขายผ่านระบบที่แยกสิทธิ์ชัดเจน',
    primaryCta: 'สมัครตัวแทนจำหน่าย',
    secondaryCta: 'Dealer Login',
  },
  leadForm: {
    title: 'ติดต่อ NEXS',
    description: 'ส่งข้อมูลเพื่อสอบถามราคา ขอคำแนะนำเลือกรุ่น หรือติดต่อเรื่องการเป็นตัวแทนจำหน่าย',
    fields: ['name', 'phone', 'lineId', 'province', 'carModel', 'interestedProduct', 'customerType', 'message'],
    customerTypes: ['customer', 'dealer', 'installer'],
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
