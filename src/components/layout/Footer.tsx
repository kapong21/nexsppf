import Link from 'next/link';
import { FOOTER_NAV_ITEMS } from '@/content/navigation';
import { BRAND_STRINGS } from '@/lib/design-tokens';

export function Footer() {
  return (
    <footer className="site-footer">
      <nav className="site-footer-nav" aria-label="Footer navigation">
        {FOOTER_NAV_ITEMS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="site-footer-copy">
        &copy; {new Date().getFullYear()} {BRAND_STRINGS.legalName}. All rights reserved.
      </p>
    </footer>
  );
}
