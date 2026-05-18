// Per-route SEO metadata
// Used by useSEO() hook to set document.title + meta tags + JSON-LD on navigation.

import { BRAND } from './brand.js';

const tail = " — NEXS";

export const SEO = {
  home: {
    title: "NEXS — Engineered for Perfect Surfaces",
    description: "ฟิล์มปกป้องผิวรถยนต์ระดับพรีเมียม Clear / Matte / Color PPF 12 ทางเลือก พร้อมบัตรรับประกันดิจิทัล",
    keywords: "NEXS, PPF, paint protection film, ฟิล์มกันรอย, ฟิล์มรถยนต์",
  },
  "clear-ppf": {
    title: "Clear PPF Collection" + tail,
    description: "ฟิล์มใสกันรอย 4 รุ่น Begin / Prime / Pro / Ultimate สำหรับการปกป้องผิวรถระดับพรีเมียม",
    keywords: "Clear PPF, ฟิล์มใสกันรอย, paint protection film",
  },
  "matte-ppf": {
    title: "Matte PPF Collection" + tail,
    description: "ฟิล์มด้านกันรอย 3 รุ่น Matte Prime / Pro / Ultimate สำหรับผิว matte และ satin ระดับพรีเมียม",
    keywords: "Matte PPF, ฟิล์มด้าน, satin film",
  },
  "color-ppf": {
    title: "Color Film Collection" + tail,
    description: "ฟิล์มสี PPF 5 รุ่น พร้อม Color Ultimate Carbon Fiber เปลี่ยนลุครถพร้อมการปกป้อง",
    keywords: "Color PPF, ฟิล์มสี, wrap, carbon fiber PPF",
  },
  technology: {
    title: "The Technology Behind the Finish" + tail,
    description: "เทคโนโลยีฟิล์ม NEXS — Self-Healing, TPU, Hydrophobic, Anti-Yellowing, Installer-Friendly Adhesive",
    keywords: "TPU film, self-healing PPF, hydrophobic film",
  },
  compare: {
    title: "Compare Film Systems" + tail,
    description: "เปรียบเทียบรุ่นในกลุ่ม Clear / Matte / Color PPF เพื่อเลือกตามการใช้งานจริง",
    keywords: "compare PPF products",
  },
  "for-dealers": {
    title: "Built for Installers" + tail,
    description: "ร่วมเป็นตัวแทนจำหน่าย NEXS ด้วยระบบสินค้าและการสนับสนุนที่ครบครัน",
    keywords: "PPF dealer, installer program, NEXS dealer",
  },
  "about-nexs": {
    title: "About NEXS — Engineered for Perfect Surfaces" + tail,
    description: "NEXS แบรนด์ฟิล์มรถยนต์ที่พัฒนาจากความเข้าใจในผิวรถจริงและมาตรฐานของเจ้าของรถระดับพรีเมียม",
    keywords: "NEXS brand, automotive surface technology",
  },
  faq: {
    title: "Frequently Asked Questions" + tail,
    description: "คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับ NEXS PPF การติดตั้ง การดูแล และบัตรรับประกัน",
    keywords: "PPF FAQ Thailand",
  },
  contact: {
    title: "Contact NEXS" + tail,
    description: "ติดต่อทีม NEXS เพื่อสอบถามสินค้า ขอใบเสนอราคา หรือสมัครเป็นตัวแทนจำหน่าย",
    keywords: "contact NEXS, " + BRAND.handle,
  },
  warranty: {
    title: "Digital Warranty Lookup" + tail,
    description: "ตรวจสอบบัตรรับประกันดิจิทัล NEXS ด้วย Serial Number บนบรรจุภัณฑ์หรือบัตร",
    keywords: "NEXS warranty, digital warranty",
  },
};

// JSON-LD — Organization (no pricing per spec)
export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NEXS",
  alternateName: "NEXS Paint Protection Film",
  description: BRAND.descriptor,
  slogan: BRAND.campaign,
  url: `https://${BRAND.handle}.com/`,
  sameAs: [
    `https://www.facebook.com/${BRAND.handle}`,
    `https://www.instagram.com/${BRAND.handle}`,
    `https://www.tiktok.com/@${BRAND.handle}`,
    `https://www.youtube.com/@${BRAND.handle}`,
  ],
};

// JSON-LD — FAQ schema generator
export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(it => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
