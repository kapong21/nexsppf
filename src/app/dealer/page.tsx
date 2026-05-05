import { SITE_COPY } from '@/content/site-content';

export default function DealerPage() {
  return (
    <main className="site-shell">
      <section className="hero single-column-hero">
        <div className="hero-copy">
          <p className="eyebrow">Dealer / Installer</p>
          <h1>ร่วมเป็นตัวแทนจำหน่าย NEXS PPF</h1>
          <p className="lead">
            ร้านติดตั้งสามารถยกระดับบริการด้วยระบบลงทะเบียนบัตรรับประกันดิจิทัล ตรวจสอบ Serial / QR Code และดูแลงานหลังการติดตั้งได้ในที่เดียว
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
          <h2>ระบบสำหรับตัวแทนจำหน่าย</h2>
          <p>ออกแบบเพื่อช่วยร้านติดตั้งสร้างความน่าเชื่อถือ จัดการข้อมูลงานติดตั้ง และให้บริการหลังการขายได้เป็นระบบ</p>
        </div>
        <div className="grid five">
          {SITE_COPY.dealer.benefits.map((benefit) => (
            <article className="card" key={benefit}>
              <h3>{benefit}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
