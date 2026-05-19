import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://nexsppf.com';

type SeoEntry = {
  readonly title: string;
  readonly description: string;
  readonly keywords?: string;
};

const SEO: Record<string, SeoEntry> = {
  home: {
    title: 'NEXS — Engineered for Perfect Surfaces',
    description: 'NEXS Paint Protection Film — ฟิล์มปกป้องผิวรถยนต์ระดับพรีเมียม Clear / Matte / Color PPF พร้อมบัตรรับประกันดิจิทัล',
    keywords: 'NEXS, PPF, paint protection film, ฟิล์มกันรอย, ฟิล์มรถยนต์',
  },
  'clear-ppf': {
    title: 'Clear PPF Collection — NEXS',
    description: 'ฟิล์มใสกันรอย NEXS Begin / Prime / Pro / Ultimate สำหรับการปกป้องผิวรถระดับพรีเมียม',
    keywords: 'Clear PPF, ฟิล์มใสกันรอย',
  },
  'matte-ppf': {
    title: 'Matte PPF Collection — NEXS',
    description: 'ฟิล์มด้านกันรอย NEXS สำหรับผิว matte และ satin ระดับพรีเมียม',
    keywords: 'Matte PPF, ฟิล์มด้าน, satin film',
  },
  'color-ppf': {
    title: 'Color Film Collection — NEXS',
    description: 'ฟิล์มสี PPF NEXS เปลี่ยนลุครถพร้อมการปกป้องในฟิล์มเดียว',
    keywords: 'Color PPF, ฟิล์มสี, wrap',
  },
  technology: {
    title: 'The Technology Behind the Finish — NEXS',
    description: 'เทคโนโลยีฟิล์ม NEXS — Self-Healing, TPU, Hydrophobic, Anti-Yellowing',
    keywords: 'TPU film, self-healing PPF, hydrophobic film',
  },
  compare: {
    title: 'Compare Film Systems — NEXS',
    description: 'เปรียบเทียบรุ่นในกลุ่ม Clear / Matte / Color PPF เพื่อเลือกตามการใช้งานจริง',
  },
  'for-dealers': {
    title: 'Built for Installers — NEXS',
    description: 'ร่วมเป็นตัวแทนจำหน่าย NEXS ด้วยระบบสินค้าและการสนับสนุนที่ครบครัน',
    keywords: 'PPF dealer, installer program',
  },
  about: {
    title: 'About NEXS — Engineered for Perfect Surfaces',
    description: 'NEXS แบรนด์ฟิล์มรถยนต์ที่พัฒนาจากความเข้าใจในผิวรถจริงและมาตรฐานของเจ้าของรถระดับพรีเมียม',
  },
  'about-nexs': {
    title: 'About NEXS — Engineered for Perfect Surfaces',
    description: 'NEXS แบรนด์ฟิล์มรถยนต์ที่พัฒนาจากความเข้าใจในผิวรถจริงและมาตรฐานของเจ้าของรถระดับพรีเมียม',
  },
  faq: {
    title: 'Frequently Asked Questions — NEXS',
    description: 'คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับ NEXS PPF การติดตั้ง การดูแล และบัตรรับประกัน',
  },
  contact: {
    title: 'Contact NEXS',
    description: 'ติดต่อทีม NEXS เพื่อสอบถามสินค้า ขอใบเสนอราคา หรือสมัครเป็นตัวแทนจำหน่าย',
  },
  warranty: {
    title: 'Digital Warranty Lookup — NEXS',
    description: 'ตรวจสอบบัตรรับประกันดิจิทัล NEXS ด้วย Serial Number บนบรรจุภัณฑ์หรือบัตร',
  },
  'warranty-policy': {
    title: 'Warranty Policy — NEXS',
    description: 'นโยบายการรับประกัน NEXS Paint Protection Film',
  },
  dealer: {
    title: 'Dealer — NEXS',
    description: 'NEXS Authorized Dealer — สมัครเป็นตัวแทนจำหน่ายและเข้าระบบ',
  },
  products: {
    title: 'Products — NEXS',
    description: 'NEXS Film Systems — Clear / Matte / Color PPF',
  },
  privacy: {
    title: 'Privacy Policy — NEXS',
    description: 'นโยบายความเป็นส่วนตัว NEXS',
  },
  'support-warranty': {
    title: 'แจ้งบัตรรับประกัน / QR สูญหาย — NEXS',
    description: 'ส่งคำขอตรวจสอบสิทธิ์เพื่อออกบัตรรับประกัน / QR ใหม่',
  },
  'support-inspection': {
    title: 'นัดตรวจสอบฟิล์ม — NEXS',
    description: 'ส่งคำขอตรวจสอบฟิล์มและงานหลังการติดตั้งกับ NEXS',
  },
};

export type SeoKey = keyof typeof SEO;

/**
 * Generate per-page Metadata for Next.js metadata API.
 * Adds: canonical URL, OG tags, Twitter card.
 *
 * Usage in page.tsx:
 *   export const metadata = seoFor('clear-ppf', '/clear-ppf');
 */
export function seoFor(key: SeoKey, path: string = ''): Metadata {
  const entry = SEO[key];
  const url = `${SITE_URL}${path}`;
  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url,
      siteName: 'NEXS',
      type: 'website',
      locale: 'th_TH',
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.description,
    },
  };
}
