// Spec v5.2 — additional public content per Copy Lock v1.2
//
// Complementary to:
//   - src/content/final-product-content.ts (12 products + FAQ_ITEMS)
//   - src/lib/design-tokens.ts (BRAND_STRINGS, BRAND_COLORS)
//   - src/content/site-content.ts (older — being migrated)
//
// This file holds content that:
//   - Is referenced by Copy Lock v1.2 + Build Plan v5.2
//   - Was not yet present on main as structured data (was inline or missing)
//   - Should be a single source of truth so multiple pages stay in sync

export type Pillar = {
  readonly title: string;
  readonly thai: string;
};

export type StandardCard = {
  readonly title: string;
  readonly copy: string;
};

export type DealerBenefit = {
  readonly title: string;
  readonly thai: string;
  readonly copy: string;
};

export type TechLayer = {
  readonly layer: 1 | 2 | 3 | 4;
  readonly title: string;
  readonly thai: string;
  readonly copy: string;
};

export type TechBenefit = {
  readonly title: string;
  readonly thai: string;
  readonly copy: string;
};

export type HomeStat = {
  readonly key: string;
  readonly value: string;
};

// Homepage Pillars — 4 brand standards per Copy Lock v1.2 §4
export const HOMEPAGE_PILLARS: readonly Pillar[] = [
  { title: 'Precision Surface Engineering', thai: 'วิศวกรรมพื้นผิวรถที่แม่นยำทุกชั้น' },
  { title: 'Advanced Film Technology', thai: 'เทคโนโลยีฟิล์มขั้นสูง เพื่อประสิทธิภาพเหนือระดับ' },
  { title: 'Premium Finish Quality', thai: 'ความใส เงา และเรียบเนียนระดับพรีเมียม' },
  { title: 'Complete Film System', thai: 'ระบบฟิล์มครบทุกความต้องการ เพื่อการปกป้องและสไตล์ที่ลงตัว' },
] as const;

// Homepage stat strip — Copy Lock v1.2 §4
export const HOME_STATS: readonly HomeStat[] = [
  { key: 'Countries', value: '40+ Countries' },
  { key: 'Warranty', value: 'Lifetime up to 10 Years' },
  { key: 'Film Options', value: '12 Film Options' },
  { key: 'Protection', value: 'UV Protection' },
] as const;

// Localized Thai stat line — runs in stat strip alongside the English HOME_STATS
export const HOME_STATS_THAI_TAGLINE = 'ฟิล์มรถยนต์ระดับพรีเมียม 3 กลุ่ม 12 ทางเลือก';

// NEXS Standard — About page 5 cards (Digital Warranty added per spec amendment)
export const NEXS_STANDARD: readonly StandardCard[] = [
  { title: 'Premium Material Selection', copy: 'คัดเลือกวัสดุเกรดพรีเมียม เพื่อประสิทธิภาพ ความใส และความทนทานในระยะยาว' },
  { title: 'Complete Product Architecture', copy: 'โครงสร้างสินค้าออกแบบให้ครอบคลุม Clear, Matte และ Color PPF เพื่อให้เลือกง่ายและแนะนำง่าย' },
  { title: 'Real-World Usability', copy: 'พัฒนาสำหรับการใช้งานจริง ทั้งแสงแดด ความร้อน ความชื้น การล้างรถ และการขับขี่ในชีวิตประจำวัน' },
  { title: 'Support for Dealers and Installers', copy: 'สนับสนุนร้านติดตั้งด้วยความรู้ เครื่องมือ สื่อการขาย และระบบหลังการขายที่ต่อเนื่อง' },
  { title: 'Digital Warranty Verification', copy: 'ระบบบัตรรับประกันดิจิทัล QR-based ที่ลูกค้าตรวจสอบได้ตลอด ผ่านเครือข่ายตัวแทนจำหน่ายที่ได้รับการแต่งตั้ง' },
] as const;

// Brand Story — About page 3 paragraphs per Copy Lock v1.2 §5
export const BRAND_STORY: readonly string[] = [
  'NEXS พัฒนาขึ้นจากความเข้าใจในผิวรถยนต์ งานติดตั้งจริง และความคาดหวังของเจ้าของรถระดับพรีเมียม',
  'เราออกแบบฟิล์มให้เป็นมากกว่าการปกป้อง แต่เป็นระบบที่ช่วยยกระดับความใส ความเงา ความเรียบเนียน และความมั่นใจในการใช้งานจริง',
  'ทุกไลน์สินค้าถูกจัดวางอย่างชัดเจน เพื่อให้ลูกค้าเลือกได้ง่าย ร้านแนะนำได้มั่นใจ และรถทุกคันได้รับฟิล์มที่เหมาะสมกับระดับการใช้งานของตัวเอง',
] as const;

// Dealer Benefits — For Dealers page 6 cards per Copy Lock v1.2 §7
export const DEALER_BENEFITS: readonly DealerBenefit[] = [
  { title: 'Sales-ready Lineup', thai: 'ไลน์สินค้าขายง่าย', copy: 'โครงสร้างสินค้าชัดเจน ช่วยให้ร้านแนะนำลูกค้าได้ง่ายตามงบประมาณและการใช้งาน' },
  { title: 'Training & Certification', thai: 'อบรมและมาตรฐานติดตั้ง', copy: 'สนับสนุนความรู้ด้านสินค้า เทคนิคการติดตั้ง และมาตรฐานการให้บริการ' },
  { title: 'Marketing Support', thai: 'สื่อการตลาดพร้อมใช้', copy: 'จัดเตรียมสื่อสินค้า ภาพ วิดีโอ และ materials สำหรับช่วยปิดการขาย' },
  { title: 'After-sales Support', thai: 'การดูแลหลังการขาย', copy: 'รองรับการสื่อสารกับลูกค้าและดูแลการติดตั้ง เพื่อสร้างความมั่นใจระยะยาว' },
  { title: 'Attractive Profit Margin', thai: 'มาร์จิ้นที่น่าสนใจ', copy: 'ออกแบบให้ร้านสามารถสร้างยอดขายและกำไรได้อย่างยั่งยืน' },
  { title: 'Premium Brand Materials', thai: 'ภาพลักษณ์แบรนด์พรีเมียม', copy: 'ช่วยยกระดับหน้าร้านและความน่าเชื่อถือเมื่อนำเสนอสินค้ากับลูกค้า' },
] as const;

// Technology — 4-layer stack per Copy Lock v1.2 §6
export const TECH_LAYERS: readonly TechLayer[] = [
  { layer: 1, title: 'Self-Healing Top Coat', thai: 'ชั้นซ่อมรอยขนแมว', copy: 'ชั้นผิวด้านบนที่ช่วยลดรอยขนแมวขนาดเล็ก และช่วยให้ผิวฟิล์มดูเรียบเนียนยาวนานขึ้น' },
  { layer: 2, title: 'High Performance TPU', thai: 'ชั้น TPU คุณภาพสูง', copy: 'ชั้น TPU คุณภาพสูง ออกแบบเพื่อความยืดหยุ่น ความทนทาน และการปกป้องผิวรถ' },
  { layer: 3, title: 'Advanced Adhesive', thai: 'กาวคุณภาพสูง', copy: 'กาวคุณภาพสูงที่ช่วยให้ติดตั้งได้แนบเนียน ลดคราบ และรองรับการทำงานของช่างอย่างมืออาชีพ' },
  { layer: 4, title: 'Release Liner', thai: 'แผ่นรองฟิล์ม', copy: 'แผ่นรองฟิล์มคุณภาพสูง ช่วยปกป้องกาวก่อนติดตั้งและทำให้การทำงานสะอาดขึ้น' },
] as const;

// Technology — 6 performance benefits per Copy Lock v1.2 §5
export const TECH_BENEFITS: readonly TechBenefit[] = [
  { title: 'Advanced TPU', thai: 'ชั้น TPU คุณภาพสูง', copy: 'ช่วยรองรับแรงกระแทก ลดรอยขีดข่วน และคงความทนทานของฟิล์มในระยะยาว' },
  { title: 'Optical Clarity', thai: 'ความใสระดับพรีเมียม', copy: 'ออกแบบให้ใสและแนบเนียน ลดความผิดเพี้ยนของผิวรถหลังติดตั้ง' },
  { title: 'Self-Healing Topcoat', thai: 'ชั้นซ่อมรอยขนแมว', copy: 'รอยขนแมวขนาดเล็กสามารถฟื้นตัวได้เมื่อได้รับความร้อนที่เหมาะสม' },
  { title: 'Hydrophobic Surface', thai: 'ผิวไล่น้ำ', copy: 'ช่วยให้น้ำและคราบสกปรกเกาะตัวน้อยลง ดูแลง่ายขึ้น' },
  { title: 'Anti-Yellowing Stability', thai: 'เสถียรภาพต้านเหลือง', copy: 'ช่วยรักษาความใสและความสม่ำเสมอของฟิล์มเมื่อใช้งานระยะยาว' },
  { title: 'Installer-Friendly Adhesive', thai: 'กาวที่ออกแบบเพื่อการติดตั้ง', copy: 'ช่วยให้การติดตั้งแม่นยำ ลดคราบกาว และรองรับงานติดตั้งระดับมืออาชีพ' },
] as const;

// Why Clear PPF — 5 benefit cards (Clear PPF page)
export const WHY_CLEAR_PPF: readonly TechBenefit[] = [
  { title: 'Invisible Protection', thai: 'การปกป้องที่แนบเนียน', copy: 'ปกป้องผิวเดิม โดยคงความใสและเส้นสายของรถให้ดูเป็นธรรมชาติ' },
  { title: 'Gloss Enhancement', thai: 'ยกระดับความเงา', copy: 'ช่วยให้ผิวรถดูฉ่ำ ใส และมีมิติยิ่งขึ้นหลังติดตั้ง' },
  { title: 'Stone-Chip Defense', thai: 'ป้องกันสะเก็ดหิน', copy: 'ลดความเสี่ยงจากรอยสะเก็ดหินและรอยขีดข่วนจากการใช้งานจริง' },
  { title: 'Easy Maintenance', thai: 'ดูแลง่ายขึ้น', copy: 'ผิวฟิล์มช่วยให้ล้างรถง่ายขึ้น ลดการเกาะตัวของคราบสกปรก' },
  { title: 'Long-Term Confidence', thai: 'มั่นใจในระยะยาว', copy: 'ออกแบบเพื่อคงความใส ความเงา และคุณภาพของผิวรถในระยะยาว' },
] as const;

// Hero subcopy (TH) — repeated across pages
export const HERO_SUBCOPY_TH =
  'วิศวกรรมฟิล์มระดับพรีเมียมที่ออกแบบให้แนบเนียนไปกับผิวรถ พร้อมยกระดับความใส ความเงา ความเรียบเนียน และการปกป้องในทุกการใช้งาน';

// Sitewide standard line (Copy Lock v1.2 §1)
export const SITEWIDE_STANDARD = 'A Higher Standard for Every Surface.';
