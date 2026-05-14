import Link from 'next/link';
import { PRIMARY_NAV_ITEMS } from '@/content/navigation';

export function Navigation() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      {PRIMARY_NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className={item.isSecondary ? 'nav-login' : undefined}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
