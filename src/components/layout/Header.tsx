import Link from 'next/link';
import { BRAND_STRINGS } from '@/lib/design-tokens';
import { Navigation } from './Navigation';

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-mark brand-lockup" aria-label={`${BRAND_STRINGS.brandName} home`}>
        <span className="brand-symbol" aria-hidden>NEXS</span>
        <span className="brand-copy">
          <strong>NEXS PPF</strong>
          <small>{BRAND_STRINGS.tagline}</small>
        </span>
      </Link>
      <Navigation />
    </header>
  );
}
