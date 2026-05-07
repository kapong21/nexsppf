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
  const productLineVisual = getImageSlot('product_line_visual');

  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Products</p>
          <h1>เลือก NEXS PPF ให้เหมาะกับรถของคุณ</h1>
          <p className="lead">เปรียบเทียบ 4 รุ่นหลักจาก BEGIN, PRIME, PRO และ ULTIMATE ตามระดับการดูแล ระยะรับประกัน และแพ็กเกจติดตั้งที่เหมาะกับการใช้งานจริง</p>
          <div className="actions"><a className="button primary" href="/contact">สอบถามราคา</a><a className="button secondary" href="/warranty">ตรวจสอบบัตรรับประกัน</a></div>
        </div>
        <div className={`hero-visual ${mood.layoutClass}`}>{mood.path && <img src={mood.path} alt={mood.alt} />}</div>
      </section>
      <section className="section">
        <div className="section-head"><h2>เลือกรุ่นที่เหมาะกับคุณ</h2><p>ทั้ง 4 รุ่นช่วยให้ลูกค้าเลือกได้จากการใช้งานจริง สื่อสารเฉพาะข้อมูลรุ่น ระยะรับประกัน และแพ็กเกจติดตั้งที่ตรวจสอบได้</p></div>
        <div className="product-line-visual-band legacy-surface-panel curated-visual-rhythm">
          <div className={`image-card ${productLineVisual.layoutClass}`}>{productLineVisual.path && <img src={productLineVisual.path} alt={productLineVisual.alt} />}</div>
          <div className="product-line-copy"><p className="eyebrow">Product Proof</p><h3>ภาพพื้นผิวและสินค้าเพื่อช่วยให้เข้าใจ Product Line</h3><p>ภาพถูกใช้เพื่อเสริมความรู้สึกพรีเมียมและความน่าเชื่อถือ ส่วนการเลือกรุ่นยังยึดข้อมูล BEGIN, PRIME, PRO และ ULTIMATE จากระบบสินค้า</p></div>
        </div>
        <div className="grid four">
          {PUBLIC_PRODUCT_GROUPS.map((product) => {
            const [accent1, accent2] = productAccents[product.name];
            return <article className="card product-card product-decision-card" key={product.name} style={{ '--accent-1': accent1, '--accent-2': accent2 } as CSSProperties}>
              <p className="product-badge">{product.badge}</p><p className="decision-label">{product.decisionLabel}</p><h2>{product.headline}</h2><p>{product.thaiDescription}</p>
              <div className="product-meta"><span className="warranty-label">{product.warrantyLabel}</span><span>{product.modelCode}</span></div>
              <dl className="decision-list"><div><dt>เหมาะสำหรับ</dt><dd>{product.suitableFor}</dd></div><div><dt>จุดเด่น</dt><dd>{product.keyDifference}</dd></div><div><dt>ระดับการปกป้อง</dt><dd>{product.protectionLevel}</dd></div><div><dt>แพ็กเกจที่เหมาะ</dt><dd>{product.packageSuggestion}</dd></div></dl>
              <div className="actions small-actions"><a className="button primary" href="/contact">{product.primaryCta}</a><a className="button secondary" href="/products">{product.secondaryCta}</a></div>
            </article>;
          })}
        </div>
      </section>
      <section className="section">
        <div className="section-head"><h2>Comparison Table</h2><p>ตารางเปรียบเทียบเพื่อช่วยคุยกับ Dealer ได้เร็วขึ้น โดยยังไม่เปิดเผยราคา public</p></div>
        <div className="product-comparison-table">
          <table aria-label="NEXS PPF product comparison table">
            <thead><tr><th>รุ่น</th><th>รับประกัน</th><th>ระดับการปกป้อง</th><th>เหมาะสำหรับ</th><th>แพ็กเกจที่เหมาะ</th></tr></thead>
            <tbody>
              {PUBLIC_PRODUCT_GROUPS.map((product) => <tr key={product.name}><th scope="row"><strong>{product.name}</strong><small>{product.decisionLabel}</small></th><td>{product.warrantyLabel}</td><td>{product.protectionLevel}</td><td>{product.suitableFor}</td><td>{product.packageSuggestion}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
