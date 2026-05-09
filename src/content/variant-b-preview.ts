export type VariantBPage = {
  readonly path: string;
  readonly title: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly variant: 'B';
  readonly productionReady: false;
};

export type VariantBProductCard = {
  readonly name: 'BEGIN' | 'PRIME' | 'PRO' | 'ULTIMATE';
  readonly modelCode: 'B' | 'P' | 'PRO' | 'U';
  readonly warrantyYears: 5 | 6 | 8 | 9;
  readonly badge: string;
  readonly headline: string;
  readonly body: string;
  readonly accent: string;
};

export const VARIANT_B_PAGES: readonly VariantBPage[] = [
  {
    path: '/preview',
    title: 'NEXS Paint Protection Film',
    eyebrow: 'Variant B Public Preview',
    description: 'ดีไซน์ใหม่แบบ light premium สำหรับดูภาพรวมเว็บไซต์บน path preview ก่อนเลือกใช้งานจริง',
    variant: 'B',
    productionReady: false,
  },
  {
    path: '/preview-redesign',
    title: 'NEXS Paint Protection Film',
    eyebrow: 'Variant B Preview',
    description: 'ดีไซน์ใหม่แบบ light premium สำหรับดูภาพรวมเว็บไซต์ก่อนเลือกใช้งานจริง',
    variant: 'B',
    productionReady: false,
  },
  {
    path: '/preview-redesign/products',
    title: 'เลือก NEXS PPF ให้เหมาะกับรถของคุณ',
    eyebrow: 'Product Line',
    description: 'เปรียบเทียบ 4 รุ่นหลักด้วยข้อมูลสั้น ชัด และไม่แสดงราคา public',
    variant: 'B',
    productionReady: false,
  },
  {
    path: '/preview-redesign/warranty',
    title: 'Digital Warranty ที่ตรวจสอบได้ผ่าน QR Code',
    eyebrow: 'Warranty Preview',
    description: 'หน้าตรวจสอบ Serial และบัตรรับประกันดิจิทัลแบบ mock สำหรับตรวจ design เท่านั้น',
    variant: 'B',
    productionReady: false,
  },
  {
    path: '/preview-redesign/dealer',
    title: 'ร่วมเป็นตัวแทนจำหน่าย NEXS PPF',
    eyebrow: 'Dealer Program',
    description: 'หน้าแนะนำตัวแทนจำหน่ายแบบ public-first ก่อนเข้าสู่ระบบจริง',
    variant: 'B',
    productionReady: false,
  },
  {
    path: '/preview-redesign/contact',
    title: 'ติดต่อ NEXS',
    eyebrow: 'Contact',
    description: 'ฟอร์ม lead generation สำหรับลูกค้าและร้านค้าที่ต้องการให้ทีมงานติดต่อกลับ',
    variant: 'B',
    productionReady: false,
  },
] as const;

export const VARIANT_B_NAV_ITEMS = [
  { label: 'หน้าแรก', href: '/preview-redesign' },
  { label: 'สินค้า', href: '/preview-redesign/products' },
  { label: 'บัตรรับประกัน', href: '/preview-redesign/warranty' },
  { label: 'ตัวแทนจำหน่าย', href: '/preview-redesign/dealer' },
  { label: 'ติดต่อเรา', href: '/preview-redesign/contact' },
] as const;

export const VARIANT_B_PRODUCT_CARDS: readonly VariantBProductCard[] = [
  {
    name: 'BEGIN',
    modelCode: 'B',
    warrantyYears: 5,
    badge: 'เริ่มต้น',
    headline: 'Entry Smart Choice',
    body: 'เหมาะกับลูกค้าที่เริ่มต้นดูแลสีรถในชีวิตประจำวัน',
    accent: 'silver',
  },
  {
    name: 'PRIME',
    modelCode: 'P',
    warrantyYears: 6,
    badge: 'รุ่นแนะนำ',
    headline: 'Best Value Core',
    body: 'รุ่นหลักของ NEXS สำหรับความสมดุลระหว่างการดูแลและความคุ้มค่า',
    accent: 'blue-silver',
  },
  {
    name: 'PRO',
    modelCode: 'PRO',
    warrantyYears: 8,
    badge: 'พรีเมียม',
    headline: 'Premium Pick',
    body: 'สำหรับลูกค้าที่ต้องการตัวเลือกระดับพรีเมียมและการดูแลที่ชัดเจน',
    accent: 'red-graphite',
  },
  {
    name: 'ULTIMATE',
    modelCode: 'U',
    warrantyYears: 9,
    badge: 'รุ่นสูงสุด',
    headline: 'Flagship Choice',
    body: 'ตัวเลือกระดับเรือธงสำหรับลูกค้าที่ต้องการระยะรับประกันยาวที่สุด',
    accent: 'gold-black',
  },
] as const;

export const VARIANT_B_HOME_SECTIONS = [
  {
    title: 'ทุกการขับขี่ทิ้งร่องรอยไว้บนสีรถ',
    body: 'PPF คือชั้นปกป้องระหว่างผิวสีและโลกภายนอก ช่วยให้ลูกค้าดูแลรถอย่างเป็นระบบตั้งแต่วันแรก',
  },
  {
    title: 'เลือกง่าย ไม่ต้องอ่านข้อมูลซับซ้อน',
    body: 'สี่รุ่นหลักแยกตามระดับการดูแล ระยะรับประกัน และรูปแบบการใช้งานจริง',
  },
  {
    title: 'มีระบบบัตรรับประกันดิจิทัล',
    body: 'Dealer ลงทะเบียนหลังติดตั้ง ลูกค้าสแกน QR เพื่อดูสถานะและข้อมูลแบบ PDPA-safe',
  },
  {
    title: 'เชื่อมต่อบริการหลังการขาย',
    body: 'ลูกค้าสามารถส่งคำขอแจ้งบัตรหาย QR หาย หรือนัดตรวจสอบงานหลังติดตั้งได้',
  },
] as const;

export const VARIANT_B_WARRANTY_STEPS = [
  'ติดตั้งกับตัวแทนจำหน่าย',
  'Dealer ลงทะเบียน Serial และข้อมูลรถ',
  'ลูกค้าสแกน QR Code',
  'ดู Digital Warranty Card และประวัติการดูแลแบบปลอดภัย',
] as const;

export const VARIANT_B_DEALER_BENEFITS = [
  'ลงทะเบียนบัตรรับประกันให้ลูกค้าหลังติดตั้ง',
  'ตรวจสอบ Serial และ QR ก่อนส่งมอบงาน',
  'ดูประวัติงานของร้านใน workflow เดียวกัน',
  'เพิ่มความน่าเชื่อถือด้วยระบบหลังการขายของแบรนด์',
] as const;

export function collectVariantBPublicText(): string {
  return [
    ...VARIANT_B_PAGES.flatMap((page) => [page.title, page.eyebrow, page.description]),
    ...VARIANT_B_NAV_ITEMS.flatMap((item) => [item.label, item.href]),
    ...VARIANT_B_PRODUCT_CARDS.flatMap((card) => [
      card.name,
      card.modelCode,
      String(card.warrantyYears),
      card.badge,
      card.headline,
      card.body,
      card.accent,
    ]),
    ...VARIANT_B_HOME_SECTIONS.flatMap((section) => [section.title, section.body]),
    ...VARIANT_B_WARRANTY_STEPS,
    ...VARIANT_B_DEALER_BENEFITS,
    'สอบถามราคา',
    'ดูรายละเอียด',
    'ตรวจสอบบัตรรับประกัน',
    'สมัครตัวแทนจำหน่าย',
    'ข้อมูลนี้เป็น preview สำหรับตรวจ design เท่านั้น',
  ].join('\n');
}
