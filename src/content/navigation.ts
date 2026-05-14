export type NavItem = {
  label: string;
  href: string;
  isSecondary?: boolean;
};

export const PRIMARY_NAV_ITEMS: readonly NavItem[] = [
  { label: 'Products', href: '/products' },
  { label: 'Warranty', href: '/warranty' },
  { label: 'Dealer', href: '/dealer' },
  { label: 'Contact', href: '/contact' },
  { label: 'Dealer Login', href: '/login', isSecondary: true },
] as const;

export const FOOTER_NAV_ITEMS: readonly NavItem[] = [
  { label: 'ติดต่อเรา', href: '/contact' },
  { label: 'รับประกัน', href: '/warranty' },
  { label: 'ตัวแทนจำหน่าย', href: '/dealer' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Warranty Policy', href: '/warranty-policy' },
  { label: 'Dealer Login', href: '/login' },
] as const;
