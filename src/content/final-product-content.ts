export type FilmCategoryKey = 'clear' | 'matte' | 'color';

export type FilmOption = {
  name: string;
  category: FilmCategoryKey;
  position: string;
  thickness?: string;
  peelingSupport?: string;
  productWarranty?: string;
  lifetime?: string;
  note: string;
  badge: string;
};

export type FilmCategory = {
  key: FilmCategoryKey;
  label: string;
  thaiLabel: string;
  route: string;
  heroTitle: string;
  heroThai: string;
  heroSubcopy: string;
  ctas: readonly string[];
  options: readonly FilmOption[];
};

export const FILM_CATEGORIES: readonly FilmCategory[] = [
  {
    key: 'clear',
    label: 'Clear PPF',
    thaiLabel: 'ฟิล์มใสกันรอย',
    route: '/clear-ppf',
    heroTitle: 'Clear PPF Collection',
    heroThai: 'ฟิล์มใสกันรอย 4 รุ่น เลือกได้ตามงบประมาณ การใช้งาน และระดับความพรีเมียมที่คุณต้องการ',
    heroSubcopy: 'Engineered to Be Invisible. Better Than Day One. ยิ่งมองไม่เห็นฟิล์ม ยิ่งเห็นความสมบูรณ์แบบของผิวรถ',
    ctas: ['Compare All Models', 'Book Consultation'],
    options: [
      { name: 'Begin', category: 'clear', position: 'Entry / Daily Protection', thickness: '7.5 mil', peelingSupport: 'รับประกันลอก 3 ปี', productWarranty: 'Product warranty 4 ปี', lifetime: 'Lifetime 6 ปี', note: 'เหมาะกับรถใช้งานประจำวันและลูกค้าที่เริ่มต้นปกป้องสีรถ', badge: 'Entry' },
      { name: 'Prime', category: 'clear', position: 'Best Balance / Recommended', thickness: '7.5 mil', peelingSupport: 'รับประกันลอก 4 ปี', productWarranty: 'Product warranty 7 ปี', lifetime: 'Lifetime 8 ปี', note: 'รุ่นแนะนำสำหรับลูกค้าส่วนใหญ่ที่ต้องการสมดุลระหว่างความมั่นใจและความคุ้มค่า', badge: 'Recommended' },
      { name: 'Pro', category: 'clear', position: 'Premium Protection', thickness: '8.5 mil', peelingSupport: 'รับประกันลอก 5 ปี', productWarranty: 'Product warranty 8 ปี', lifetime: 'Lifetime 9 ปี', note: 'สำหรับลูกค้าที่ต้องการฟิล์มหนาขึ้นและระดับการปกป้องสูงขึ้น', badge: 'Premium' },
      { name: 'Ultimate', category: 'clear', position: 'Flagship / Top Tier', thickness: '8.5 mil', peelingSupport: 'รับประกันลอก 7 ปี', productWarranty: 'Product warranty 9 ปี', lifetime: 'Lifetime 10 ปี', note: 'รุ่นเรือธงสำหรับรถพรีเมียมและลูกค้าที่ต้องการตัวเลือกระดับสูงสุด', badge: 'Flagship' },
    ],
  },
  {
    key: 'matte',
    label: 'Matte PPF',
    thaiLabel: 'ฟิล์มด้านกันรอย',
    route: '/matte-ppf',
    heroTitle: 'Matte PPF Collection',
    heroThai: 'ฟิล์มด้านกันรอยสำหรับผิว matte / satin ที่ต้องการความเรียบเนียนและภาพลักษณ์ระดับพรีเมียม',
    heroSubcopy: 'คง texture ดั้งเดิมของผิวด้าน พร้อมเพิ่มการปกป้องและความมั่นใจในการใช้งานระยะยาว',
    ctas: ['Book Consultation', 'Find Installer'],
    options: [
      { name: 'Matte Prime', category: 'matte', position: 'Best Balance / Smooth Matte', thickness: '7.5 mil', peelingSupport: 'รับประกันลอก 4 ปี', productWarranty: 'Product warranty 7 ปี', lifetime: 'Lifetime 8 ปี', note: 'โครงสินค้าอ้างอิง Clear Prime จนกว่าจะล็อกข้อมูลฟิล์มด้านจริง', badge: 'Matte Core' },
      { name: 'Matte Pro', category: 'matte', position: 'Premium Matte Protection', thickness: '8.5 mil', peelingSupport: 'รับประกันลอก 5 ปี', productWarranty: 'Product warranty 8 ปี', lifetime: 'Lifetime 9 ปี', note: 'โครงสินค้าอ้างอิง Clear Pro จนกว่าจะล็อกข้อมูลฟิล์มด้านจริง', badge: 'Premium Matte' },
      { name: 'Matte Ultimate', category: 'matte', position: 'Flagship Matte / Top Tier', thickness: '8.5 mil', peelingSupport: 'รับประกันลอก 7 ปี', productWarranty: 'Product warranty 9 ปี', lifetime: 'Lifetime 10 ปี', note: 'โครงสินค้าอ้างอิง Clear Ultimate จนกว่าจะล็อกข้อมูลฟิล์มด้านจริง', badge: 'Flagship Matte' },
    ],
  },
  {
    key: 'color',
    label: 'Color PPF',
    thaiLabel: 'ฟิล์มสี PPF',
    route: '/color-ppf',
    heroTitle: 'Color PPF Collection',
    heroThai: 'ฟิล์มสี PPF 5 รุ่น สำหรับเปลี่ยนลุคและพื้นผิวที่แตกต่าง พร้อมการปกป้องในฟิล์มเดียว',
    heroSubcopy: 'เลือกได้ตั้งแต่สีเริ่มต้นที่คุ้มค่า ไปจนถึงสีพรีเมียมและลาย Carbon Fiber สำหรับลุค performance ที่โดดเด่น',
    ctas: ['Explore Colors', 'Book Consultation'],
    options: [
      { name: 'Color Begin', category: 'color', position: 'Entry Color PET', thickness: '7.5 mil', peelingSupport: 'รับประกันลอก 2 ปี', productWarranty: 'Warranty 2 ปี', lifetime: 'Lifetime ประมาณ 3 ปี', note: 'Color Begin เป็น PET Color Film สำหรับลูกค้าที่อยากเริ่มต้นเปลี่ยนสี', badge: 'Color Entry' },
      { name: 'Color Prime', category: 'color', position: 'Entry TPU Color', thickness: '7.5 mil', peelingSupport: 'รับประกันลอก 3 ปี', productWarranty: 'Warranty 4 ปี', lifetime: 'Lifetime ประมาณ 5 ปี', note: 'สี TPU รุ่นเริ่มต้นสำหรับลูกค้าที่ต้องการความยืดหยุ่นและภาพลักษณ์พรีเมียมขึ้น', badge: 'TPU Color' },
      { name: 'Color Pro', category: 'color', position: 'Main Color / Standard', thickness: '7.5 mil', peelingSupport: 'รับประกันลอก 4 ปี', productWarranty: 'Warranty 5 ปี', lifetime: 'Lifetime ประมาณ 6 ปี', note: 'ฟิล์มสีรุ่นหลักสำหรับขายจริงและใช้เป็นตัวเลือกมาตรฐานของไลน์สี', badge: 'Main Color' },
      { name: 'Color Ultimate', category: 'color', position: 'Premium Color / International', thickness: '8.5 mil', peelingSupport: 'รับประกันลอก 5 ปี', productWarranty: 'Warranty 6 ปี', lifetime: 'Lifetime ประมาณ 10 ปี', note: 'ตัวเลือกฟิล์มสีเกรดสูงขึ้นสำหรับรถที่ต้องการภาพลักษณ์โดดเด่น', badge: 'Premium Color' },
      { name: 'Ultimate Carbon Fiber', category: 'color', position: 'Special Finish', thickness: '8.5 mil / รอ final spec', peelingSupport: 'ตามเงื่อนไขรุ่นพิเศษ', productWarranty: 'ตามเงื่อนไขรุ่นพิเศษ', lifetime: 'ตามเงื่อนไขรุ่นพิเศษ', note: 'ลาย Carbon Fiber สำหรับลูกค้าที่ต้องการ finish พิเศษและภาพลักษณ์ performance', badge: 'Carbon Fiber' },
    ],
  },
] as const;

export const FAQ_ITEMS = [
  { question: 'ฟิล์มแต่ละรุ่นรับประกันกี่ปี?', answer: 'การรับประกันขึ้นอยู่กับรุ่นสินค้า โดยแยก Product Warranty, รับประกันลอก และ Lifetime ออกจากกันตามเงื่อนไขของแต่ละรุ่น' },
  { question: 'Lifetime ต่างจาก Warranty อย่างไร?', answer: 'Lifetime คือช่วงอายุการใช้งานโดยประมาณของฟิล์มภายใต้การดูแลที่เหมาะสม ไม่ใช่ระยะเวลารับประกันสินค้า' },
  { question: 'รับประกันลอกคืออะไร?', answer: 'รับประกันลอกคือการดูแลปัญหาการลอกตามเงื่อนไขการติดตั้ง แยกจาก Product Warranty และขึ้นอยู่กับรุ่นสินค้าและร้านติดตั้ง' },
  { question: 'Color Begin เป็น TPU หรือไม่?', answer: 'Color Begin เป็นรุ่น PET Color Film ส่วน Color Prime, Color Pro และ Color Ultimate เป็น TPU Color Film' },
  { question: 'Matte PPF มีข้อมูลจริงหรือยัง?', answer: 'โครง Matte PPF ยืนยันเป็น Matte Prime / Matte Pro / Matte Ultimate สำหรับหน้าเว็บ โดย spec ชั่วคราวอ้างอิง Clear Prime / Pro / Ultimate จนกว่าจะล็อกข้อมูลฟิล์มด้านจริง' },
  { question: 'ควรเลือกรุ่นไหน?', answer: 'กรุณาติดต่อทีมงานหรือ installer เพื่อรับคำแนะนำตามรุ่นรถ ลักษณะการใช้งาน และรูปแบบการติดตั้ง' },
] as const;

export function getFilmCategory(key: FilmCategoryKey): FilmCategory {
  const category = FILM_CATEGORIES.find((item) => item.key === key);
  if (!category) throw new Error(`Unknown film category: ${key}`);
  return category;
}
