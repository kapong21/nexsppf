import { SITE_COPY } from '@/content/site-content';

export default function DealerPage() {
  return (
    <main className="site-shell">
      <section className="hero single-column-hero">
        <div className="hero-copy">
          <p className="eyebrow">Dealer / Installer</p>
          <h1>ร่วมเป็นตัวแทนจำหน่าย NEXS PPF</h1>
          <p className="lead">
            หน้านี้รวม public dealer information และทางเข้าสู่ private dealer workflow สำหรับลงทะเบียน warranty และดูแลงานหลังการขาย
          </p>
          <div className="actions">
            <a className="button primary" href="/contact">
              {SITE_COPY.dealer.primaryCta}
            </a>
            <a className="button secondary" href="/login">
              {SITE_COPY.dealer.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Dealer workflow preview</h2>
          <p>แสดงภาพรวม public dealer information และทางเข้าสู่ private dealer workflow สำหรับลงทะเบียน warranty และดูแลงานหลังการขาย</p>
        </div>
        <div className="grid three">
          <article className="card">
            <h2>Register Warranty</h2>
            <p>ลงทะเบียน warranty จาก serial ที่ตรวจสอบแล้ว โดย backend จริงต้อง bind กับ session ของ dealer เท่านั้น</p>
          </article>
          <article className="card">
            <h2>Own Records</h2>
            <p>dealer เห็นเฉพาะ records ของตัวเอง และข้อมูลลูกค้าต้อง masked ตาม PDPA ในหน้าที่ไม่จำเป็นต้องเห็นข้อมูลเต็ม</p>
          </article>
          <article className="card">
            <h2>After-sales Follow-up</h2>
            <p>ติดตาม maintenance, support request และ inspection request ที่เกี่ยวข้องกับ dealer account</p>
          </article>
        </div>
      </section>
    </main>
  );
}
