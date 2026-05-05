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
          <h1>BEGIN / PRIME / PRO / ULTIMATE</h1>
          <p className="lead">กลุ่มสินค้า NEXS PPF สำหรับ public v1 พร้อม warranty years และ color direction ที่เตรียมไว้สำหรับ product card system</p>
        </div>
        <div className="hero-visual">{mood.path && <img src={mood.path} alt={mood.alt} />}</div>
      </section>

      <section className="section">
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
                <p>Color direction: {product.colorDirection.join(' / ')}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
