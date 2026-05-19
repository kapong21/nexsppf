// NEXS — Single source of truth for brand language, copy, products.
// Sourced from Docs/web-reference/NEXS_Final_Copy_Lock_v1_2_No_Public_Pricing.docx
// and nexs_design_tokens_v4_0.json. CMS migration will replace this module.

export const BRAND = {
  name: "NEXS",
  descriptor: "ENGINEERED FOR PERFECT SURFACES",
  campaign: "Think New. Think NEXS.",
  heroEN: "Engineered to Be Invisible. Better Than Day One.",
  heroTH: "ยิ่งมองไม่เห็นฟิล์ม ยิ่งเห็นความสมบูรณ์แบบ",
  heroSubcopyTH:
    "วิศวกรรมฟิล์มระดับพรีเมียมที่ออกแบบให้แนบเนียนไปกับผิวรถ พร้อมยกระดับความใส ความเงา ความเรียบเนียน และการปกป้องในทุกการใช้งาน",
  quote: "A Higher Standard for Invisible Surfaces.",
  quoteTH: "มาตรฐานที่สูงกว่า สำหรับทุกพื้นผิวที่คุณมองไม่เห็น",
  sitewideStandard: "A Higher Standard for Every Surface.",
  tone: "Premium / clean / technology-driven / Apple-style minimal / reliable / confident",
  handle: "nexsppf",
};

// Public CTA labels — replace any "สอบถามราคา" with these. No public pricing allowed.
export const CTA = {
  primary: "ขอใบเสนอราคา",
  primaryEN: "Get a Quote",
  bookConsultation: "Book Consultation",
  findInstaller: "Find an Installer",
  findInstallerTH: "หาตัวแทนจำหน่าย",
  talkExpert: "Talk to an Expert",
  exploreProducts: "Explore Products",
  exploreFilmSystems: "Explore Film Systems",
  viewCollection: "View Collection",
  becomeDealer: "Become a Dealer",
  dealerLogin: "Dealer Login",
  compareAll: "Compare All Models",
  viewAllFinishes: "View All Finishes",
};

// Homepage stats — replaces previous "9 ปี / 4 รุ่น" stats
export const HOME_STATS = [
  { k: "Countries", v: "40+ Countries" },
  { k: "Warranty", v: "Warranty up to 10 Years" },
  { k: "Film Options", v: "12 Film Options" },
  { k: "Protection", v: "UV Protection" },
];

// Brand pillars (Why NEXS — 4 cards)
export const HOMEPAGE_PILLARS = [
  { title: "Precision Surface Engineering", th: "วิศวกรรมพื้นผิวรถที่แม่นยำทุกชั้น" },
  { title: "Advanced Film Technology", th: "เทคโนโลยีฟิล์มขั้นสูง เพื่อประสิทธิภาพเหนือระดับ" },
  { title: "Premium Finish Quality", th: "ความใส เงา และเรียบเนียนระดับพรีเมียม" },
  { title: "Complete Film System", th: "ระบบฟิล์มครบทุกความต้องการ เพื่อการปกป้องและสไตล์ที่ลงตัว" },
];

// Product groups — 3 categories
export const PRODUCT_GROUPS = {
  clear: {
    id: "clear",
    code: "CLEAR",
    name: "Clear PPF",
    slug: "clear-ppf",
    headlineTH: "ฟิล์มใสกันรอย",
    homepageTH:
      "ฟิล์มใสกันรอย 4 รุ่น ตั้งแต่ Entry ถึง Flagship สำหรับความใส ความเงา และการปกป้องที่แนบเนียน",
    heroTitle: "Clear PPF Collection",
    heroTH:
      "ฟิล์มใสกันรอย 4 รุ่น เลือกได้ตามงบประมาณ การใช้งาน และระดับความพรีเมียมที่คุณต้องการ",
    heroConcept: "Engineered to Be Invisible. Better Than Day One.",
    heroConceptTH: "ยิ่งมองไม่เห็นฟิล์ม ยิ่งเห็นความสมบูรณ์แบบของผิวรถ",
  },
  matte: {
    id: "matte",
    code: "MATTE",
    name: "Matte PPF",
    slug: "matte-ppf",
    headlineTH: "ฟิล์มด้านกันรอย",
    homepageTH:
      "ฟิล์มด้านกันรอย 3 รุ่น สำหรับผิว matte / satin ระดับพรีเมียม",
    heroTitle: "Matte & Color Film Collection",
    heroTH: "ฟิล์มด้านและฟิล์มสี PPF สำหรับผิวสัมผัสและสไตล์ที่แตกต่าง",
  },
  color: {
    id: "color",
    code: "COLOR",
    name: "Color PPF",
    slug: "color-ppf",
    headlineTH: "ฟิล์มสี",
    homepageTH:
      "ฟิล์มสี PPF 5 รุ่น สำหรับเปลี่ยนลุคและพื้นผิวที่แตกต่าง พร้อมการปกป้องในฟิล์มเดียว",
  },
};

// 12 Film Options — Clear 4, Matte 3, Color 5
// NOTE: No price fields. No supplier/dealer cost. Warranty uses "up to 10 years" placeholder.
export const PRODUCTS = [
  // ---- Clear PPF (4) ----
  {
    code: "BEGIN",
    group: "clear",
    name: "Begin",
    role: "Entry",
    badge: "เริ่มต้น",
    tagline: "Daily Protection",
    benefit:
      "เริ่มต้นการปกป้องอย่างคุ้มค่า สำหรับรถใช้งานประจำวันที่ต้องการความใสและการดูแลที่ง่ายขึ้น",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#F2F3F4 0%,#DADBDE 100%)",
    fg: "#111111",
    publicSpecs: {
      gloss: "High Gloss",
      selfHealing: "Good",
      yellowing: "Good",
      idealUser: "Daily Protection",
    },
  },
  {
    code: "PRIME",
    group: "clear",
    name: "Prime",
    role: "Best Balance",
    badge: "รุ่นแนะนำ",
    tagline: "Best Balance",
    benefit:
      "สมดุลที่สุดสำหรับการใช้งานทุกวัน ให้ความใส ความเงา และความมั่นใจในระดับที่เหนือกว่า",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#ECEBE8 0%,#BFC3C7 100%)",
    fg: "#111111",
    publicSpecs: {
      gloss: "High Gloss",
      selfHealing: "Very Good",
      yellowing: "Very Good",
      idealUser: "Daily & Weekend Use",
    },
  },
  {
    code: "PRO",
    group: "clear",
    name: "Pro",
    role: "Performance",
    badge: "พรีเมียม",
    tagline: "Performance",
    benefit:
      "ประสิทธิภาพสูงขึ้น สำหรับผู้ที่ต้องการการปกป้องจริงจัง พร้อม finish ที่เนียนและพรีเมียมกว่า",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#1D1D1F 0%,#0E0E0F 100%)",
    fg: "#F2F3F4",
    publicSpecs: {
      gloss: "High Gloss+",
      selfHealing: "Excellent",
      yellowing: "Excellent",
      idealUser: "Performance Enthusiast",
    },
  },
  {
    code: "ULTIMATE",
    group: "clear",
    name: "Ultimate",
    role: "Flagship",
    badge: "รุ่นสูงสุด",
    tagline: "Flagship",
    benefit:
      "ระดับสูงสุดของฟิล์มใส NEXS สำหรับรถที่ต้องการความสมบูรณ์แบบทั้งความใส ความเงา และความทนทาน",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#0E0E0F 0%,#000000 100%)",
    fg: "#F5E6B8",
    pill: "pill-ultra",
    publicSpecs: {
      gloss: "Ultra Gloss",
      selfHealing: "Excellent+",
      yellowing: "Excellent+",
      idealUser: "Luxury & Perfectionist",
    },
  },

  // ---- Matte PPF (3) ----
  {
    code: "MATTE_PRIME",
    group: "matte",
    name: "Matte Prime",
    role: "Smooth Matte",
    badge: "ด้านเรียบเนียน",
    tagline: "Smooth Matte",
    benefit:
      "ฟิล์มด้านระดับพรีเมียมสำหรับรถสีด้านหรือซาติน คง texture ดั้งเดิม พร้อมช่วยปกป้องผิวรถในทุกวัน",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#5F6368 0%,#3A3D42 100%)",
    fg: "#F2F3F4",
    publicSpecs: {
      gloss: "Smooth Matte",
      selfHealing: "Good",
      yellowing: "Very Good",
      idealUser: "Matte Daily Use",
    },
  },
  {
    code: "MATTE_PRO",
    group: "matte",
    name: "Matte Pro",
    role: "Refined Matte",
    badge: "ด้านพรีเมียม",
    tagline: "Refined Matte",
    benefit:
      "ผิวด้านที่ละเอียดและสม่ำเสมอขึ้น สำหรับรถสีด้าน/ซาตินที่ต้องการลุคพรีเมียมและการปกป้องระดับสูง",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#3A3D42 0%,#1D1D1F 100%)",
    fg: "#F2F3F4",
    publicSpecs: {
      gloss: "Refined Matte",
      selfHealing: "Very Good",
      yellowing: "Excellent",
      idealUser: "Premium Matte",
    },
  },
  {
    code: "MATTE_ULTIMATE",
    group: "matte",
    name: "Matte Ultimate",
    role: "Flagship Matte",
    badge: "ด้านระดับสูงสุด",
    tagline: "Flagship Matte",
    benefit:
      "ฟิล์มด้านระดับสูงสุดสำหรับผิว matte / satin ที่ต้องการความเรียบเนียน ทนทาน และภาพลักษณ์ที่หรูขึ้น",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#1D1D1F 0%,#0E0E0F 100%)",
    fg: "#F2F3F4",
    pill: "pill-ultra",
    publicSpecs: {
      gloss: "Ultra Matte",
      selfHealing: "Excellent",
      yellowing: "Excellent+",
      idealUser: "Luxury Matte",
    },
  },

  // ---- Color PPF (5) ----
  {
    code: "COLOR_BEGIN",
    group: "color",
    name: "Color Begin",
    role: "Bold & Vibrant",
    badge: "สีเริ่มต้น",
    tagline: "Bold & Vibrant",
    benefit:
      "พื้นฐานที่คุ้มค่า เริ่มต้นเปลี่ยนลุคด้วย PPF สี พร้อมการปกป้องผิวรถในฟิล์มเดียว",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#D71920 0%,#7A1F22 100%)",
    fg: "#FFFFFF",
    publicSpecs: {
      gloss: "Glossy Color",
      selfHealing: "Good",
      yellowing: "Good",
      idealUser: "Color Daily",
    },
  },
  {
    code: "COLOR_PRIME",
    group: "color",
    name: "Color Prime",
    role: "Refined & Sophisticated",
    badge: "สีพรีเมียม",
    tagline: "Refined & Sophisticated",
    benefit:
      "สีพรีเมียมที่สมดุลที่สุดสำหรับการใช้งานทุกวัน ให้ลุคที่ดูเรียบหรูและมั่นใจ",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#3B5A82 0%,#1F3553 100%)",
    fg: "#F2F3F4",
    publicSpecs: {
      gloss: "Refined Color",
      selfHealing: "Very Good",
      yellowing: "Very Good",
      idealUser: "Refined Color",
    },
  },
  {
    code: "COLOR_PRO",
    group: "color",
    name: "Color Pro",
    role: "Distinct & Premium",
    badge: "สีโดดเด่น",
    tagline: "Distinct & Premium",
    benefit:
      "เฉดสีที่เด่นขึ้น เงาขึ้น และมีมิติมากขึ้น สำหรับรถที่ต้องการลุค performance",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#2E7D32 0%,#1B5E20 100%)",
    fg: "#F2F3F4",
    publicSpecs: {
      gloss: "Deep Gloss Color",
      selfHealing: "Excellent",
      yellowing: "Excellent",
      idealUser: "Performance Color",
    },
  },
  {
    code: "COLOR_ULTIMATE",
    group: "color",
    name: "Color Ultimate",
    role: "Exclusive & Luxurious",
    badge: "สีหรูสูงสุด",
    tagline: "Exclusive & Luxurious",
    benefit:
      "สีระดับสูงที่ให้ความลึก ความเงา และ finish ที่พรีเมียมกว่า",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#6A1B9A 0%,#4A148C 100%)",
    fg: "#F5E6B8",
    pill: "pill-ultra",
    publicSpecs: {
      gloss: "Ultra Deep Color",
      selfHealing: "Excellent+",
      yellowing: "Excellent+",
      idealUser: "Luxury Color",
    },
  },
  {
    code: "COLOR_ULTIMATE_CF",
    group: "color",
    name: "Color Ultimate Carbon Fiber",
    role: "Performance & Prestige",
    badge: "Carbon Fiber",
    tagline: "Performance & Prestige",
    benefit:
      "ฟิล์ม PPF texture carbon สำหรับลุค performance ที่พิเศษและมีความเป็นเอกลักษณ์สูง",
    warranty: "Warranty up to 10 years",
    bg: "linear-gradient(180deg,#1D1D1F 0%,#000000 100%)",
    fg: "#BFC3C7",
    pill: "pill-ultra",
    publicSpecs: {
      gloss: "Carbon Texture",
      selfHealing: "Excellent",
      yellowing: "Excellent+",
      idealUser: "Performance & Prestige",
    },
  },
];

export type Product = (typeof PRODUCTS)[number];
export type ProductGroup = 'clear' | 'matte' | 'color';

export const productsByGroup = (g: ProductGroup): Product[] => PRODUCTS.filter((p) => p.group === g);

// Public Comparison spec rows — Clear PPF comparison from Copy Lock
export const COMPARISON_ROWS_CLEAR = [
  { label: "Gloss Level", th: "ระดับความเงา", values: ["High Gloss", "High Gloss", "High Gloss+", "Ultra Gloss"] },
  { label: "Self-Healing", th: "ซ่อมรอยขนแมว", values: ["Good", "Very Good", "Excellent", "Excellent+"] },
  { label: "Yellowing Resistance", th: "การต้านเหลือง", values: ["Good", "Very Good", "Excellent", "Excellent+"] },
  { label: "Ideal User", th: "เหมาะสำหรับ", values: ["Daily Protection", "Daily & Weekend Use", "Performance Enthusiast", "Luxury & Perfectionist"] },
  { label: "Warranty", th: "รับประกัน", values: ["up to 10 years", "up to 10 years", "up to 10 years", "up to 10 years"] },
];

// Why Clear PPF — 5 benefit cards
export const WHY_CLEAR_PPF = [
  { title: "Invisible Protection", th: "การปกป้องที่แนบเนียน", copy: "ปกป้องผิวเดิม โดยคงความใสและเส้นสายของรถให้ดูเป็นธรรมชาติ" },
  { title: "Gloss Enhancement", th: "ยกระดับความเงา", copy: "ช่วยให้ผิวรถดูฉ่ำ ใส และมีมิติยิ่งขึ้นหลังติดตั้ง" },
  { title: "Stone-Chip Defense", th: "ป้องกันสะเก็ดหิน", copy: "ลดความเสี่ยงจากรอยสะเก็ดหินและรอยขีดข่วนจากการใช้งานจริง" },
  { title: "Easy Maintenance", th: "ดูแลง่ายขึ้น", copy: "ผิวฟิล์มช่วยให้ล้างรถง่ายขึ้น ลดการเกาะตัวของคราบสกปรก" },
  { title: "Long-Term Confidence", th: "มั่นใจในระยะยาว", copy: "ออกแบบเพื่อคงความใส ความเงา และคุณภาพของผิวรถในระยะยาว" },
];

// Technology layer stack — 4 layers
export const TECH_LAYERS = [
  { layer: 1, title: "Self-Healing Top Coat", th: "ขั้นซ่อมรอยขนแมว", copy: "ชั้นผิวด้านบนที่ช่วยลดรอยขนแมวขนาดเล็ก และช่วยให้ผิวฟิล์มดูเรียบเนียนยาวนานขึ้น" },
  { layer: 2, title: "High Performance TPU", th: "ขั้น TPU คุณภาพสูง", copy: "ชั้น TPU คุณภาพสูง ออกแบบเพื่อความยืดหยุ่น ความทนทาน และการปกป้องผิวรถ" },
  { layer: 3, title: "Advanced Adhesive", th: "กาวคุณภาพสูง", copy: "กาวคุณภาพสูงที่ช่วยให้ติดตั้งได้แนบเนียน ลดคราบ และรองรับการทำงานของช่างอย่างมืออาชีพ" },
  { layer: 4, title: "Release Liner", th: "แผ่นรองฟิล์ม", copy: "แผ่นรองฟิล์มคุณภาพสูง ช่วยปกป้องกาวก่อนติดตั้งและทำให้การทำงานสะอาดขึ้น" },
];

// Technology benefit cards
export const TECH_BENEFITS = [
  { title: "Advanced TPU", th: "ขั้น TPU คุณภาพสูง", copy: "ช่วยรองรับแรงกระแทก ลดรอยขีดข่วน และคงความทนทานของฟิล์มในระยะยาว" },
  { title: "Optical Clarity", th: "ความใสระดับพรีเมียม", copy: "ออกแบบให้ใสและแนบเนียน ลดความผิดเพี้ยนของผิวรถหลังติดตั้ง" },
  { title: "Self-Healing Topcoat", th: "ขั้นซ่อมรอยขนแมว", copy: "รอยขนแมวขนาดเล็กสามารถฟื้นตัวได้เมื่อได้รับความร้อนที่เหมาะสม" },
  { title: "Hydrophobic Surface", th: "ผิวไล่น้ำ", copy: "ช่วยให้น้ำและคราบสกปรกเกาะตัวน้อยลง ดูแลง่ายขึ้น" },
  { title: "Anti-Yellowing Stability", th: "เสถียรภาพต้านเหลือง", copy: "ช่วยรักษาความใสและความสม่ำเสมอของฟิล์มเมื่อใช้งานระยะยาว" },
  { title: "Installer-Friendly Adhesive", th: "กาวที่ออกแบบเพื่อการติดตั้ง", copy: "ช่วยให้การติดตั้งแม่นยำ ลดคราบกาว และรองรับงานติดตั้งระดับมืออาชีพ" },
];

// NEXS Standard cards (About page)
export const NEXS_STANDARD = [
  { title: "Premium Material Selection", copy: "คัดเลือกวัสดุเกรดพรีเมียม เพื่อประสิทธิภาพ ความใส และความทนทานในระยะยาว" },
  { title: "Complete Product Architecture", copy: "โครงสร้างสินค้าออกแบบให้ครอบคลุม Clear, Matte และ Color PPF เพื่อให้เลือกง่ายและแนะนำง่าย" },
  { title: "Real-World Usability", copy: "พัฒนาสำหรับการใช้งานจริง ทั้งแสงแดด ความร้อน ความชื้น การล้างรถ และการขับขี่ในชีวิตประจำวัน" },
  { title: "Support for Dealers and Installers", copy: "สนับสนุนร้านติดตั้งด้วยความรู้ เครื่องมือ สื่อการขาย และระบบหลังการขายที่ต่อเนื่อง" },
  { title: "Digital Warranty Verification", copy: "ระบบบัตรรับประกันดิจิทัล QR-based ที่ลูกค้าตรวจสอบได้ตลอด ผ่านเครือข่ายตัวแทนจำหน่ายที่ได้รับการแต่งตั้ง" },
];

// About — Brand Story 3 paragraphs
export const BRAND_STORY = [
  "NEXS พัฒนาขึ้นจากความเข้าใจในผิวรถยนต์ งานติดตั้งจริง และความคาดหวังของเจ้าของรถระดับพรีเมียม",
  "เราออกแบบฟิล์มให้เป็นมากกว่าการปกป้อง แต่เป็นระบบที่ช่วยยกระดับความใส ความเงา ความเรียบเนียน และความมั่นใจในการใช้งานจริง",
  "ทุกไลน์สินค้าถูกจัดวางอย่างชัดเจน เพื่อให้ลูกค้าเลือกได้ง่าย ร้านแนะนำได้มั่นใจ และรถทุกคันได้รับฟิล์มที่เหมาะสมกับระดับการใช้งานของตัวเอง",
];

// Dealer benefits — 6 cards
export const DEALER_BENEFITS = [
  { title: "Sales-ready Lineup", th: "ไลน์สินค้าขายง่าย", copy: "โครงสร้างสินค้าชัดเจน ช่วยให้ร้านแนะนำลูกค้าได้ง่ายตามงบประมาณและการใช้งาน" },
  { title: "Training & Certification", th: "อบรมและมาตรฐานติดตั้ง", copy: "สนับสนุนความรู้ด้านสินค้า เทคนิคการติดตั้ง และมาตรฐานการให้บริการ" },
  { title: "Marketing Support", th: "สื่อการตลาดพร้อมใช้", copy: "จัดเตรียมสื่อสินค้า ภาพ วิดีโอ และ materials สำหรับช่วยปิดการขาย" },
  { title: "After-sales Support", th: "การดูแลหลังการขาย", copy: "รองรับการสื่อสารกับลูกค้าและดูแลการติดตั้ง เพื่อสร้างความมั่นใจระยะยาว" },
  { title: "Attractive Profit Margin", th: "มาร์จิ้นที่น่าสนใจ", copy: "ออกแบบให้ร้านสามารถสร้างยอดขายและกำไรได้อย่างยั่งยืน" },
  { title: "Premium Brand Materials", th: "ภาพลักษณ์แบรนด์พรีเมียม", copy: "ช่วยยกระดับหน้าร้านและความน่าเชื่อถือเมื่อนำเสนอสินค้ากับลูกค้า" },
];

// FAQ — public
export const FAQ_PUBLIC = [
  {
    q: "NEXS PPF คืออะไร?",
    a: "NEXS PPF คือฟิล์มปกป้องผิวสีรถยนต์ระดับพรีเมียม ช่วยลดรอยขีดข่วน รอยสะเก็ดหิน และช่วยคงภาพลักษณ์ของรถให้ดูดีในระยะยาว",
  },
  {
    q: "ฟิล์มใส ฟิล์มด้าน และฟิล์มสี ต่างกันอย่างไร?",
    a: "ฟิล์มใสเน้นการปกป้องโดยคงสีเดิมของรถ ฟิล์มด้านเหมาะกับผิว matte หรือ satin ส่วนฟิล์มสีช่วยเปลี่ยนลุคของรถพร้อมการปกป้องในฟิล์มเดียว",
  },
  {
    q: "ติด PPF แล้วทำร้ายสีรถไหม?",
    a: "เมื่อใช้ฟิล์มคุณภาพและติดตั้งโดยผู้เชี่ยวชาญ ฟิล์มจะช่วยปกป้องสีรถและสามารถลอกออกได้อย่างเหมาะสมตามขั้นตอนของช่างมืออาชีพ",
  },
  {
    q: "Self-healing ทำงานอย่างไร?",
    a: "รอยขนแมวขนาดเล็กบนขั้นผิวฟิล์มสามารถฟื้นตัวได้เมื่อได้รับความร้อนที่เหมาะสม เช่น แสงแดด น้ำอุ่น หรือ heat gun จากช่างผู้เชี่ยวชาญ",
  },
  {
    q: "ต้องดูแลฟิล์มอย่างไร?",
    a: "ควรล้างรถด้วยวิธีที่เหมาะสม หลีกเลี่ยงสารเคมีรุนแรง และไม่ใช้เครื่องฉีดน้ำแรงดันสูงจ่อใกล้ขอบฟิล์มโดยตรง",
  },
  {
    q: "รับประกันกี่ปี?",
    a: "การรับประกันขึ้นอยู่กับรุ่นและเงื่อนไขการติดตั้ง กรุณาตรวจสอบรายละเอียดกับตัวแทนจำหน่ายหรือร้านติดตั้งที่ได้รับการแต่งตั้ง",
  },
  {
    q: "ติดตั้ง NEXS ได้ที่ไหน?",
    a: "สามารถติดตั้งได้ผ่านร้านติดตั้งหรือตัวแทนจำหน่ายที่ได้รับการสนับสนุนจาก NEXS เพื่อให้ได้งานติดตั้งที่เหมาะสมกับรถแต่ละคัน",
  },
  {
    q: "สมัครเป็นตัวแทนจำหน่ายได้อย่างไร?",
    a: "กรอกแบบฟอร์ม Become a Dealer พร้อมข้อมูล ทีมงานจะติดต่อกลับเพื่อแนะนำรายละเอียดสินค้า เงื่อนไข และระบบสนับสนุนสำหรับพาร์ทเนอร์",
  },
  {
    q: "Serial Number ของฉันอยู่ที่ไหน?",
    a: "Serial อยู่บนบัตรรับประกันที่ตัวแทนจำหน่ายมอบให้หลังติดตั้ง หรือบนบรรจุภัณฑ์ของสินค้าที่ใช้ในการติดตั้ง",
  },
  {
    q: "ตรวจสอบแล้วขึ้นว่า Not Registered หมายความว่าอย่างไร?",
    a: "แปลว่า NEXS รู้จัก Serial นี้ในระบบ แต่ตัวแทนจำหน่ายยังไม่ได้ลงทะเบียนการติดตั้งกับลูกค้า กรุณาติดต่อร้านที่ติดตั้งให้ดำเนินการ",
  },
];

// Navigation
export const NAV_LINKS = [
  { id: "clear-ppf", label: "Clear PPF" },
  { id: "matte-ppf", label: "Matte PPF" },
  { id: "color-ppf", label: "Color PPF" },
  { id: "technology", label: "Technology" },
  { id: "compare", label: "Compare" },
  { id: "for-dealers", label: "For Dealers" },
  { id: "about-nexs", label: "About NEXS" },
  { id: "warranty", label: "Warranty" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];
