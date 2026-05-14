import Link from 'next/link';
import { BRAND_STRINGS } from '@/lib/design-tokens';
import { Navigation } from './Navigation';

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-mark" aria-label={`${BRAND_STRINGS.brandName} home`}>
        <span aria-hidden>N</span>
        <span>NEXS PPF</span>
      </Link>
      <Navigation />
    </header>
  );
}
