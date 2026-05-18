// Per-route SEO metadata + JSON-LD schemas per spec v5.2.
// Imported by individual app/<route>/page.tsx files via `export const metadata`.

import type { Metadata } from 'next';

const TITLE_TAIL = ' — NEXS';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://nexsppf.com';

function og(title: string, description: string, path: string): Metadata['openGraph'] {
  return {
    title,
    description,
    url: `${baseUrl}${path}`,
    siteName: 'NEXS',
    type: 'website',
  };
}

export const SEO_HOME: Metadata = {
  title: 'NEXS — Engineered for Perfect Surfaces',
  description:
    'NEXS Paint Protection Film — ฟิล์มปกป้องผิวรถยนต์ระดับพรีเมียม Clear / Matte / Color PPF 12 ทางเลือก พร้อมบัตรรับประกันดิจิทัล',
  keywords: ['NEXS', 'PPF', 'paint protection film', 'ฟิล์มกันรอย', 'ฟิล์มรถยนต์'],
  openGraph: og(
    'NEXS — Engineered for Perfect Surfaces',
    'Think New. Think NEXS. — Engineered to Be Invisible. Better Than Day One.',
    '/',
  ),
};

export const SEO_CLEAR: Metadata = {
  title: 'Clear PPF Collection' + TITLE_TAIL,
  description:
    'ฟิล์มใสกันรอย 4 รุ่น Begin / Prime / Pro / Ultimate สำหรับการปกป้องผิวรถระดับพรีเมียม',
  keywords: ['Clear PPF', 'ฟิล์มใสกันรอย', 'paint protection film'],
  openGraph: og('Clear PPF Collection — NEXS', 'ฟิล์มใสกันรอย 4 รุ่น', '/clear-ppf'),
};

export const SEO_MATTE: Metadata = {
  title: 'Matte PPF Collection' + TITLE_TAIL,
  description:
    'ฟิล์มด้านกันรอย 3 รุ่น Matte Prime / Pro / Ultimate สำหรับผิว matte และ satin ระดับพรีเมียม',
  keywords: ['Matte PPF', 'ฟิล์มด้าน', 'satin film'],
  openGraph: og('Matte PPF Collection — NEXS', 'ฟิล์มด้านกันรอย 3 รุ่น', '/matte-ppf'),
};

export const SEO_COLOR: Metadata = {
  title: 'Color Film Collection' + TITLE_TAIL,
  description:
    'ฟิล์มสี PPF 5 รุ่น พร้อม Color Ultimate Carbon Fiber เปลี่ยนลุครถพร้อมการปกป้อง',
  keywords: ['Color PPF', 'ฟิล์มสี', 'wrap', 'carbon fiber PPF'],
  openGraph: og('Color Film Collection — NEXS', 'ฟิล์มสี PPF 5 รุ่น', '/color-ppf'),
};

export const SEO_TECHNOLOGY: Metadata = {
  title: 'The Technology Behind the Finish' + TITLE_TAIL,
  description:
    'เทคโนโลยีฟิล์ม NEXS — Self-Healing, TPU, Hydrophobic, Anti-Yellowing, Installer-Friendly Adhesive',
  keywords: ['TPU film', 'self-healing PPF', 'hydrophobic film'],
  openGraph: og('Technology — NEXS', 'เทคโนโลยีฟิล์มขั้นสูง', '/technology'),
};

export const SEO_COMPARE: Metadata = {
  title: 'Compare Film Systems' + TITLE_TAIL,
  description:
    'เปรียบเทียบรุ่นในกลุ่ม Clear / Matte / Color PPF เพื่อเลือกตามการใช้งานจริง',
  keywords: ['compare PPF products', 'NEXS comparison'],
  openGraph: og('Compare NEXS Film Systems', 'Find Your Best Match', '/compare'),
};

export const SEO_DEALERS: Metadata = {
  title: 'Built for Installers' + TITLE_TAIL,
  description:
    'ร่วมเป็นตัวแทนจำหน่าย NEXS ด้วยระบบสินค้าและการสนับสนุนที่ครบครัน',
  keywords: ['PPF dealer', 'installer program', 'NEXS dealer'],
  openGraph: og('Built for Installers — NEXS', 'Become a Dealer', '/for-dealers'),
};

export const SEO_ABOUT: Metadata = {
  title: 'About NEXS — Engineered for Perfect Surfaces' + TITLE_TAIL,
  description:
    'NEXS แบรนด์ฟิล์มรถยนต์ที่พัฒนาจากความเข้าใจในผิวรถจริงและมาตรฐานของเจ้าของรถระดับพรีเมียม',
  keywords: ['NEXS brand', 'automotive surface technology'],
  openGraph: og('About NEXS', 'A Higher Standard for Invisible Surfaces.', '/about-nexs'),
};

export const SEO_FAQ: Metadata = {
  title: 'Frequently Asked Questions' + TITLE_TAIL,
  description:
    'คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับ NEXS PPF การติดตั้ง การดูแล และบัตรรับประกัน',
  keywords: ['PPF FAQ Thailand', 'NEXS warranty'],
  openGraph: og('NEXS FAQ', 'คำถามที่พบบ่อย', '/faq'),
};

export const SEO_CONTACT: Metadata = {
  title: 'Contact NEXS' + TITLE_TAIL,
  description:
    'ติดต่อทีม NEXS เพื่อสอบถามสินค้า ขอใบเสนอราคา หรือสมัครเป็นตัวแทนจำหน่าย',
  keywords: ['contact NEXS', 'nexsppf'],
  openGraph: og('Contact NEXS', 'Let NEXS guide the right film system.', '/contact'),
};

export const SEO_WARRANTY: Metadata = {
  title: 'Digital Warranty Lookup' + TITLE_TAIL,
  description:
    'ตรวจสอบบัตรรับประกันดิจิทัล NEXS ด้วย Serial Number บนบรรจุภัณฑ์หรือบัตร',
  keywords: ['NEXS warranty', 'digital warranty', 'QR warranty'],
  openGraph: og('Digital Warranty Lookup — NEXS', 'ตรวจสอบบัตรรับประกันดิจิทัล', '/warranty'),
};

// ----- JSON-LD schemas -----

export const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NEXS',
  alternateName: 'NEXS Paint Protection Film',
  description: 'ENGINEERED FOR PERFECT SURFACES',
  slogan: 'Think New. Think NEXS.',
  url: baseUrl,
  sameAs: [
    'https://www.facebook.com/nexsppf',
    'https://www.instagram.com/nexsppf',
    'https://www.tiktok.com/@nexsppf',
    'https://www.youtube.com/@nexsppf',
  ],
};

export type FaqLDItem = { question: string; answer: string };

export function faqSchemaLD(items: readonly FaqLDItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}
