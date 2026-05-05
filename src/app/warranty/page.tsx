import { getImageSlot } from '@/content/image-assets';
import { SITE_COPY } from '@/content/site-content';

export default function WarrantyPage() {
  const visual = getImageSlot('warranty_qr_visual');

  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{SITE_COPY.warranty.title}</p>
          <h1>ตรวจสอบบัตรรับประกัน</h1>
          <p className="lead">{SITE_COPY.warranty.description}</p>
          <div className="form-shell">
            <label htmlFor="serial">Serial code</label>
            <div className="input-row">
              <input id="serial" placeholder="เช่น PRO-1196MXY0401178Q" />
              <a className="button primary" href="/r/PRO-1196MXY0401178Q">
                ดูตัวอย่าง
              </a>
            </div>
            <p>หน้านี้เป็น static skeleton ก่อนต่อ database จริง</p>
          </div>
        </div>
        <div className="hero-visual">{visual.path && <img src={visual.path} alt={visual.alt} />}</div>
      </section>
    </main>
  );
}
