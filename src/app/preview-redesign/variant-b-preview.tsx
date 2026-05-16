import {
  VARIANT_B_DEALER_BENEFITS,
  VARIANT_B_HOME_SECTIONS,
  VARIANT_B_NAV_ITEMS,
  VARIANT_B_PAGES,
  VARIANT_B_PRODUCT_CARDS,
  VARIANT_B_WARRANTY_STEPS,
} from '@/content/variant-b-preview';

type VariantBPageKey = 'home' | 'products' | 'warranty' | 'dealer' | 'contact';

const pageByKey: Record<VariantBPageKey, (typeof VARIANT_B_PAGES)[number]> = {
  home: VARIANT_B_PAGES[1],
  products: VARIANT_B_PAGES[2],
  warranty: VARIANT_B_PAGES[3],
  dealer: VARIANT_B_PAGES[4],
  contact: VARIANT_B_PAGES[5],
};

export function BrandMark({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className={`variant-b-brand ${tone === 'light' ? 'on-dark' : ''}`}>
      <span className="variant-b-mark" aria-hidden>
        N
      </span>
      <span>NEXS</span>
    </span>
  );
}

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'active' | 'warn' | 'error' | 'ultra';
}) {
  return (
    <span className={`variant-b-pill tone-${tone}`}>
      <span className="variant-b-pill-dot" aria-hidden />
      {children}
    </span>
  );
}

export function QrGlyph({ size = 96 }: { size?: number }) {
  const cells = [
    '1110111', '1010001', '1011101', '1010001', '1110111',
    '0000000', '1011010', '1100101', '1010110', '1101001',
    '1110010', '1011101', '0010011', '1011010', '1110100',
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" shapeRendering="crispEdges" aria-hidden>
      <rect width="15" height="15" fill="white" />
      {cells.flatMap((row, y) =>
        row
          .split('')
          .map((c, x) => (c === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1D1D1F" /> : null)),
      )}
      {[
        [0, 0],
        [8, 0],
        [0, 8],
      ].map(([fx, fy], i) => (
        <g key={i}>
          <rect x={fx} y={fy} width="7" height="7" fill="white" />
          <rect x={fx} y={fy} width="7" height="7" fill="none" stroke="#1D1D1F" strokeWidth="1" />
          <rect x={fx + 2} y={fy + 2} width="3" height="3" fill="#1D1D1F" />
        </g>
      ))}
    </svg>
  );
}

function Header() {
  return (
    <header className="variant-b-header">
      <a className="variant-b-brand-link" href="/" aria-label="NEXS PPF Variant B home">
        <BrandMark />
      </a>
      <nav className="variant-b-nav" aria-label="Variant B preview navigation">
        {VARIANT_B_NAV_ITEMS.map((item) => {
          const cleanHref = item.href.replace(/^\/preview-redesign/, '') || '/';
          return <a href={cleanHref} key={item.href}>{item.label}</a>;
        })}
      </nav>
      <div className="variant-b-header-cta">
        <a className="variant-b-small-cta" href="/login">Dealer Login</a>
        <a className="variant-b-primary-cta" href="/contact">Book Consultation</a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="variant-b-footer">
      <div>
        <strong>NEXS Paint Protection Film</strong>
        <p>Variant B preview สำหรับตรวจ design เท่านั้น ยังไม่ใช่ production flow</p>
      </div>
      <div className="variant-b-footer-links">
        <a href="/warranty">บัตรรับประกัน</a>
        <a href="/dealer">ตัวแทนจำหน่าย</a>
        <a href="/contact">ติดต่อเรา</a>
      </div>
    </footer>
  );
}

function PreviewNotice() {
  return (
    <div className="variant-b-notice" role="note">
      Variant B · preview route แยกจาก production · mock data สำหรับดู design เท่านั้น
    </div>
  );
}

function HeroStage() {
  return (
    <div className="variant-b-hero-stage" aria-label="Premium vehicle hero placeholder">
      <span className="variant-b-hero-stage-label">EDITORIAL HERO IMAGE — premium vehicle, low key lighting</span>
      <span className="variant-b-hero-stage-tag bottom-left">NEXS PRO · INSTALLED</span>
      <span className="variant-b-hero-stage-tag bottom-right">001 / 04</span>
    </div>
  );
}

function ProductCards() {
  return (
    <div className="variant-b-product-grid">
      {VARIANT_B_PRODUCT_CARDS.map((product) => (
        <article className={`variant-b-product-card accent-${product.accent}`} key={product.name}>
          <div className="variant-b-product-cover">
            <Pill tone={product.name === 'ULTIMATE' ? 'ultra' : 'neutral'}>{product.badge}</Pill>
            <div className="variant-b-product-cover-text">
              <span className="variant-b-product-mark">NEXS</span>
              <span className="variant-b-product-name">{product.name}</span>
            </div>
          </div>
          <div className="variant-b-product-body">
            <div className="variant-b-product-topline">
              <span>Model {product.modelCode}</span>
              <span>รับประกัน {product.warrantyYears} ปี</span>
            </div>
            <h3>{product.headline}</h3>
            <p>{product.body}</p>
            <div className="variant-b-card-actions">
              <a href="/contact">Book Consultation</a>
              <a href="/products">ดูรายละเอียด</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function WarrantyCardMock() {
  return (
    <aside className="variant-b-warranty-phone" aria-label="Variant B Digital Warranty mockup">
      <div className="variant-b-phone-bar">
        <BrandMark tone="light" />
        <Pill tone="active">Active</Pill>
      </div>
      <div className="variant-b-warranty-headline">
        <div>
          <p className="variant-b-warranty-product">NEXS PRO</p>
          <p className="variant-b-warranty-years">รับประกัน 8 ปี</p>
        </div>
        <div className="variant-b-warranty-qr" aria-hidden>
          <QrGlyph size={72} />
        </div>
      </div>
      <dl>
        <div><dt>Serial</dt><dd>PRO-1196MXY0401178Q</dd></div>
        <div><dt>Vehicle</dt><dd>Sedan · Pearl White</dd></div>
        <div><dt>Dealer</dt><dd>NEXS Authorized · Bangkok</dd></div>
        <div><dt>Plate</dt><dd>1กก ··3456</dd></div>
        <div><dt>Install Date</dt><dd>12 มี.ค. 2026</dd></div>
        <div><dt>Expiry Date</dt><dd>12 มี.ค. 2034</dd></div>
      </dl>
      <div className="variant-b-warranty-foot">
        <span>ID · 178Q</span>
        <span>VERIFIED · NEXSPPF.COM</span>
      </div>
      <p>ตัวอย่างบัตรรับประกันดิจิทัล แสดงข้อมูลแบบ PDPA-safe</p>
    </aside>
  );
}

function PlaceholderVisual({ label, tone = 'dark' }: { label: string; tone?: 'dark' | 'light' }) {
  return (
    <div className={`variant-b-placeholder-visual ${tone}`} aria-label={label}>
      <span>{label}</span>
    </div>
  );
}

function StatStrip() {
  return (
    <div className="variant-b-stat-strip" aria-label="Variant B preview highlights">
      <div><span>รับประกันสูงสุด</span><strong>9 ปี</strong></div>
      <div><span>รุ่นหลัก</span><strong>4 รุ่น</strong></div>
      <div><span>ตรวจสอบได้</span><strong>QR · Serial</strong></div>
      <div><span>เครือข่าย</span><strong>Authorized Dealer</strong></div>
    </div>
  );
}

function WhyNexsSection() {
  const points = [
    ['ออกแบบให้เลือกรุ่นง่าย', 'สี่รุ่นชัดเจน ไม่ต้องอ่าน spec ยาว เลือกได้จากระดับการใช้งานและระยะรับประกัน'],
    ['ปกป้องโดยไม่ลดทอนความสวย', 'ดีไซน์การสื่อสารให้เน้นความสวยของรถและความมั่นใจหลังติดตั้ง'],
    ['ระบบดูแลหลังติดตั้ง', 'นัดตรวจสอบฟิล์มหลังติดตั้ง พร้อมประวัติการดูแลผ่านบัตรรับประกันดิจิทัล'],
    ['เครือข่ายตัวแทนจำหน่ายที่ตรวจสอบได้', 'ทุกใบรับประกันออกโดย dealer ที่ได้รับการแต่งตั้งจาก NEXS'],
  ] as const;

  return (
    <section className="variant-b-split-panel why-nexs">
      <div>
        <p className="variant-b-eyebrow">Why NEXS</p>
        <h2>เข้าใจผิวรถจากการใช้งานจริง</h2>
        <div className="variant-b-numbered-list">
          {points.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
      </div>
      <PlaceholderVisual label="Editorial · install detail / surface" />
    </section>
  );
}

function QrProofSection() {
  return (
    <section className="variant-b-split-panel proof">
      <div>
        <p className="variant-b-eyebrow">Proof of Authenticity</p>
        <h2>QR Code และ Serial Number ที่ตรวจสอบได้</h2>
        <p>
          QR Code และ Serial บนบรรจุภัณฑ์ NEXS ช่วยให้ลูกค้าตรวจสอบสถานะสินค้าและบัตรรับประกันได้อย่างชัดเจน เมื่อ Dealer ลงทะเบียนการติดตั้งแล้ว ลูกค้าจะสามารถสแกนเพื่อดูข้อมูลบัตรรับประกันดิจิทัลได้ทันที
        </p>
      </div>
      <div className="variant-b-proof-card">
        <div className="variant-b-proof-card-row">
          <div className="variant-b-proof-qr" aria-hidden>
            <QrGlyph size={120} />
          </div>
          <div className="variant-b-proof-card-info">
            <span>Serial Number</span>
            <strong>PRO-1196MXY0401178Q</strong>
            <div className="variant-b-proof-status">
              <Pill tone="active">Active · ลงทะเบียนแล้ว</Pill>
            </div>
            <dl>
              <div><dt>NEXS PRO</dt><dd>รับประกัน 8 ปี</dd></div>
              <div><dt>NEXS Authorized</dt><dd>Bangkok</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLeadSection() {
  return (
    <section className="variant-b-split-panel contact-page html-home-contact">
      <div>
        <p className="variant-b-eyebrow">Get in touch</p>
        <h2>Book Consultationและคำแนะนำเลือกรุ่น</h2>
        <p>กรอกข้อมูลสั้น ๆ ทีมงาน NEXS หรือตัวแทนจำหน่ายในพื้นที่จะติดต่อกลับ</p>
      </div>
      <form className="variant-b-lead-form">
        <label>ชื่อ–นามสกุล<input placeholder="ชื่อของคุณ" /></label>
        <label>เบอร์โทร<input placeholder="08x-xxx-xxxx" /></label>
        <label>LINE ID (ถ้ามี)<input placeholder="@nexs..." /></label>
        <label>จังหวัด<input placeholder="กรุงเทพฯ" /></label>
        <label>รุ่นรถ<input placeholder="ยี่ห้อ / รุ่น / ปี" /></label>
        <label>รุ่นที่สนใจ<select defaultValue="PRIME"><option>BEGIN</option><option>PRIME</option><option>PRO</option><option>ULTIMATE</option><option>ขอคำแนะนำเลือกรุ่น</option></select></label>
        <label className="wide">ข้อความเพิ่มเติม (ไม่บังคับ)<textarea placeholder="รายละเอียดเพิ่มเติม" /></label>
        <label className="variant-b-checkbox wide"><input type="checkbox" /> ยินยอมให้ NEXS เก็บและใช้ข้อมูลการติดต่อเพื่อจุดประสงค์การให้บริการตาม Privacy Policy</label>
        <button type="button">ส่งข้อมูลให้ทีมงานติดต่อกลับ</button>
      </form>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <section className="variant-b-hero html-latest-hero">
        <div className="variant-b-hero-copy">
          <Pill>NEXS · 2026 Collection</Pill>
          <h1>ปกป้องสีรถ<br />ให้สวยเหมือนวันแรก<span className="variant-b-hero-period">.</span></h1>
          <p>
            NEXS Paint Protection Film คือฟิล์มปกป้องสีรถระดับพรีเมียม พร้อมบัตรรับประกันดิจิทัลที่ตรวจสอบได้ผ่าน QR Code ทุกครั้งที่ต้องการ
          </p>
          <div className="variant-b-actions">
            <a className="variant-b-button primary" href="/products">ดูสินค้า</a>
            <a className="variant-b-button secondary" href="/contact">Book Consultation</a>
            <a className="variant-b-button text" href="/warranty">ตรวจสอบบัตรรับประกัน</a>
          </div>
        </div>
        <HeroStage />
      </section>
      <StatStrip />

      <section className="variant-b-section">
        <div className="variant-b-section-head">
          <p className="variant-b-eyebrow">Why PPF</p>
          <h2>ทุกการขับขี่ ทิ้งร่องรอยไว้บนสีรถเสมอ</h2>
        </div>
        <div className="variant-b-info-grid">
          {VARIANT_B_HOME_SECTIONS.map((section, index) => (
            <article className="variant-b-info-card" key={section.title}>
              <span>0{index + 1}</span>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="variant-b-section">
        <div className="variant-b-section-head split">
          <div>
            <p className="variant-b-eyebrow">The Line</p>
            <h2>สี่ระดับการดูแล เลือกได้ตามการใช้งาน</h2>
          </div>
          <a className="variant-b-button secondary" href="/products">เปรียบเทียบทุกรุ่น</a>
        </div>
        <ProductCards />
      </section>

      <WhyNexsSection />

      <section className="variant-b-split-panel">
        <div>
          <p className="variant-b-eyebrow">Digital Warranty</p>
          <h2>บัตรรับประกันที่ตรวจสอบได้ ทุกครั้งที่ต้องการ</h2>
          <ol>
            {VARIANT_B_WARRANTY_STEPS.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <div className="variant-b-actions">
            <a className="variant-b-button primary" href="/warranty">เปิดหน้าตรวจสอบ</a>
            <a className="variant-b-button secondary" href="/support/inspection">ขอตรวจสอบปัญหา</a>
          </div>
        </div>
        <WarrantyCardMock />
      </section>

      <section className="variant-b-split-panel dealer">
        <PlaceholderVisual label="Install detail · hands · film · vehicle" />
        <div>
          <p className="variant-b-eyebrow">For Dealers</p>
          <h2>ร่วมเป็นตัวแทนจำหน่าย NEXS PPF</h2>
          <ul>
            {VARIANT_B_DEALER_BENEFITS.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
          <div className="variant-b-actions">
            <a className="variant-b-button primary" href="/contact">สมัครตัวแทนจำหน่าย</a>
            <a className="variant-b-button secondary" href="/login">Dealer Login</a>
          </div>
        </div>
      </section>

      <QrProofSection />
      <ContactLeadSection />
    </>
  );
}

function ProductsPage() {
  return (
    <>
      <section className="variant-b-page-hero">
        <p className="variant-b-eyebrow">Product Line</p>
        <h1>เลือก NEXS PPF ให้เหมาะกับรถของคุณ</h1>
        <p>เปรียบเทียบ 4 รุ่นหลักด้วยข้อมูลสั้น ชัด และเน้นการตัดสินใจ</p>
      </section>
      <ProductCards />
      <section className="variant-b-section compact">
        <h2>เลือกอย่างไรให้เหมาะกับรถ</h2>
        <div className="variant-b-info-grid three">
          <article><h3>ใช้งานประจำวัน</h3><p>เริ่มจาก BEGIN หรือ PRIME ตามงบประมาณและพื้นที่ติดตั้งที่ต้องการ</p></article>
          <article><h3>รถพรีเมียมหรือใช้งานบ่อย</h3><p>เลือก PRO เพื่อระยะรับประกันและภาพลักษณ์ที่สูงขึ้น</p></article>
          <article><h3>ต้องการรุ่นสูงสุด</h3><p>เลือก ULTIMATE สำหรับตัวเลือกระดับเรือธงของ NEXS</p></article>
        </div>
      </section>
    </>
  );
}

function WarrantyPage() {
  return (
    <section className="variant-b-split-panel warranty">
      <div>
        <p className="variant-b-eyebrow">Warranty Preview</p>
        <h1>Digital Warranty คือส่วนหนึ่งของประสบการณ์หลังการติดตั้ง</h1>
        <p>
          ลูกค้ากรอก Serial Number หรือสแกน QR เพื่อดูสถานะบัตรรับประกัน หลังจาก Dealer/Admin ลงทะเบียนแล้วเท่านั้น
        </p>
        <form className="variant-b-search-form">
          <label htmlFor="variant-b-serial">Serial Number</label>
          <input id="variant-b-serial" placeholder="PRO-1196MXY0401178Q" />
          <button type="button">ดูตัวอย่าง</button>
        </form>
        <ol>
          {VARIANT_B_WARRANTY_STEPS.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </div>
      <WarrantyCardMock />
    </section>
  );
}

function DealerPage() {
  return (
    <section className="variant-b-split-panel dealer-page">
      <div>
        <p className="variant-b-eyebrow">Dealer Program</p>
        <h1>ร้านติดตั้งที่มีระบบหลังการขาย น่าเชื่อถือกว่า</h1>
        <p>Variant B ทำให้หน้า dealer เป็น public-first: อธิบาย value ให้ร้านเข้าใจก่อน แล้วค่อยพาเข้าสู่ login/workflow จริง</p>
        <ul>
          {VARIANT_B_DEALER_BENEFITS.map((benefit) => <li key={benefit}>{benefit}</li>)}
        </ul>
        <div className="variant-b-actions">
          <a className="variant-b-button primary" href="/contact">สมัครตัวแทนจำหน่าย</a>
          <a className="variant-b-button secondary" href="/login">Dealer Login</a>
        </div>
      </div>
      <div className="variant-b-console-mock">
        <span>Dealer Console Preview</span>
        <h3>Warranty Registration</h3>
        <p>Serial check · Register install · Customer warranty card · Maintenance note</p>
        <div><strong>24</strong><span>งานติดตั้งเดือนนี้</span></div>
        <div><strong>3</strong><span>คำขอตรวจสอบ</span></div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="variant-b-split-panel contact-page">
      <div>
        <p className="variant-b-eyebrow">Contact</p>
        <h1>Book Consultationและคำแนะนำเลือกรุ่น</h1>
        <p>กรอกข้อมูลสั้น ๆ ทีมงาน NEXS หรือตัวแทนจำหน่ายในพื้นที่จะติดต่อกลับ</p>
        <div className="variant-b-contact-proof">
          <span>ลูกค้าสนใจติดตั้ง</span>
          <span>ร้านค้าสนใจสมัครตัวแทนจำหน่าย</span>
          <span>สอบถามเรื่องบัตรรับประกัน</span>
        </div>
      </div>
      <form className="variant-b-lead-form">
        <label>ชื่อ<input placeholder="ชื่อผู้ติดต่อ" /></label>
        <label>เบอร์โทร<input placeholder="081-xxx-1234" /></label>
        <label>LINE ID<input placeholder="LINE ID ถ้ามี" /></label>
        <label>จังหวัด<input placeholder="จังหวัดที่ต้องการรับบริการ" /></label>
        <label>รุ่นรถ<input placeholder="เช่น Porsche 911 / Tesla" /></label>
        <label>รุ่นที่สนใจ<select defaultValue="PRIME"><option>BEGIN</option><option>PRIME</option><option>PRO</option><option>ULTIMATE</option></select></label>
        <label className="wide">ข้อความ<textarea placeholder="Book Consultation ขอคำแนะนำเลือกรุ่น หรือสมัครตัวแทนจำหน่าย" /></label>
        <label className="variant-b-checkbox wide"><input type="checkbox" /> ยินยอมให้ติดต่อกลับตาม Privacy Policy</label>
        <button type="button">ส่งข้อมูลให้ทีมงานติดต่อกลับ</button>
      </form>
    </section>
  );
}

export function VariantBPreviewPage({ page }: { page: VariantBPageKey }) {
  const meta = pageByKey[page];
  const content = {
    home: <HomePage />,
    products: <ProductsPage />,
    warranty: <WarrantyPage />,
    dealer: <DealerPage />,
    contact: <ContactPage />,
  }[page];

  return (
    <main className="variant-b-shell">
      <Header />
      <PreviewNotice />
      <div className="variant-b-meta" aria-label="Variant B page metadata">
        <span>{meta.eyebrow}</span>
        <span>{meta.title}</span>
      </div>
      {content}
      <Footer />
    </main>
  );
}
