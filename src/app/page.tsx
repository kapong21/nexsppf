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
  return (
    <footer className="footer rich-footer">
      <div>
        <strong>NEXS Paint Protection Film</strong>
        <p>© 2026 NEXS. All rights reserved.</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="/contact">ติดต่อเรา</a>
        <a href="/warranty">บัตรรับประกัน</a>
        <a href="/dealer">สำหรับตัวแทนจำหน่าย</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/warranty-policy">Warranty Policy</a>
        <a href="/login">Dealer Login</a>
      </nav>
    </footer>
  );
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
            <p className="product-badge">{product.badge}</p>
            <h3>{product.headline}</h3>
            <div className="product-meta">
              <span className="warranty-label">{product.warrantyLabel}</span>
              <span>{product.modelCode}</span>
            </div>
            <ul className="benefit-list compact-list">
              {product.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <div className="actions small-actions">
              <a className="button primary" href="/contact">
                {product.primaryCta}
              </a>
              <a className="button secondary" href="/products">
                {product.secondaryCta}
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
    <div className="mock-phone branded-warranty-card">
      <div className="warranty-card-topline">
        <img src="/nexs-logo.png" alt="NEXS" />
        <span>ตัวอย่างข้อมูล</span>
      </div>
      <div className="status-card warranty-card-body" style={{ '--accent-1': productAccents.PRO[0], '--accent-2': productAccents.PRO[1] } as CSSProperties}>
        <div className="warranty-brand-row">
          <div>
            <p className="eyebrow">NEXS Digital Warranty</p>
            <h3>{active.title}</h3>
          </div>
          <div className="qr-placeholder" aria-label="QR placeholder">QR</div>
        </div>
        <span className={`status-pill ${active.status}`}>สถานะ: Active</span>
        <p>{active.description}</p>
        <dl className="warranty-detail-list">
          <div><dt>รุ่นสินค้า</dt><dd>{active.productName}</dd></div>
          <div><dt>หมายเลข Serial</dt><dd>{active.serialCode}</dd></div>
          <div><dt>รถ</dt><dd>{active.vehicle}</dd></div>
          <div><dt>ตัวแทนจำหน่าย</dt><dd>{active.dealerName}</dd></div>
          <div><dt>วันที่ติดตั้ง</dt><dd>{active.installDate}</dd></div>
          <div><dt>วันหมดอายุ</dt><dd>{active.expiryDate}</dd></div>
        </dl>
      </div>
    </div>
  );
}

const warrantySteps = [
  'ติดตั้งกับตัวแทนจำหน่าย',
  'Dealer ลงทะเบียน Serial และข้อมูลรถ',
  'ลูกค้าสแกน QR Code',
  'ดู Digital Warranty Card และประวัติการดูแลได้',
] as const;

function LeadForm() {
  return (
    <div className="form-shell compact">
      <label htmlFor="lead-name">ชื่อ <span className="required-mark">*</span></label>
      <input id="lead-name" placeholder="ชื่อผู้ติดต่อ" />
      <label htmlFor="lead-phone">เบอร์โทร <span className="required-mark">*</span></label>
      <input id="lead-phone" placeholder="เช่น 081-xxx-1234" />
      <label htmlFor="lead-line">LINE ID ถ้ามี</label>
      <input id="lead-line" placeholder="LINE ID สำหรับติดต่อกลับ" />
      <label htmlFor="lead-province">จังหวัด <span className="required-mark">*</span></label>
      <input id="lead-province" placeholder="จังหวัดที่ต้องการรับบริการ" />
      <label htmlFor="lead-car">รุ่นรถ ถ้ามี</label>
      <input id="lead-car" placeholder="เช่น Porsche 911 / Tesla" />
      <label htmlFor="lead-product">รุ่นที่สนใจ</label>
      <select id="lead-product">
        {PUBLIC_PRODUCT_GROUPS.map((product) => (
          <option key={product.name}>{product.name}</option>
        ))}
      </select>
      <label htmlFor="lead-type">ประเภทผู้ติดต่อ <span className="required-mark">*</span></label>
      <select id="lead-type">
        {SITE_COPY.leadForm.customerTypes.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
      <label htmlFor="lead-message">ข้อความ</label>
      <textarea id="lead-message" placeholder="สอบถามราคา ขอคำแนะนำเลือกรุ่น หรือสมัครตัวแทนจำหน่าย" />
      <label className="checkbox-row" htmlFor="lead-pdpa">
        <input id="lead-pdpa" type="checkbox" />
        <span>{SITE_COPY.leadForm.pdpaConsentLabel} <a href={SITE_COPY.leadForm.privacyPolicyHref}>Privacy Policy</a></span>
      </label>
      <p className="form-note">ช่องจำเป็น: ชื่อ, เบอร์โทร, จังหวัด, ประเภทผู้ติดต่อ และการยินยอมให้ติดต่อกลับ</p>
      <p className="form-note">เมื่อเปิดใช้งานฟอร์มจริง ระบบจะตรวจรูปแบบเบอร์โทร แสดงข้อความสำเร็จ และช่วยลดสแปมก่อนส่งข้อมูล</p>
      <button className="button primary" type="button">
        {SITE_COPY.leadForm.submitCta}
      </button>
      <p className="form-success" hidden>{SITE_COPY.leadForm.successMessage}</p>
      <p className="form-error" hidden>{SITE_COPY.leadForm.errorMessage}</p>
    </div>
  );
}

export default function HomePage() {
  const hero = getImageSlot('hero_brand_visual');
  const dealer = getImageSlot('dealer_installation_visual');
  const packaging = getImageSlot('packaging_product_proof_visual');

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
        <div className="hero-visual hero-visual-lead">{hero.path && <img src={hero.path} alt={hero.alt} />}</div>
      </section>

      <section className="section" id="products">
        <div className="section-head">
          <h2>Product Line</h2>
          <p>เลือก NEXS PPF จาก 4 รุ่นหลัก ตามระดับการปกป้อง อายุการรับประกัน และงบประมาณที่เหมาะกับคุณ</p>
        </div>
        <ProductCards />
      </section>

      <section className="section" id="why-nexs">
        <div className="section-head">
          <h2>{SITE_COPY.whyNexs.title}</h2>
          <p>{SITE_COPY.whyNexs.description}</p>
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
            <p>หลังติดตั้ง ลูกค้าจะได้รับบัตรรับประกันดิจิทัลที่เชื่อมกับ Serial Number ของสินค้า สามารถสแกน QR Code เพื่อตรวจสอบรุ่นสินค้า สถานะรับประกัน วันที่ติดตั้ง และข้อมูลตัวแทนจำหน่ายได้ทุกเวลา</p>
            <p>หากพบปัญหา สามารถส่งคำขอให้ Dealer หรือทีม NEXS ตรวจสอบได้ โดยไม่ถือเป็นการอนุมัติเคลมอัตโนมัติ</p>
            <div className="flow-steps">
              {warrantySteps.map((step, index) => (
                <span key={step}>{index + 1}. {step}</span>
              ))}
            </div>
            <div className="actions">
              <a className="button secondary" href="/warranty">
                เปิดหน้าตรวจสอบ
              </a>
              <a className="button secondary" href="/support/inspection">
                ขอให้ตรวจสอบปัญหา
              </a>
            </div>
          </div>
          <WarrantyMock />
        </div>
      </section>

      <section className="section" id="dealer">
        <div className="grid two">
          <div className="image-card image-card-editorial dealer-crop">{dealer.path && <img src={dealer.path} alt={dealer.alt} />}</div>
          <div className="card">
            <p className="eyebrow">{SITE_COPY.dealerWorkflow.title}</p>
            <h2 className="dealer-heading">
              <span>สำหรับตัวแทนจำหน่าย</span>
              <span>และร้านติดตั้ง</span>
            </h2>
            <p>{SITE_COPY.dealer.description}</p>
            <ul className="benefit-list">
              {SITE_COPY.dealer.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
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
            <p>QR Code และ Serial Number ช่วยให้ลูกค้าตรวจสอบสถานะสินค้าและบัตรรับประกันได้อย่างชัดเจน เมื่อ Dealer ลงทะเบียนการติดตั้งแล้ว ลูกค้าจะสามารถสแกนเพื่อดูข้อมูลบัตรรับประกันดิจิทัลได้ทันที</p>
          </div>
          <div className="image-card image-card-product-proof packaging-crop">{packaging.path && <img src={packaging.path} alt={packaging.alt} />}</div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="grid two align-start">
          <div className="card lead-info-card">
            <p className="eyebrow">Lead Generation</p>
            <h2>{SITE_COPY.leadForm.title}</h2>
            <p>{SITE_COPY.leadForm.description}</p>
            <p>กรอกข้อมูลเบื้องต้น แล้วทีมงาน NEXS จะใช้ข้อมูลนี้เพื่อติดต่อกลับ ให้คำแนะนำ และประสานตัวแทนจำหน่ายที่เหมาะสม</p>
            <div className="lead-support-list">
              <span>ลูกค้าที่สนใจติดตั้ง</span>
              <span>ร้านที่ต้องการสมัครตัวแทนจำหน่าย</span>
              <span>คำถามเรื่องบัตรรับประกันหรือการดูแลหลังติดตั้ง</span>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
