import type { CSSProperties } from 'react';
import { getImageSlot } from '@/content/image-assets';
import { PUBLIC_PRODUCT_GROUPS } from '@/content/site-content';

const productAccents: Record<string, [string, string]> = {
  BEGIN: ['#d8dde3', '#f7f7f5'],
  PRIME: ['#5d7187', '#b8d6ef'],
  PRO: ['#17191d', '#d93a3a'],
  ULTIMATE: ['#08090c', '#d7b56d'],
};

export default function ProductsPage() {
  const mood = getImageSlot('hero_image');

  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Products</p>
          <h1>เลือก NEXS PPF ให้เหมาะกับรถของคุณ</h1>
          <p className="lead">
            เปรียบเทียบ BEGIN / PRIME / PRO / ULTIMATE ด้วย positioning, warranty years และ use case ที่ช่วยให้ลูกค้าคุยกับ NEXS หรือ Dealer ได้ง่ายขึ้น
          </p>
          <div className="actions">
            <a className="button primary" href="/contact">
              สอบถามราคา
            </a>
            <a className="button secondary" href="/warranty">
              ตรวจสอบบัตรรับประกัน
            </a>
          </div>
        </div>
        <div className="hero-visual">{mood.path && <img src={mood.path} alt={mood.alt} />}</div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Product tier guide</h2>
          <p>ข้อมูลนี้เป็น public sales guidance แบบไม่โชว์ราคา และไม่ใช้คำกล่าวอ้างที่ยังไม่อนุมัติ</p>
        </div>
        <div className="grid four">
          {PUBLIC_PRODUCT_GROUPS.map((product) => {
            const [accent1, accent2] = productAccents[product.name];
            return (
              <article
                className="card product-card"
                key={product.name}
                style={{ '--accent-1': accent1, '--accent-2': accent2 } as CSSProperties}
              >
                <p className="eyebrow">{product.positioning}</p>
                <h2>{product.headline}</h2>
                <div className="product-meta">
                  <span>{product.warrantyYears} years</span>
                  <span>{product.modelCode}</span>
                </div>
                <p>{product.thaiDescription}</p>
                <p>{product.recommendedUseCase}</p>
                <p>Visual direction: {product.colorDirection.join(' / ')}</p>
                <div className="actions small-actions">
                  <a className="button secondary" href="/contact">
                    {product.primaryCta}
                  </a>
                  <a className="button secondary" href="/dealer">
                    {product.secondaryCta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
