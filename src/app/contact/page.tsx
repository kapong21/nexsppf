import { getImageSlot } from '@/content/image-assets';
import { SITE_COPY } from '@/content/site-content';

const PRODUCT_INTEREST_OPTIONS = [
  'Not sure / Need recommendation',
  'Clear PPF',
  'Matte PPF',
  'Color PPF',
  'Ultimate Carbon Fiber',
  'Dealer / Installer inquiry',
  'Digital Warranty inquiry',
] as const;

export default function ContactPage() {
  const visual = getImageSlot('contact_lead_visual');

  return (
    <>
      <section className="nexs-hero premium-hero contact-hero">
        <div className="nexs-hero-copy">
          <p className="eyebrow red-dot">Contact NEXS</p>
          <h1>Let NEXS guide the right film system.</h1>
          <h2>ติดต่อทีมงาน NEXS เพื่อเลือกระบบฟิล์มที่เหมาะกับรถของคุณ</h2>
          <p className="lead">ช่องทางหลักทั้งหมดใช้ handle เดียวกัน: nexsppf เพื่อให้ลูกค้า ร้านติดตั้ง และผู้สนใจ Digital Warranty ติดต่อได้ง่ายขึ้น</p>
          <div className="quick-contact-grid premium-contact-grid">
            {SITE_COPY.quickContact.map((item) => (
              <article className="quick-contact-card" key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="nexs-visual-stage dealer contact-visual-panel contact-card-visual" aria-label={visual.alt}>
          <div className="render-label">AI RENDER PLACEHOLDER</div>
          <div className="contact-device-card">
            <span>NEXS</span>
            <strong>nexsppf</strong>
            <small>LINE · Facebook · Instagram · TikTok · YouTube</small>
          </div>
        </div>
      </section>

      <section className="section section-tight premium-section contact-form-section">
        <div className="section-head centered-head">
          <div>
            <p className="eyebrow red-dot">Lead Form</p>
            <h2>Tell us what surface you want to protect.</h2>
          </div>
          <p>แบบฟอร์มนี้เป็น public-safe lead capture สำหรับติดต่อกลับและแนะนำรุ่น ไม่แสดงข้อมูลเชิงพาณิชย์ภายใน</p>
        </div>
        <div className="form-shell premium-form-shell">
          <label htmlFor="contact-name">Name <span className="required-mark">*</span></label>
          <input id="contact-name" placeholder="Your name" />

          <label htmlFor="contact-phone">Phone <span className="required-mark">*</span></label>
          <input id="contact-phone" placeholder="08x-xxx-xxxx" />

          <label htmlFor="contact-line">LINE ID</label>
          <input id="contact-line" placeholder="nexsppf or your LINE ID" />

          <label htmlFor="contact-province">Province <span className="required-mark">*</span></label>
          <input id="contact-province" placeholder="Province" />

          <label htmlFor="contact-car">Vehicle model</label>
          <input id="contact-car" placeholder="Porsche 911 / Tesla Model Y / etc." />

          <label htmlFor="contact-product">Product interest</label>
          <select id="contact-product">
            {PRODUCT_INTEREST_OPTIONS.map((option) => <option key={option}>{option}</option>)}
          </select>

          <label htmlFor="contact-type">Contact type <span className="required-mark">*</span></label>
          <select id="contact-type">
            {SITE_COPY.leadForm.customerTypes.map((type) => <option key={type}>{type}</option>)}
          </select>

          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" placeholder="Tell us about your vehicle, preferred finish, city, or dealer inquiry" />

          <label className="checkbox-row" htmlFor="contact-pdpa">
            <input id="contact-pdpa" type="checkbox" />
            <span>{SITE_COPY.leadForm.pdpaConsentLabel} <a href={SITE_COPY.leadForm.privacyPolicyHref}>Privacy Policy</a></span>
          </label>

          <p className="form-note">Required: name, phone, province, contact type, and contact consent.</p>
          <button className="button primary" type="button">{SITE_COPY.leadForm.submitCta}</button>
        </div>
      </section>
    </>
  );
}
