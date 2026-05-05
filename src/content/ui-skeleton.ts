export type UiRoute = {
  readonly path: '/' | '/products' | '/warranty' | '/r/[serial]' | '/login';
  readonly title: string;
  readonly purpose: string;
};

export type NavItem = {
  readonly label: string;
  readonly href: UiRoute['path'];
};

export type DigitalWarrantyCardMock = {
  readonly status: 'active' | 'not_registered' | 'invalid';
  readonly title: string;
  readonly description: string;
  readonly serialCode?: string;
  readonly productName?: string;
  readonly warrantyYears?: number;
  readonly installDate?: string;
  readonly expiryDate?: string;
  readonly dealerName?: string;
  readonly vehicle?: string;
  readonly licensePlateMasked?: string;
  readonly customerPhoneMasked?: string;
};

export const UI_ROUTES: readonly UiRoute[] = [
  {
    path: '/',
    title: 'Home',
    purpose: 'Premium public entry page for NEXS PPF, product overview, warranty verification, and dealer workflow.',
  },
  {
    path: '/products',
    title: 'Products',
    purpose: 'Public product page for BEGIN, PRIME, PRO, and ULTIMATE.',
  },
  {
    path: '/warranty',
    title: 'Warranty Search',
    purpose: 'Manual serial entry and QR-based warranty verification entry point.',
  },
  {
    path: '/r/[serial]',
    title: 'Digital Warranty Card',
    purpose: 'Mobile-first QR landing page showing warranty status with PDPA-safe data.',
  },
  {
    path: '/login',
    title: 'Dealer/Admin Login',
    purpose: 'Login entry point for dealer and admin workflows.',
  },
] as const;

export const PUBLIC_NAV_ITEMS: readonly NavItem[] = [
  { label: 'หน้าแรก', href: '/' },
  { label: 'สินค้า', href: '/products' },
  { label: 'บัตรรับประกัน', href: '/warranty' },
  { label: 'เข้าสู่ระบบตัวแทนจำหน่าย', href: '/login' },
] as const;

export const DIGITAL_WARRANTY_CARD_MOCKS: readonly DigitalWarrantyCardMock[] = [
  {
    status: 'active',
    title: 'Warranty Active',
    description: 'บัตรรับประกันนี้ลงทะเบียนแล้วและอยู่ในสถานะใช้งาน',
    serialCode: 'PRO-1196MXY0401178Q',
    productName: 'NEXS PRO',
    warrantyYears: 8,
    installDate: '2026-05-01',
    expiryDate: '2034-05-01',
    dealerName: 'NEXS Authorized Dealer',
    vehicle: 'Porsche 911',
    licensePlateMasked: 'กท-xx-1234',
    customerPhoneMasked: '081-xxx-1234',
  },
  {
    status: 'not_registered',
    title: 'Serial Found / Not Registered',
    description: 'พบ serial ในระบบ แต่ยังไม่มีการลงทะเบียนบัตรรับประกัน',
    serialCode: 'B-1196MXY0401175Q',
    productName: 'NEXS BEGIN',
    warrantyYears: 5,
  },
  {
    status: 'invalid',
    title: 'Invalid or Not Found',
    description: 'ไม่พบ serial นี้ในระบบ กรุณาติดต่อ NEXS หรือตัวแทนจำหน่าย',
  },
] as const;

export function getUiRoute(path: string): UiRoute {
  const route = UI_ROUTES.find((item) => item.path === path);
  if (!route) {
    throw new Error(`Unknown UI route: ${path}`);
  }
  return route;
}
