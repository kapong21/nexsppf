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
            <p>รองรับทั้งลูกค้าที่สนใจซื้อฟิล์ม ร้านติดตั้งที่สนใจเป็น dealer และผู้ที่ต้องการคำแนะนำเลือกรุ่น</p>
            <p>v1 ใช้ CTA เพื่อให้ทีม NEXS ติดต่อกลับ โดยยังไม่โชว์ public price จนกว่าจะได้รับอนุมัติ</p>
          </article>
          <div className="form-shell compact">
            <label htmlFor="contact-name">ชื่อ</label>
            <input id="contact-name" placeholder="ชื่อผู้ติดต่อ" />
            <label htmlFor="contact-phone">เบอร์โทร</label>
            <input id="contact-phone" placeholder="เช่น 081-xxx-1234" />
            <label htmlFor="contact-province">จังหวัด</label>
            <input id="contact-province" placeholder="จังหวัด" />
            <label htmlFor="contact-product">รุ่นที่สนใจ</label>
            <select id="contact-product">
              {PUBLIC_PRODUCT_GROUPS.map((product) => (
                <option key={product.name}>{product.name}</option>
              ))}
            </select>
            <label htmlFor="contact-type">ประเภทผู้ติดต่อ</label>
            <select id="contact-type">
              {SITE_COPY.leadForm.customerTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <label htmlFor="contact-message">ข้อความ</label>
            <textarea id="contact-message" placeholder="สอบถามราคา ขอคำแนะนำเลือกรุ่น หรือสมัครตัวแทนจำหน่าย" />
            <button className="button primary" type="button">
              ส่งข้อมูลให้ติดต่อกลับ
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
