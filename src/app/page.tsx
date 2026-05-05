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
        <a className="nav-login" href="/login">
          Dealer Login
        </a>
      </nav>
    </header>
  );
}

function Footer() {
  return <footer className="footer">NEXS Paint Protection Film · Product website · Digital warranty card · Dealer workflow</footer>;
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
            <p>{product.recommendedUseCase}</p>
            <div className="actions small-actions">
              <a className="button secondary" href="/products">
                ดูรายละเอียด
              </a>
              <a className="button secondary" href="/contact">
                {product.primaryCta}
              </a>
            </div>
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

function LeadForm() {
  return (
    <div className="form-shell compact">
      <label htmlFor="lead-name">ชื่อ</label>
      <input id="lead-name" placeholder="ชื่อผู้ติดต่อ" />
      <label htmlFor="lead-phone">เบอร์โทร</label>
      <input id="lead-phone" placeholder="เช่น 081-xxx-1234" />
      <label htmlFor="lead-line">LINE ID ถ้ามี</label>
      <input id="lead-line" placeholder="LINE ID สำหรับติดต่อกลับ" />
      <label htmlFor="lead-province">จังหวัด</label>
      <input id="lead-province" placeholder="จังหวัดที่ต้องการรับบริการ" />
      <label htmlFor="lead-car">รุ่นรถ ถ้ามี</label>
      <input id="lead-car" placeholder="เช่น Porsche 911 / Tesla Model 3" />
      <label htmlFor="lead-product">รุ่นที่สนใจ</label>
      <select id="lead-product">
        {PUBLIC_PRODUCT_GROUPS.map((product) => (
          <option key={product.name}>{product.name}</option>
        ))}
      </select>
      <label htmlFor="lead-type">ประเภทผู้ติดต่อ</label>
      <select id="lead-type">
        <option>customer</option>
        <option>dealer</option>
        <option>installer</option>
      </select>
      <label htmlFor="lead-message">ข้อความ</label>
      <textarea id="lead-message" placeholder="สอบถามราคา ขอคำแนะนำเลือกรุ่น หรือสมัครตัวแทนจำหน่าย" />
      <button className="button primary" type="button">
        ส่งข้อมูลให้ติดต่อกลับ
      </button>
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
          <h2 className="hero-thai-title">{SITE_COPY.homeHero.thaiTitle}</h2>
          <p className="lead">{SITE_COPY.homeHero.subtitle}</p>
          <div className="actions">
            <a className="button primary" href="/products">
              {SITE_COPY.homeHero.primaryCta}
            </a>
            <a className="button secondary" href="/contact">
              {SITE_COPY.homeHero.secondaryCta}
            </a>
            <a className="button text-link" href="/warranty">
              {SITE_COPY.homeHero.tertiaryCta}
            </a>
          </div>
        </div>
        <div className="hero-visual">{hero.path && <img src={hero.path} alt={hero.alt} />}</div>
      </section>

      <section className="section" id="products">
        <div className="section-head">
          <h2>Product Line</h2>
          <p>เลือก NEXS PPF จาก 4 กลุ่มสินค้า พร้อม warranty years, positioning และ CTA เพื่อสอบถามข้อมูลก่อนตัดสินใจ</p>
        </div>
        <ProductCards />
      </section>

      <section className="section" id="why-nexs">
        <div className="section-head">
          <h2>{SITE_COPY.whyNexs.title}</h2>
          <p>เหตุผลด้านระบบและการดูแลที่สื่อสารได้อย่างปลอดภัย โดยไม่ใช้คำกล่าวอ้างที่ยังไม่อนุมัติ</p>
        </div>
        <div className="grid five">
          {SITE_COPY.whyNexs.points.map((point) => (
            <article className="card" key={point}>
              <h3>{point}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <div className="card">
            <p className="eyebrow">{SITE_COPY.warranty.title}</p>
            <h2>Digital Warranty System</h2>
            <p>{SITE_COPY.warranty.description}</p>
            <p>หลังติดตั้ง ลูกค้าสแกน QR เพื่อดูสถานะบัตรรับประกัน ตรวจข้อมูลแบบ masked ดู maintenance summary และส่ง request inspection ได้</p>
            <div className="actions">
              <a className="button secondary" href="/warranty">
                เปิดหน้าตรวจสอบ
              </a>
              <a className="button secondary" href="/support/inspection">
                Request Inspection
              </a>
            </div>
          </div>
          <WarrantyMock />
        </div>
      </section>

      <section className="section" id="dealer">
        <div className="grid two">
          <div className="image-card">{dealer.path && <img src={dealer.path} alt={dealer.alt} />}</div>
          <div className="card">
            <p className="eyebrow">{SITE_COPY.dealerWorkflow.title}</p>
            <h2>{SITE_COPY.dealer.title}</h2>
            <p>{SITE_COPY.dealer.description}</p>
            <p>Dealer สามารถลงทะเบียน warranty, ดู record ของตัวเอง และจัดการ after-sales workflow ผ่านระบบที่มี session/role isolation</p>
            <div className="actions">
              <a className="button primary" href="/contact">
                {SITE_COPY.dealer.primaryCta}
              </a>
              <a className="button secondary" href="/login">
                {SITE_COPY.dealer.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <div className="card">
            <p className="eyebrow">{SITE_COPY.productProof.title}</p>
            <h2>ตรวจสอบสินค้าและบัตรรับประกันผ่าน QR Code</h2>
            <p>{SITE_COPY.productProof.description}</p>
            <p>ระบบใช้ serial_code เป็น identity หลัก ไม่ใช้ full URL เป็น primary identity</p>
          </div>
          <div className="image-card">{packaging.path && <img src={packaging.path} alt={packaging.alt} />}</div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="grid two">
          <div className="card">
            <p className="eyebrow">Lead Generation</p>
            <h2>{SITE_COPY.leadForm.title}</h2>
            <p>{SITE_COPY.leadForm.description}</p>
            <p>กรอกข้อมูลเบื้องต้น แล้วทีม NEXS หรือผู้เกี่ยวข้องจะใช้ข้อมูลนี้เพื่อติดต่อกลับเมื่อเชื่อมต่อระบบรับ lead จริง</p>
          </div>
          <LeadForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
