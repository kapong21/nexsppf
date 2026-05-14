export const BRAND_COLORS = {
  white: '#ffffff',
  silver: '#d8dde3',
  lightGray: '#f5f5f7',
  black: '#1d1d1f',
  muted: '#6e6e73',
  line: '#d2d2d7',
  red: '#d93a3a',
  panel: '#fbfbfd',
} as const;

export const BRAND_STRINGS = {
  tagline: 'ENGINEERED FOR PERFECT SURFACES',
  subTagline: 'Think New. Think NEXS.',
  heroHeadline: 'Engineered to Be Invisible. Better Than Day One.',
  heroThaiHeadline: 'ยิ่งมองไม่เห็นฟิล์ม ยิ่งเห็นความสมบูรณ์แบบ',
  heroQuote: 'A Higher Standard for Invisible Surfaces.',
  contactHandle: 'nexsppf',
  brandName: 'NEXS PPF',
  legalName: 'NEXS',
} as const;

export type BrandColor = keyof typeof BRAND_COLORS;
export type BrandString = keyof typeof BRAND_STRINGS;
