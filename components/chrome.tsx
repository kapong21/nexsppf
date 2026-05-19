'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mark, Icon } from './shared';
import { BRAND, CTA } from '@/data/brand';
import { href } from '@/lib/routes';

const PRIMARY_LINKS = [
  { id: 'clear-ppf', label: 'Clear PPF' },
  { id: 'matte-ppf', label: 'Matte PPF' },
  { id: 'color-ppf', label: 'Color PPF' },
  { id: 'technology', label: 'Technology' },
  { id: 'compare', label: 'Compare' },
  { id: 'for-dealers', label: 'For Dealers' },
  { id: 'about-nexs', label: 'About NEXS' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const EXTRA_LINKS = [{ id: 'warranty', label: 'Digital Warranty' }];

const CHROMELESS_PATHS = ['/warranty/'];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  const isActive = (id: string) => pathname === href(id);

  return (
    <header className="nav" data-screen-label="Top Nav">
      <div className="nav-inner">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Mark />
        </Link>
        <nav className="nav-links thai">
          {PRIMARY_LINKS.map((l) => (
            <Link key={l.id} href={href(l.id)} className={isActive(l.id) ? 'active' : ''}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <Link href="/warranty" className="btn btn-ghost btn-sm">
            <Icon name="qr" size={14} />
            <span className="btn-text">Warranty</span>
          </Link>
          <Link href="/contact" className="btn btn-primary btn-sm thai">{CTA.primary}</Link>
          <button className="nav-mobile-toggle" onClick={() => setOpen(!open)} aria-label="menu">
            <Icon name={open ? 'x' : 'menu'} size={18} />
          </button>
        </div>
      </div>
      {open && (
        <div className="thai" style={{ borderTop: '1px solid var(--nexs-hairline)', padding: '12px 24px 18px', background: 'var(--nexs-canvas)' }}>
          {PRIMARY_LINKS.concat(EXTRA_LINKS).map((l) => (
            <Link
              key={l.id}
              href={href(l.id)}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                color: isActive(l.id) ? 'var(--nexs-ink)' : 'var(--nexs-ink-muted)',
                fontSize: 15,
                borderBottom: '1px solid var(--nexs-hairline)',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer thai" data-screen-label="Footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Mark />
            <p style={{ maxWidth: 320, marginTop: 16, lineHeight: 1.6, color: 'var(--nexs-ink-muted)', fontSize: 14 }}>
              NEXS พัฒนาเทคโนโลยีฟิล์มสำหรับผิวรถยนต์ระดับพรีเมียม เพื่อความใส ความเงา ความเรียบเนียน และการปกป้องที่มั่นใจได้ในทุกการใช้งาน
            </p>
            <p style={{ marginTop: 20, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--nexs-ink-soft)' }}>
              {BRAND.descriptor}
            </p>
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              <li><Link href="/clear-ppf">Clear PPF</Link></li>
              <li><Link href="/matte-ppf">Matte PPF</Link></li>
              <li><Link href="/color-ppf">Color PPF</Link></li>
              <li><Link href="/technology">Technology</Link></li>
              <li><Link href="/compare">Compare</Link></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><Link href="/warranty">Digital Warranty</Link></li>
              <li><Link href="/support/warranty">แจ้งบัตร / QR สูญหาย</Link></li>
              <li><Link href="/support/inspection">นัดตรวจสอบฟิล์ม</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Dealer</h4>
            <ul>
              <li><Link href="/for-dealers">Become a Dealer</Link></li>
              <li><Link href="/for-dealers">Dealer Resources</Link></li>
              <li><Link href="/contact">Dealer Login</Link></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/technology">Technology</Link></li>
              <li><a>Privacy Policy</a></li>
              <li><a>Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 NEXS Paint Protection Film. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 18 }}>
            <span>@{BRAND.handle}</span>
            <span>·</span>
            <a>Privacy</a>
            <a>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * ChromeShell — wraps page content with Nav + Footer.
 * Hides chrome on chromeless paths (e.g. warranty card detail view per DEPLOY.md PDPA flow).
 */
export function ChromeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  const isChromeless = CHROMELESS_PATHS.some((p) => pathname.startsWith(p) && pathname !== '/warranty');
  return (
    <div className="app">
      {!isChromeless && <Nav />}
      {children}
      {!isChromeless && <Footer />}
    </div>
  );
}
