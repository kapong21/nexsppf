// Seed data for all 12 NEXS PPF product options.
// Clear PPF (4): Begin, Prime, Pro, Ultimate
// Matte PPF (3): Matte Prime, Matte Pro, Matte Ultimate
// Color PPF (5): Color Begin, Color Prime, Color Pro, Color Ultimate, Ultimate Carbon Fiber

export type ProductCategorySeed = {
  name: 'clear' | 'matte' | 'color';
  label: string;
  thaiLabel: string;
  order: number;
};

export type ProductOptionSeed = {
  name: string;
  sku: string;
  category: 'clear' | 'matte' | 'color';
  tier: 'begin' | 'prime' | 'pro' | 'ultimate' | 'ultimate_cf';
  warrantyYears: number;
  headline: string;
  thaiDescription: string;
  badge: string;
  order: number;
};

export const PRODUCT_CATEGORIES: readonly ProductCategorySeed[] = [
  { name: 'clear', label: 'Clear PPF', thaiLabel: 'ฟิล์มใส', order: 1 },
  { name: 'matte', label: 'Matte PPF', thaiLabel: 'ฟิล์มด้าน', order: 2 },
  { name: 'color', label: 'Color PPF', thaiLabel: 'ฟิล์มสี', order: 3 },
] as const;

export const PRODUCT_OPTIONS: readonly ProductOptionSeed[] = [
  // Clear PPF
  {
    name: 'NEXS Begin',
    sku: 'CLEAR-BEGIN',
    category: 'clear',
    tier: 'begin',
    warrantyYears: 5,
    headline: 'NEXS Begin',
    thaiDescription: 'ฟิล์มปกป้องสีรถสำหรับการใช้งานประจำวัน คุ้มค่า เข้าถึงง่าย',
    badge: 'เริ่มต้น',
    order: 1,
  },
  {
    name: 'NEXS Prime',
    sku: 'CLEAR-PRIME',
    category: 'clear',
    tier: 'prime',
    warrantyYears: 6,
    headline: 'NEXS Prime',
    thaiDescription: 'รุ่นหลักของ NEXS สำหรับลูกค้าที่ต้องการความสมดุล',
    badge: 'รุ่นแนะนำ',
    order: 2,
  },
  {
    name: 'NEXS Pro',
    sku: 'CLEAR-PRO',
    category: 'clear',
    tier: 'pro',
    warrantyYears: 8,
    headline: 'NEXS Pro',
    thaiDescription: 'ฟิล์มปกป้องสีรถระดับพรีเมียม สำหรับลูกค้าที่ต้องการการปกป้องที่สูงขึ้น',
    badge: 'พรีเมียม',
    order: 3,
  },
  {
    name: 'NEXS Ultimate',
    sku: 'CLEAR-ULTIMATE',
    category: 'clear',
    tier: 'ultimate',
    warrantyYears: 9,
    headline: 'NEXS Ultimate',
    thaiDescription: 'ฟิล์มปกป้องสีรถรุ่นสูงสุดของ NEXS',
    badge: 'รุ่นสูงสุด',
    order: 4,
  },
  // Matte PPF
  {
    name: 'NEXS Matte Prime',
    sku: 'MATTE-PRIME',
    category: 'matte',
    tier: 'prime',
    warrantyYears: 6,
    headline: 'NEXS Matte Prime',
    thaiDescription: 'ฟิล์มด้านรุ่นหลัก เพิ่มมิติให้รถด้วย Matte finish',
    badge: 'รุ่นแนะนำ',
    order: 5,
  },
  {
    name: 'NEXS Matte Pro',
    sku: 'MATTE-PRO',
    category: 'matte',
    tier: 'pro',
    warrantyYears: 8,
    headline: 'NEXS Matte Pro',
    thaiDescription: 'ฟิล์มด้านระดับพรีเมียมสำหรับลูกค้าที่ต้องการตัวเลือกที่สูงขึ้น',
    badge: 'พรีเมียม',
    order: 6,
  },
  {
    name: 'NEXS Matte Ultimate',
    sku: 'MATTE-ULTIMATE',
    category: 'matte',
    tier: 'ultimate',
    warrantyYears: 9,
    headline: 'NEXS Matte Ultimate',
    thaiDescription: 'ฟิล์มด้านรุ่นสูงสุด สำหรับรถที่ต้องการการปกป้องระดับเรือธง',
    badge: 'รุ่นสูงสุด',
    order: 7,
  },
  // Color PPF
  {
    name: 'NEXS Color Begin',
    sku: 'COLOR-BEGIN',
    category: 'color',
    tier: 'begin',
    warrantyYears: 5,
    headline: 'NEXS Color Begin',
    thaiDescription: 'ฟิล์มสีเริ่มต้น เพิ่มบุคลิกให้รถด้วยไลน์สี NEXS',
    badge: 'เริ่มต้น',
    order: 8,
  },
  {
    name: 'NEXS Color Prime',
    sku: 'COLOR-PRIME',
    category: 'color',
    tier: 'prime',
    warrantyYears: 6,
    headline: 'NEXS Color Prime',
    thaiDescription: 'ฟิล์มสีรุ่นหลักสำหรับลูกค้าที่ต้องการตัวเลือกด้านภาพลักษณ์',
    badge: 'รุ่นแนะนำ',
    order: 9,
  },
  {
    name: 'NEXS Color Pro',
    sku: 'COLOR-PRO',
    category: 'color',
    tier: 'pro',
    warrantyYears: 8,
    headline: 'NEXS Color Pro',
    thaiDescription: 'ฟิล์มสีระดับพรีเมียมสำหรับลูกค้าที่ต้องการตัวเลือกที่สูงขึ้น',
    badge: 'พรีเมียม',
    order: 10,
  },
  {
    name: 'NEXS Color Ultimate',
    sku: 'COLOR-ULTIMATE',
    category: 'color',
    tier: 'ultimate',
    warrantyYears: 9,
    headline: 'NEXS Color Ultimate',
    thaiDescription: 'ฟิล์มสีรุ่นสูงสุด สำหรับลูกค้าที่ต้องการตัวเลือกระดับเรือธง',
    badge: 'รุ่นสูงสุด',
    order: 11,
  },
  {
    name: 'NEXS Ultimate Carbon Fiber',
    sku: 'COLOR-ULTIMATE-CF',
    category: 'color',
    tier: 'ultimate_cf',
    warrantyYears: 9,
    headline: 'NEXS Ultimate Carbon Fiber',
    thaiDescription: 'ฟิล์ม Carbon Fiber ระดับสูงสุดสำหรับลูกค้าที่ต้องการลวดลายพิเศษ',
    badge: 'คาร์บอนไฟเบอร์',
    order: 12,
  },
] as const;
