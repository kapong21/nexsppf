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

function Header() {
  return (
    <header className="variant-b-header">
      <a className="variant-b-brand" href="/preview-redesign" aria-label="NEXS PPF Variant B home">
        <img src="/nexs-logo.png" alt="NEXS" />
        <span>NEXS PPF</span>
      </a>
      <nav className="variant-b-nav" aria-label="Variant B preview navigation">
        {VARIANT_B_NAV_ITEMS.map((item) => (
          <a href={item.href} key={item.href}>{item.label}</a>
        ))}
      </nav>
      <a className="variant-b-small-cta" href="/login">Dealer Login</a>
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
        <a href="/preview-redesign/warranty">บัตรรับประกัน</a>
        <a href="/preview-redesign/dealer">ตัวแทนจำหน่าย</a>
        <a href="/preview-redesign/contact">ติดต่อเรา</a>
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

function ProductCards() {
  return (
    <div className="variant-b-product-grid">
      {VARIANT_B_PRODUCT_CARDS.map((product) => (
        <article className={`variant-b-product-card accent-${product.accent}`} key={product.name}>
          <div className="variant-b-product-topline">
            <span>{product.badge}</span>
            <span>Model {product.modelCode}</span>
          </div>
          <h3>NEXS {product.name}</h3>
          <p className="variant-b-product-years">รับประกัน {product.warrantyYears} ปี</p>
          <p>{product.headline}</p>
          <p>{product.body}</p>
          <div className="variant-b-card-actions">
            <a href="/preview-redesign/contact">สอบถามราคา</a>
            <a href="/preview-redesign/products">ดูรายละเอียด</a>
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
        <img src="/nexs-logo.png" alt="NEXS" />
        <span>Digital Warranty</span>
      </div>
      <div className="variant-b-status-row">
        <span>Active</span>
        <span>QR</span>
      </div>
      <h3>NEXS PRO</h3>
      <dl>
        <div><dt>Serial</dt><dd>PRO-1196MXY0401178Q</dd></div>
        <div><dt>Vehicle</dt><dd>Sedan · Pearl White</dd></div>
        <div><dt>Dealer</dt><dd>NEXS Authorized · Bangkok</dd></div>
        <div><dt>Phone</dt><dd>081-xxx-1234</dd></div>
        <div><dt>Plate</dt><dd>1กก ··3456</dd></div>
      </dl>
      <p>ข้อมูลตัวอย่างถูก mask เพื่อแสดงแนวทาง PDPA-safe</p>
    </aside>
  );
}

function HomePage() {
  return (
    <>
      <section className="variant-b-hero">
        <div className="variant-b-hero-copy">
          <p className="variant-b-eyebrow">NEXS · Variant B</p>
          <h1>ปกป้องสีรถ ให้สวยเหมือนวันแรก</h1>
          <p>
            NEXS Paint Protection Film พร้อมระบบบัตรรับประกันดิจิทัลที่ตรวจสอบได้ผ่าน QR Code
            ดีไซน์ใหม่นี้เน้นภาพลักษณ์ premium, clean และอ่านง่ายขึ้นทั้ง desktop/mobile
          </p>
          <div className="variant-b-actions">
            <a className="variant-b-button primary" href="/preview-redesign/products">ดูสินค้า</a>
            <a className="variant-b-button secondary" href="/preview-redesign/contact">สอบถามราคา</a>
            <a className="variant-b-button text" href="/preview-redesign/warranty">ตรวจสอบบัตรรับประกัน</a>
          </div>
        </div>
        <div className="variant-b-hero-visual">
          <img src="/images/hero-porsche.jpg" alt="NEXS PPF premium vehicle mood" />
          <div className="variant-b-hero-card">
            <span>รับประกันสูงสุด 9 ปี</span>
            <strong>QR · Serial · Digital Warranty</strong>
          </div>
        </div>
      </section>

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
          <a className="variant-b-button secondary" href="/preview-redesign/products">เปรียบเทียบทุกรุ่น</a>
        </div>
        <ProductCards />
      </section>

      <section className="variant-b-split-panel">
        <div>
          <p className="variant-b-eyebrow">Digital Warranty</p>
          <h2>บัตรรับประกันที่ตรวจสอบได้ ทุกครั้งที่ต้องการ</h2>
          <ol>
            {VARIANT_B_WARRANTY_STEPS.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <div className="variant-b-actions">
            <a className="variant-b-button primary" href="/preview-redesign/warranty">เปิดหน้าตรวจสอบ</a>
            <a className="variant-b-button secondary" href="/support/inspection">ขอตรวจสอบปัญหา</a>
          </div>
        </div>
        <WarrantyCardMock />
      </section>

      <section className="variant-b-split-panel dealer">
        <img src="/images/installer-hood.jpg" alt="NEXS installer workflow" />
        <div>
          <p className="variant-b-eyebrow">For Dealers</p>
          <h2>ร่วมเป็นตัวแทนจำหน่าย NEXS PPF</h2>
          <ul>
            {VARIANT_B_DEALER_BENEFITS.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
          <div className="variant-b-actions">
            <a className="variant-b-button primary" href="/preview-redesign/contact">สมัครตัวแทนจำหน่าย</a>
            <a className="variant-b-button secondary" href="/login">Dealer Login</a>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductsPage() {
  return (
    <>
      <section className="variant-b-page-hero">
        <p className="variant-b-eyebrow">Product Line</p>
        <h1>เลือก NEXS PPF ให้เหมาะกับรถของคุณ</h1>
        <p>เปรียบเทียบ 4 รุ่นหลักด้วยข้อมูลสั้น ชัด และเน้นการตัดสินใจ โดยไม่แสดงราคา public</p>
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
          <a className="variant-b-button primary" href="/preview-redesign/contact">สมัครตัวแทนจำหน่าย</a>
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
        <h1>สอบถามราคาและคำแนะนำเลือกรุ่น</h1>
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
        <label className="wide">ข้อความ<textarea placeholder="สอบถามราคา ขอคำแนะนำเลือกรุ่น หรือสมัครตัวแทนจำหน่าย" /></label>
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
