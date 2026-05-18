import React from 'react';
import { Mark, Icon } from './shared.jsx';
import { BRAND, CTA } from '../data/brand.js';

// Top navigation — Spec sitemap:
// Clear PPF | Matte PPF | Color PPF | Technology | Compare | For Dealers | About NEXS | FAQ | Contact
export const Nav = ({ route, go }) => {
  const [open, setOpen] = React.useState(false);

  // Primary nav (visible on desktop)
  const primaryLinks = [
    { id: "clear-ppf", label: "Clear PPF" },
    { id: "matte-ppf", label: "Matte PPF" },
    { id: "color-ppf", label: "Color PPF" },
    { id: "technology", label: "Technology" },
    { id: "compare", label: "Compare" },
    { id: "for-dealers", label: "For Dealers" },
    { id: "about-nexs", label: "About NEXS" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  // Extra in mobile menu
  const extraLinks = [
    { id: "warranty", label: "Digital Warranty" },
  ];

  return (
    <header className="nav" data-screen-label="Top Nav">
      <div className="nav-inner">
        <a onClick={() => go("home")} style={{ cursor: "pointer", textDecoration: "none" }}>
          <Mark />
        </a>
        <nav className="nav-links thai">
          {primaryLinks.map((l) =>
            <a key={l.id} className={route === l.id ? "active" : ""} onClick={() => go(l.id)}>{l.label}</a>
          )}
        </nav>
        <div className="nav-cta">
          <button className="btn btn-ghost btn-sm" onClick={() => go("warranty")}>
            <Icon name="qr" size={14} />
            <span className="btn-text">Warranty</span>
          </button>
          <button className="btn btn-primary btn-sm thai" onClick={() => go("contact")}>{CTA.primary}</button>
          <button className="nav-mobile-toggle" onClick={() => setOpen(!open)} aria-label="menu">
            <Icon name={open ? "x" : "menu"} size={18} />
          </button>
        </div>
      </div>
      {open &&
        <div className="thai" style={{ borderTop: "1px solid var(--nexs-hairline)", padding: "12px 24px 18px", background: "var(--nexs-canvas)" }}>
          {primaryLinks.concat(extraLinks).map((l) =>
            <a key={l.id} onClick={() => { go(l.id); setOpen(false); }}
              style={{ display: "block", padding: "12px 0", color: route === l.id ? "var(--nexs-ink)" : "var(--nexs-ink-muted)", fontSize: 15, borderBottom: "1px solid var(--nexs-hairline)", cursor: "pointer" }}>
              {l.label}
            </a>
          )}
          <a onClick={() => { go("login"); setOpen(false); }} style={{ display: "block", padding: "14px 0 4px", color: "var(--nexs-ink-muted)", fontSize: 13, cursor: "pointer" }}>
            Dealer Login →
          </a>
        </div>
      }
    </header>);
};

// Footer
export const Footer = ({ go }) =>
  <footer className="footer thai" data-screen-label="Footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <Mark />
          <p style={{ maxWidth: 320, marginTop: 16, lineHeight: 1.6, color: "var(--nexs-ink-muted)", fontSize: 14 }}>
            NEXS พัฒนาเทคโนโลยีฟิล์มสำหรับผิวรถยนต์ระดับพรีเมียม เพื่อความใส ความเงา
            ความเรียบเนียน และการปกป้องที่มั่นใจได้ในทุกการใช้งาน
          </p>
          <p style={{ marginTop: 20, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--nexs-ink-soft)" }}>
            {BRAND.descriptor}
          </p>
        </div>
        <div>
          <h4>Products</h4>
          <ul>
            <li><a onClick={() => go("clear-ppf")}>Clear PPF</a></li>
            <li><a onClick={() => go("matte-ppf")}>Matte PPF</a></li>
            <li><a onClick={() => go("color-ppf")}>Color PPF</a></li>
            <li><a onClick={() => go("technology")}>Technology</a></li>
            <li><a onClick={() => go("compare")}>Compare</a></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li><a onClick={() => go("warranty")}>Digital Warranty</a></li>
            <li><a onClick={() => go("support-warranty")}>แจ้งบัตร / QR สูญหาย</a></li>
            <li><a onClick={() => go("support-inspection")}>นัดตรวจสอบฟิล์ม</a></li>
            <li><a onClick={() => go("faq")}>FAQ</a></li>
            <li><a onClick={() => go("contact")}>Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4>Dealer</h4>
          <ul>
            <li><a onClick={() => go("for-dealers")}>Become a Dealer</a></li>
            <li><a onClick={() => go("for-dealers")}>Dealer Resources</a></li>
            <li><a onClick={() => go("login")}>Dealer Login</a></li>
          </ul>
        </div>
        <div>
          <h4>About</h4>
          <ul>
            <li><a onClick={() => go("about-nexs")}>Our Story</a></li>
            <li><a onClick={() => go("technology")}>Technology</a></li>
            <li><a>Privacy Policy</a></li>
            <li><a>Terms &amp; Conditions</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 NEXS Paint Protection Film. All rights reserved.</div>
        <div style={{ display: "flex", gap: 18 }}>
          <span>@{BRAND.handle}</span>
          <span>·</span>
          <a>Privacy</a>
          <a>Terms</a>
        </div>
      </div>
    </div>
  </footer>;
