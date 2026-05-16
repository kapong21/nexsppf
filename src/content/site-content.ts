import type { ImageSlotKey } from './image-assets';

export type PublicProductGroup = {
  readonly name: 'BEGIN' | 'PRIME' | 'PRO' | 'ULTIMATE';
  readonly modelCode: 'B' | 'P' | 'PRO' | 'U';
  readonly warrantyYears: 5 | 6 | 8 | 9;
  readonly badge: string;
  readonly warrantyLabel: string;
  readonly benefits: readonly string[];
  readonly colorDirection: readonly string[];
  readonly imageSlot: ImageSlotKey;
  readonly headline: string;
  readonly thaiDescription: string;
  readonly recommendedUseCase: string;
  readonly suitableFor: string;
  readonly keyDifference: string;
  readonly protectionLevel: string;
  readonly packageSuggestion: string;
  readonly decisionLabel: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
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
    readonly description: string;
    readonly points: readonly string[];
  };
  readonly visualSystem: {
    readonly whyPpf: {
      readonly title: string;
      readonly eyebrow: string;
      readonly description: string;
      readonly cards: readonly {
        readonly title: string;
        readonly body: string;
      }[];
    };
    readonly brandStory: {
      readonly title: string;
      readonly eyebrow: string;
      readonly description: string;
      readonly cards: readonly {
        readonly title: string;
        readonly body: string;
      }[];
    };
  };
  readonly dealer: {
    readonly title: string;
    readonly description: string;
    readonly benefits: readonly string[];
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
  readonly quickContact: readonly {
    readonly label: 'LINE OA' | 'โทร' | 'Facebook' | 'เวลาทำการ';
    readonly value: string;
    readonly status: string;
  }[];
  readonly trustProof: readonly {
    readonly title: string;
    readonly body: string;
  }[];
  readonly claimProcess: readonly {
    readonly title: string;
    readonly body: string;
  }[];
  readonly faq: readonly {
    readonly question: string;
    readonly answer: string;
  }[];
  readonly leadForm: {
    readonly title: string;
    readonly description: string;
    readonly fields: readonly string[];
    readonly requiredFields: readonly ['name', 'phone', 'province', 'customerType', 'pdpaConsent'];
    readonly customerTypes: readonly ['ลูกค้าสนใจติดตั้ง', 'ร้านค้าสนใจสมัครตัวแทนจำหน่าย', 'สอบถามเรื่องบัตรรับประกัน', 'อื่น ๆ'];
    readonly pdpaConsentLabel: string;
    readonly privacyPolicyHref: string;
    readonly submitCta: string;
    readonly successMessage: string;
    readonly errorMessage: string;
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
  'uv & stain resistant',
  'crystal clear finish',
  'hydrophobicity',
  'yellowing resistance',
  'gloss >90',
  'gloss >94',
  '10-year warranty',
  'nexsfilm.com',
  'germany tpu',
  'usa tpu',
  'china tpu',
  'origin flag',
  'ซ่อมแซมตัวเอง',
  'ป้องกันรังสี uv สูงสุด',
  'ไม่เหลืองง่าย',
  'ไล่น้ำดี',
  'Shine and Shield',
  'shine and shield',
  'Shine & Shield',
] as const;

export const PUBLIC_PRODUCT_GROUPS: readonly PublicProductGroup[] = [
  {
    name: 'BEGIN',
    modelCode: 'B',
    warrantyYears: 5,
    badge: 'เริ่มต้น',
    warrantyLabel: 'รับประกัน 5 ปี',
    benefits: ['สำหรับลูกค้าที่เริ่มต้นดูแลสีรถ', 'คุ้มค่า ใช้งานประจำวัน'],
    colorDirection: ['silver', 'light grey'],
    imageSlot: 'begin_product_visual',
    headline: 'NEXS BEGIN',
    thaiDescription: 'ฟิล์มปกป้องสีรถสำหรับการใช้งานประจำวัน คุ้มค่า เข้าถึงง่าย',
    recommendedUseCase: 'เหมาะกับลูกค้าที่ต้องการเริ่มต้นดูแลสีรถในชีวิตประจำวัน',
    suitableFor: 'เหมาะสำหรับรถใช้งานประจำวันและลูกค้าที่เริ่มต้นติดตั้ง PPF',
    keyDifference: 'จุดเด่น: คุ้มค่า เข้าใจง่าย และเริ่มต้นดูแลสีรถได้เป็นระบบ',
    protectionLevel: 'ระดับการปกป้อง: Essential daily protection',
    packageSuggestion: 'แพ็กเกจที่เหมาะ: จุดเสี่ยงด้านหน้า หรือเริ่มต้นบางชิ้นตามการใช้งาน',
    decisionLabel: 'Entry Smart Choice',
    primaryCta: 'Book Consultation',
    secondaryCta: 'ดูรายละเอียด',
  },
  {
    name: 'PRIME',
    modelCode: 'P',
    warrantyYears: 6,
    badge: 'รุ่นแนะนำ',
    warrantyLabel: 'รับประกัน 6 ปี',
    benefits: ['รุ่นหลักของ NEXS', 'สมดุลระหว่างการปกป้องและความคุ้มค่า'],
    colorDirection: ['graphite', 'blue silver'],
    imageSlot: 'prime_product_visual',
    headline: 'NEXS PRIME',
    thaiDescription: 'รุ่นหลักของ NEXS สำหรับลูกค้าที่ต้องการความสมดุลระหว่างความใส การปกป้อง และความคุ้มค่า',
    recommendedUseCase: 'เหมาะกับลูกค้าที่ต้องการตัวเลือกหลักสำหรับรถใช้งานและรถพรีเมียม',
    suitableFor: 'เหมาะสำหรับรถใช้งานประจำวัน รถใหม่ และเจ้าของรถที่ต้องการสมดุล',
    keyDifference: 'จุดเด่น: รุ่นหลักที่บาลานซ์ความคุ้มค่า ระยะรับประกัน และภาพลักษณ์พรีเมียม',
    protectionLevel: 'ระดับการปกป้อง: Balanced premium protection',
    packageSuggestion: 'แพ็กเกจที่เหมาะ: Full front หรือรอบคันตามงบประมาณและรูปแบบใช้งาน',
    decisionLabel: 'Best Value Core',
    primaryCta: 'Book Consultation',
    secondaryCta: 'ดูรายละเอียด',
  },
  {
    name: 'PRO',
    modelCode: 'PRO',
    warrantyYears: 8,
    badge: 'พรีเมียม',
    warrantyLabel: 'รับประกัน 8 ปี',
    benefits: ['สำหรับลูกค้าที่ต้องการระดับพรีเมียม', 'เหมาะกับรถที่ต้องการการดูแลสูงขึ้น'],
    colorDirection: ['carbon black', 'red accent'],
    imageSlot: 'pro_product_visual',
    headline: 'NEXS PRO',
    thaiDescription: 'ฟิล์มปกป้องสีรถระดับพรีเมียม สำหรับลูกค้าที่ต้องการการปกป้องที่สูงขึ้น',
    recommendedUseCase: 'เหมาะกับลูกค้าที่ต้องการรุ่นพรีเมียมและการดูแลหลังการขายที่ชัดเจน',
    suitableFor: 'เหมาะสำหรับรถพรีเมียม รถที่ใช้งานบ่อย และลูกค้าที่ต้องการความมั่นใจสูงขึ้น',
    keyDifference: 'จุดเด่น: รุ่นพรีเมียมหลักของ NEXS พร้อมระยะรับประกัน 8 ปี',
    protectionLevel: 'ระดับการปกป้อง: Premium protection',
    packageSuggestion: 'แพ็กเกจที่เหมาะ: Full front, รอบคัน หรือจุดเสี่ยงสูงสำหรับรถพรีเมียม',
    decisionLabel: 'Premium Pick',
    primaryCta: 'Book Consultation',
    secondaryCta: 'ดูรายละเอียด',
  },
  {
    name: 'ULTIMATE',
    modelCode: 'U',
    warrantyYears: 9,
    badge: 'รุ่นสูงสุด',
    warrantyLabel: 'รับประกัน 9 ปี',
    benefits: ['รุ่นสูงสุดของ NEXS', 'สำหรับลูกค้าที่ต้องการตัวเลือกระดับเรือธง'],
    colorDirection: ['deep black', 'gold', 'platinum'],
    imageSlot: 'ultimate_product_visual',
    headline: 'NEXS ULTIMATE',
    thaiDescription: 'ฟิล์มปกป้องสีรถรุ่นสูงสุดของ NEXS สำหรับลูกค้าที่ต้องการตัวเลือกระดับเรือธง',
    recommendedUseCase: 'เหมาะกับลูกค้าที่ต้องการรุ่นสูงสุดของ NEXS พร้อมระยะรับประกันยาวที่สุด',
    suitableFor: 'เหมาะสำหรับลูกค้าที่ต้องการตัวเลือกระดับเรือธงและระยะรับประกันสูงสุดของไลน์สินค้า',
    keyDifference: 'จุดเด่น: รุ่นสูงสุดของ NEXS พร้อมการรับประกันสูงสุด 9 ปี',
    protectionLevel: 'ระดับการปกป้อง: Flagship protection',
    packageSuggestion: 'แพ็กเกจที่เหมาะ: รอบคัน หรือชุดดูแลเต็มระบบสำหรับรถที่ต้องการภาพลักษณ์สูงสุด',
    decisionLabel: 'Flagship Choice',
    primaryCta: 'Book Consultation',
    secondaryCta: 'ดูรายละเอียด',
  },
] as const;

export const SITE_COPY: SiteCopy = {
  homeHero: {
    eyebrow: 'NEXS Paint Protection Film',
    title: 'NEXS Paint Protection Film',
    thaiTitle: 'ฟิล์มปกป้องสีรถ NEXS',
    subtitle: 'NEXS PPF พร้อม Digital Warranty และบัตรรับประกันดิจิทัล ตรวจสอบได้ผ่าน QR Code พร้อม Serial Verification และ Dealer Installation Support',
    primaryCta: 'ดูสินค้า',
    secondaryCta: 'Book Consultation',
    tertiaryCta: 'ตรวจสอบบัตรรับประกัน',
  },
  warranty: {
    title: 'ระบบบัตรรับประกันดิจิทัล',
    description: 'กรอกหมายเลข Serial Number เพื่อตรวจสอบสถานะบัตรรับประกันดิจิทัล รุ่นสินค้า และข้อมูลการลงทะเบียนที่ Dealer/Admin บันทึกไว้',
  },
  dealerWorkflow: {
    title: 'สำหรับร้านติดตั้งมืออาชีพ',
    description: 'ตัวแทนจำหน่ายสามารถลงทะเบียนงานติดตั้ง ออกบัตรรับประกันดิจิทัล และจัดการข้อมูลลูกค้าได้ในระบบเดียว',
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
    description: 'มั่นใจได้ด้วยระบบลงทะเบียนสินค้า ตรวจสอบสถานะรับประกัน และติดตามประวัติการดูแลหลังติดตั้ง',
    points: [
      'เลือกรุ่นง่ายตามการใช้งาน',
      'ตรวจสอบรับประกันผ่าน QR Code',
      'บัตรรับประกันดิจิทัล',
      'ลงทะเบียนโดย Dealer',
      'มีประวัติการดูแลหลังติดตั้ง',
    ],
  },
  visualSystem: {
    whyPpf: {
      eyebrow: 'Paint Protection, Explained Simply',
      title: 'Why PPF',
      description: 'ทำความเข้าใจ PPF แบบสั้น ชัด และไม่รก ก่อนเลือกรุ่นที่เหมาะกับรถของคุณ',
      cards: [
        {
          title: 'รอยเล็ก ๆ เกิดขึ้นได้ทุกวัน',
          body: 'การใช้งานจริงมีฝุ่น เศษหิน และการสัมผัสที่อาจทำให้ผิวสีรถเกิดรอยได้',
        },
        {
          title: 'ความสวยของรถค่อย ๆ ลดลง',
          body: 'สีรถที่เงาและเรียบคือสิ่งที่เจ้าของรถอยากรักษาไว้ตั้งแต่วันแรก',
        },
        {
          title: 'PPF เป็นชั้นปกป้องผิวสีรถ',
          body: 'ฟิล์มใสช่วยเพิ่มชั้นปกป้องระหว่างผิวสีรถกับการใช้งานประจำวัน',
        },
        {
          title: 'ปกป้องตั้งแต่แรกเพื่อความมั่นใจ',
          body: 'เริ่มดูแลเร็วช่วยให้รถดูดีต่อเนื่อง และเลือกแผนรับประกันได้ชัดเจน',
        },
      ],
    },
    brandStory: {
      eyebrow: 'Curated by NEXS',
      title: 'Why NEXS',
      description: 'NEXS จัดวางสินค้า บริการ และระบบรับประกันให้ลูกค้าเข้าใจง่ายตั้งแต่ก่อนติดตั้งจนถึงหลังการขาย',
      cards: [
        {
          title: 'เข้าใจผิวรถจากการใช้งานจริง',
          body: 'เล่าเรื่องจากปัญหาที่เจ้าของรถเจอจริง ไม่ยัดข้อมูลเทคนิคเกินจำเป็น',
        },
        {
          title: 'ออกแบบให้เลือกรุ่นง่าย',
          body: 'แบ่งรุ่น BEGIN, PRIME, PRO และ ULTIMATE ตามระดับการดูแลและระยะรับประกัน',
        },
        {
          title: 'ปกป้องโดยไม่ลดทอนความสวย',
          body: 'ทิศทางภาพเน้นรถ พื้นผิว และรายละเอียดแบบพรีเมียม อ่านง่ายบนมือถือ',
        },
        {
          title: 'มีระบบดูแลหลังติดตั้ง',
          body: 'เชื่อม Serial, QR Code และบัตรรับประกันดิจิทัลเพื่อช่วยให้ตรวจสอบได้',
        },
      ],
    },
  },
  dealer: {
    title: 'สำหรับตัวแทนจำหน่ายและร้านติดตั้ง',
    description: 'ตัวแทนจำหน่ายสามารถลงทะเบียนงานติดตั้ง ออกบัตรรับประกันดิจิทัล และจัดการข้อมูลลูกค้าได้ในระบบเดียว ช่วยเพิ่มความน่าเชื่อถือและยกระดับบริการหลังการขาย',
    benefits: [
      'ลงทะเบียนบัตรรับประกันให้ลูกค้า',
      'ตรวจสอบ Serial / QR Code',
      'ดูประวัติงานติดตั้งของร้าน',
      'บันทึกการดูแลหลังการติดตั้ง',
      'เพิ่มความน่าเชื่อถือให้ร้านติดตั้ง',
    ],
    primaryCta: 'ขอข้อมูล Dealer Program',
    secondaryCta: 'Dealer Login',
  },
  quickContact: [
    { label: 'LINE OA', value: 'กำลังอัปเดตช่องทางอย่างเป็นทางการ', status: 'pending official contact' },
    { label: 'โทร', value: 'กำลังอัปเดตช่องทางอย่างเป็นทางการ', status: 'pending official contact' },
    { label: 'Facebook', value: 'กำลังอัปเดตช่องทางอย่างเป็นทางการ', status: 'pending official contact' },
    { label: 'เวลาทำการ', value: 'กำลังอัปเดตช่องทางอย่างเป็นทางการ', status: 'pending official contact' },
  ],
  trustProof: [
    { title: 'Authorized Dealer', body: 'งานติดตั้งและการลงทะเบียนควรดำเนินการผ่านร้านที่ได้รับสิทธิ์ เพื่อให้ข้อมูลสินค้าและบัตรรับประกันตรงกัน' },
    { title: 'Digital Warranty', body: 'Serial Number และ QR Code ช่วยให้ลูกค้าตรวจสอบสถานะได้หลัง Dealer/Admin ลงทะเบียน' },
    { title: 'Warranty Coverage', body: 'แสดงระยะรับประกันตามรุ่นสินค้าอย่างชัดเจน โดยไม่เปิดเผยข้อมูลลูกค้าเกินจำเป็น' },
  ],
  claimProcess: [
    { title: 'ส่งคำขอตรวจสอบ', body: 'ลูกค้าหรือ Dealer ส่งรายละเอียดปัญหาและข้อมูล Serial เพื่อให้ทีมที่เกี่ยวข้องตรวจสอบ' },
    { title: 'ตรวจสอบจากข้อมูลติดตั้ง', body: 'ระบบช่วยอ้างอิงรุ่นสินค้า Dealer วันที่ติดตั้ง และสถานะบัตรรับประกันแบบปลอดภัย' },
    { title: 'สรุปแนวทางดูแล', body: 'ผลตรวจสอบเป็นการประเมินและประสานงาน ไม่ใช่การอนุมัติเคลมอัตโนมัติ' },
  ],
  faq: [
    { question: 'ลูกค้าลงทะเบียนบัตรรับประกันเองได้ไหม?', answer: 'ไม่ได้ การเปิดใช้งานบัตรรับประกันต้องดำเนินการโดย Dealer/Admin ที่รับผิดชอบงานติดตั้ง' },
    { question: 'สแกน QR ก่อนลงทะเบียนจะเกิดอะไรขึ้น?', answer: 'ระบบควรแสดงสถานะยังไม่ลงทะเบียนอย่างปลอดภัย ไม่ถือเป็น error และไม่เปิดเผยข้อมูลส่วนตัว' },
    { question: 'ต้องติดต่อทีมงานอย่างไร?', answer: 'ลูกค้าสามารถส่งข้อมูลเพื่อให้ทีมงานหรือ Dealer ติดต่อกลับพร้อมคำแนะนำที่เหมาะกับรถและรุ่นฟิล์ม' },
  ],
  leadForm: {
    title: 'ติดต่อ NEXS',
    description: 'ส่งข้อมูลเพื่อให้ทีมงาน NEXS ติดต่อกลับ พร้อมคำแนะนำเลือกรุ่นหรือข้อมูลสำหรับสมัครตัวแทนจำหน่าย',
    fields: ['name', 'phone', 'lineId', 'province', 'carModel', 'interestedProduct', 'customerType', 'message', 'pdpaConsent'],
    requiredFields: ['name', 'phone', 'province', 'customerType', 'pdpaConsent'],
    customerTypes: ['ลูกค้าสนใจติดตั้ง', 'ร้านค้าสนใจสมัครตัวแทนจำหน่าย', 'สอบถามเรื่องบัตรรับประกัน', 'อื่น ๆ'],
    pdpaConsentLabel: 'ยินยอมให้ทีมงาน NEXS ติดต่อกลับตามข้อมูลที่ให้ไว้',
    privacyPolicyHref: '/privacy',
    submitCta: 'ส่งข้อมูลให้ทีมงานติดต่อกลับ',
    successMessage: 'ส่งข้อมูลสำเร็จ ทีมงาน NEXS จะติดต่อกลับตามข้อมูลที่ให้ไว้',
    errorMessage: 'กรุณากรอกชื่อ เบอร์โทร จังหวัด ประเภทผู้ติดต่อ และยืนยันการยินยอมให้ติดต่อกลับ',
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
