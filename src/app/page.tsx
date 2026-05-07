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

function WhyPpfSection() {
  const section = SITE_COPY.visualSystem.whyPpf;

  return (
    <section className="curated-section why-ppf-section" id="why-ppf">
      <div className="section-head curated-head">
        <div>
          <p className="eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
        </div>
        <p>{section.description}</p>
      </div>
      <div className="curated-layout">
        <div className="paint-layer-stack" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="curated-card-grid">
          {section.cards.map((card, index) => (
            <article className="curated-card" key={card.title}>
              <span className="curated-number">0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStorySection() {
  const section = SITE_COPY.visualSystem.brandStory;

  return (
    <section className="curated-section brand-story-section" id="why-nexs">
      <div className="section-head curated-head">
        <div>
          <p className="eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
        </div>
        <p>{section.description}</p>
      </div>
      <div className="brand-story-grid">
        <div className="visual-orbit" aria-hidden="true">
          <span className="orbit-core">NEXS</span>
          <span />
          <span />
          <span />
        </div>
        <div className="curated-card-grid compact-curated-grid">
          {section.cards.map((card) => (
            <article className="curated-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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
  const productLine = getImageSlot('product_line_visual');
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
          <div className="hero-trust-bar" aria-label="NEXS trust points">
            <span>รับประกันสูงสุด 9 ปี</span>
            <span>Digital Warranty</span>
            <span>QR / Serial Verification</span>
            <span>Dealer Installation Support</span>
          </div>
        </div>
        <div className={`hero-visual hero-visual-lead ${hero.layoutClass}`}>{hero.path && <img src={hero.path} alt={hero.alt} />}</div>
      </section>

      <WhyPpfSection />

      <section className="section" id="products">
        <div className="section-head">
          <h2>Product Line</h2>
          <p>เลือก NEXS PPF จาก 4 รุ่นหลัก ตามระดับการปกป้อง อายุการรับประกัน และงบประมาณที่เหมาะกับคุณ</p>
        </div>
        <div className="product-line-visual-band legacy-surface-panel curated-visual-rhythm">
          <div className={`image-card ${productLine.layoutClass}`}>{productLine.path && <img src={productLine.path} alt={productLine.alt} />}</div>
          <div className="product-line-copy">
            <p className="eyebrow">Curated surface visual</p>
            <h3>ภาพพื้นผิวเพื่อช่วยเล่า Product Line โดยไม่ทำให้การ์ดสินค้าแน่นเกินไป</h3>
            <p>ภาพนี้ใช้เป็นบรรยากาศประกอบการเลือก Product Line โดยข้อมูลรุ่นสินค้าอ้างอิงจาก BEGIN, PRIME, PRO และ ULTIMATE เป็นหลัก</p>
          </div>
        </div>
        <ProductCards />
      </section>

      <BrandStorySection />

      <section className="section trust-proof-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Trust Proof</p>
            <h2>ความมั่นใจตั้งแต่ก่อนติดตั้งจนถึงหลังการขาย</h2>
          </div>
          <p>รวมหลักฐานความน่าเชื่อถือที่ลูกค้าควรเห็นก่อนตัดสินใจ โดยใช้เฉพาะข้อมูลรุ่น ระยะรับประกัน และขั้นตอนบริการที่ยืนยันแล้ว</p>
        </div>
        <div className="grid three">
          {SITE_COPY.trustProof.map((proof) => (
            <article className="card" key={proof.title}>
              <h3>{proof.title}</h3>
              <p>{proof.body}</p>
            </article>
          ))}
        </div>
        <div className="grid three faq-grid">
          <article className="card"><h3>FAQ</h3><p>ตอบคำถามสำคัญเรื่องการลงทะเบียน QR และบัตรรับประกันแบบเข้าใจง่าย</p></article>
          <article className="card"><h3>Warranty Coverage</h3><p>แสดงระยะรับประกันตามรุ่น BEGIN, PRIME, PRO และ ULTIMATE อย่างชัดเจน</p></article>
          <article className="card"><h3>ขั้นตอนตรวจสอบปัญหา</h3><p>ส่งคำขอตรวจสอบและประสานงานกับ Dealer/Admin โดยไม่ใช่การอนุมัติเคลมอัตโนมัติ</p></article>
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
          <div className={`image-card image-card-editorial ${dealer.layoutClass}`}>{dealer.path && <img src={dealer.path} alt={dealer.alt} />}</div>
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
          <div className={`image-card image-card-product-proof ${packaging.layoutClass}`}>{packaging.path && <img src={packaging.path} alt={packaging.alt} />}</div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="grid two align-start">
          <div className="card lead-info-card">
            <p className="eyebrow">ปรึกษา NEXS</p>
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
