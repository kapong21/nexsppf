import type { CSSProperties } from 'react';
import { getImageSlot } from '@/content/image-assets';
import { PUBLIC_PRODUCT_GROUPS, SITE_COPY } from '@/content/site-content';
import { DIGITAL_WARRANTY_CARD_MOCKS, PUBLIC_NAV_ITEMS } from '@/content/ui-skeleton';

const productAccents: Record<string, [string, string]> = {
  BEGIN: ['#d8dde3', '#f7f7f5'],
  PRIME: ['#5d7187', '#b8d6ef'],
  PRO: ['#17191d', '#d93a3a'],
  ULTIMATE: ['#08090c', '#d7b56d'],
};

function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="/">
        <img src="/nexs-logo.png" alt="NEXS" />
        <span>NEXS PPF</span>
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        {PUBLIC_NAV_ITEMS.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Footer() {
  return <footer className="footer">NEXS Paint Protection Film · Digital warranty card · Dealer workflow</footer>;
}

function ProductCards() {
  return (
    <div className="grid four">
      {PUBLIC_PRODUCT_GROUPS.map((product) => {
        const [accent1, accent2] = productAccents[product.name];
        return (
          <article
            className="card product-card"
            key={product.name}
            style={{ '--accent-1': accent1, '--accent-2': accent2 } as CSSProperties}
          >
            <p className="eyebrow">{product.positioning}</p>
            <h3>{product.headline}</h3>
            <div className="product-meta">
              <span>{product.warrantyYears} years</span>
              <span>{product.modelCode}</span>
            </div>
            <p>{product.thaiDescription}</p>
            <p>Color direction: {product.colorDirection.join(' / ')}</p>
          </article>
        );
      })}
    </div>
  );
}

function WarrantyMock() {
  const active = DIGITAL_WARRANTY_CARD_MOCKS[0];
  return (
    <div className="mock-phone">
      <div className="status-card">
        <span className={`status-pill ${active.status}`}>{active.status}</span>
        <h3>{active.title}</h3>
        <p>{active.description}</p>
        <p>Serial: {active.serialCode}</p>
        <p>Product: {active.productName}</p>
        <p>Vehicle: {active.vehicle}</p>
        <p>Phone: {active.customerPhoneMasked}</p>
        <p>Expiry: {active.expiryDate}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const hero = getImageSlot('hero_image');
  const dealer = getImageSlot('dealer_workflow_visual');
  const packaging = getImageSlot('packaging_visual');

  return (
    <main className="site-shell">
      <Header />
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{SITE_COPY.homeHero.eyebrow}</p>
          <h1>{SITE_COPY.homeHero.title}</h1>
          <p className="lead">{SITE_COPY.homeHero.subtitle}</p>
          <div className="actions">
            <a className="button primary" href="/warranty">
              {SITE_COPY.homeHero.primaryCta}
            </a>
            <a className="button secondary" href="/products">
              {SITE_COPY.homeHero.secondaryCta}
            </a>
          </div>
        </div>
        <div className="hero-visual">{hero.path && <img src={hero.path} alt={hero.alt} />}</div>
      </section>

      <section className="section" id="products">
        <div className="section-head">
          <h2>Products</h2>
          <p>สินค้า public 4 กลุ่มของ NEXS PPF พร้อม warranty years ตามที่อนุมัติ และเตรียม image slots สำหรับเปลี่ยนรูปจริงภายหลัง</p>
        </div>
        <ProductCards />
      </section>

      <section className="section">
        <div className="grid two">
          <div className="card">
            <p className="eyebrow">{SITE_COPY.warranty.title}</p>
            <h2>Digital Warranty Card</h2>
            <p>{SITE_COPY.warranty.description}</p>
            <p>Public view จะแสดงเฉพาะข้อมูลที่ปลอดภัย เช่น serial, product, status, install/expiry date และข้อมูลลูกค้าแบบ masked</p>
            <a className="button secondary" href="/warranty">
              เปิดหน้าตรวจสอบ
            </a>
          </div>
          <WarrantyMock />
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <div className="image-card">{dealer.path && <img src={dealer.path} alt={dealer.alt} />}</div>
          <div className="card">
            <p className="eyebrow">{SITE_COPY.dealerWorkflow.title}</p>
            <h2>Dealer Workflow</h2>
            <p>{SITE_COPY.dealerWorkflow.description}</p>
            <p>Dealer จะลงทะเบียน warranty, ดู record ของตัวเอง และจัดการ after-sales workflow ผ่านระบบที่มี session/role isolation</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <div className="card">
            <p className="eyebrow">{SITE_COPY.productProof.title}</p>
            <h2>QR & Serial Proof</h2>
            <p>{SITE_COPY.productProof.description}</p>
            <p>ระบบใช้ serial_code เป็น identity หลัก ไม่ใช้ full URL เป็น primary identity</p>
          </div>
          <div className="image-card">{packaging.path && <img src={packaging.path} alt={packaging.alt} />}</div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
