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
  const mood = getImageSlot('hero_brand_visual');

  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Products</p>
          <h1>เลือก NEXS PPF ให้เหมาะกับรถของคุณ</h1>
          <p className="lead">
            เลือกฟิล์ม NEXS PPF ให้เหมาะกับการใช้งาน งบประมาณ และระดับการปกป้องที่ต้องการ
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
          <h2>เลือกรุ่นที่เหมาะกับคุณ</h2>
          <p>ทั้ง 4 รุ่นมีจุดเด่นและระยะรับประกันที่ต่างกัน เพื่อช่วยให้เลือกตามการใช้งานและระดับการดูแลที่ต้องการ</p>
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
                <p className="product-badge">{product.badge}</p>
                <h2>{product.headline}</h2>
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
      </section>
    </main>
  );
}
