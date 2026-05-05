import { PUBLIC_PRODUCT_GROUPS, SITE_COPY } from '@/content/site-content';

export default function ContactPage() {
  return (
    <main className="site-shell">
      <section className="hero single-column-hero">
        <div className="hero-copy">
          <p className="eyebrow">Contact / Lead</p>
          <h1>{SITE_COPY.leadForm.title}</h1>
          <p className="lead">{SITE_COPY.leadForm.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <article className="card">
            <h2>ส่งข้อมูลให้ NEXS ติดต่อกลับ</h2>
            <p>รองรับทั้งลูกค้าที่สนใจติดตั้ง ร้านค้าที่ต้องการสมัครตัวแทนจำหน่าย และผู้ที่ต้องการสอบถามเรื่องบัตรรับประกัน</p>
            <p>ทีมงาน NEXS จะใช้ข้อมูลนี้เพื่อติดต่อกลับ ให้คำแนะนำ และประสานตัวแทนจำหน่ายที่เหมาะสม</p>
          </article>
          <div className="form-shell compact">
            <label htmlFor="contact-name">ชื่อ <span className="required-mark">*</span></label>
            <input id="contact-name" placeholder="ชื่อผู้ติดต่อ" />
            <label htmlFor="contact-phone">เบอร์โทร <span className="required-mark">*</span></label>
            <input id="contact-phone" placeholder="เช่น 081-xxx-1234" />
            <label htmlFor="contact-line">LINE ID ถ้ามี</label>
            <input id="contact-line" placeholder="LINE ID สำหรับติดต่อกลับ" />
            <label htmlFor="contact-province">จังหวัด <span className="required-mark">*</span></label>
            <input id="contact-province" placeholder="จังหวัด" />
            <label htmlFor="contact-car">รุ่นรถ ถ้ามี</label>
            <input id="contact-car" placeholder="เช่น Porsche 911 / Tesla" />
            <label htmlFor="contact-product">รุ่นที่สนใจ</label>
            <select id="contact-product">
              {PUBLIC_PRODUCT_GROUPS.map((product) => (
                <option key={product.name}>{product.name}</option>
              ))}
            </select>
            <label htmlFor="contact-type">ประเภทผู้ติดต่อ <span className="required-mark">*</span></label>
            <select id="contact-type">
              {SITE_COPY.leadForm.customerTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <label htmlFor="contact-message">ข้อความ</label>
            <textarea id="contact-message" placeholder="สอบถามราคา ขอคำแนะนำเลือกรุ่น หรือสมัครตัวแทนจำหน่าย" />
            <label className="checkbox-row" htmlFor="contact-pdpa">
              <input id="contact-pdpa" type="checkbox" />
              <span>{SITE_COPY.leadForm.pdpaConsentLabel} <a href={SITE_COPY.leadForm.privacyPolicyHref}>Privacy Policy</a></span>
            </label>
            <p className="form-note">ช่องจำเป็น: ชื่อ, เบอร์โทร, จังหวัด, ประเภทผู้ติดต่อ และการยินยอมให้ติดต่อกลับ</p>
            <p className="form-note">เมื่อเปิดใช้งานฟอร์มจริง ระบบจะตรวจรูปแบบเบอร์โทร แสดงข้อความสำเร็จ แจ้งข้อผิดพลาด และช่วยลดสแปมก่อนส่งข้อมูล</p>
            <button className="button primary" type="button">
              {SITE_COPY.leadForm.submitCta}
            </button>
            <p className="form-success" hidden>{SITE_COPY.leadForm.successMessage}</p>
            <p className="form-error" hidden>{SITE_COPY.leadForm.errorMessage}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
