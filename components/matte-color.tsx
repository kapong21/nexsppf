'use client';

import { Eyebrow, ImgPh } from './shared';
import { ProductCard } from './home';
import { ComparisonTable } from './products';
import { productsByGroup, PRODUCT_GROUPS, CTA } from '@/data/brand';
import { useGo } from '@/lib/use-go';

export const MattePPFPage = () => {
  const go = useGo();
  const items = productsByGroup('matte');
  const group = PRODUCT_GROUPS.matte;
  return (
    <main data-screen-label="03 Matte PPF">
      <section className="page-hero">
        <div className="container">
          <div className="grid-2" style={{ gap: 64, alignItems: 'center' }}>
            <div>
              <Eyebrow>{group.code}</Eyebrow>
              <h1 className="h-1" style={{ marginTop: 14 }}>Matte Film Collection</h1>
              <p className="lede thai" style={{ marginTop: 20 }}>
                ฟิล์มด้านพรีเมียม 3 รุ่น สำหรับผิวสัมผัส matte และ satin
                ให้ลุคที่เรียบหรู คงเอกลักษณ์ พร้อมการปกป้องในฟิล์มเดียว
              </p>
              <div className="row" style={{ marginTop: 32, gap: 12 }}>
                <button className="btn btn-primary btn-lg thai" onClick={() => go('contact')}>{CTA.primary}</button>
                <button className="btn btn-ghost btn-lg" onClick={() => go('compare')}>Compare</button>
              </div>
            </div>
            <ImgPh ratio="4/3" label="Matte PPF · satin gray car · soft reflection"/>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Eyebrow>Matte PPF Models</Eyebrow>
          <h2 className="h-2 thai" style={{ marginTop: 14, marginBottom: 40 }}>3 รุ่นด้านพรีเมียมสำหรับผิว matte / satin</h2>
          <div className="grid-3">
            {items.map((p) => <ProductCard key={p.code} p={p} />)}
          </div>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container">
          <Eyebrow>Compare Matte Models</Eyebrow>
          <h2 className="h-1 thai" style={{ marginTop: 14, marginBottom: 48, maxWidth: 640 }}>เปรียบเทียบรุ่น Matte PPF</h2>
          <ComparisonTable
            rows={[
              { label: 'Finish', th: 'ลักษณะผิว', values: items.map((p) => p.publicSpecs.gloss) },
              { label: 'Self-Healing', th: 'ซ่อมรอยขนแมว', values: items.map((p) => p.publicSpecs.selfHealing) },
              { label: 'Yellowing Resistance', th: 'การต้านเหลือง', values: items.map((p) => p.publicSpecs.yellowing) },
              { label: 'Ideal User', th: 'เหมาะสำหรับ', values: items.map((p) => p.publicSpecs.idealUser) },
              { label: 'Warranty', th: 'รับประกัน', values: items.map(() => 'up to 10 years') },
            ]}
            columns={items.map((p) => p.name)}
          />
        </div>
      </section>

      <section className="section">
        <div className="container center">
          <h2 className="h-1 thai" style={{ maxWidth: 720, margin: '0 auto' }}>มองหา finish ด้านที่เหมาะกับรถของคุณ?</h2>
          <p className="lede thai" style={{ margin: '16px auto 32px', maxWidth: 560 }}>
            ทีมงานหรือตัวแทนจำหน่ายในพื้นที่จะช่วยแนะนำตามสีรถจริง การใช้งาน และระดับพรีเมียมที่ต้องการ
          </p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg thai" onClick={() => go('contact')}>{CTA.primary}</button>
            <button className="btn btn-ghost btn-lg thai" onClick={() => go('for-dealers')}>{CTA.findInstallerTH}</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export const ColorPPFPage = () => {
  const go = useGo();
  const items = productsByGroup('color');
  const group = PRODUCT_GROUPS.color;
  const swatches = [
    { name: 'Red', c: '#D71920' }, { name: 'Blue', c: '#3B5A82' },
    { name: 'Green', c: '#2E7D32' }, { name: 'Purple', c: '#6A1B9A' },
    { name: 'Black', c: '#0E0E0F' }, { name: 'White', c: '#F2F3F4' },
    { name: 'Carbon', c: '#1D1D1F' }, { name: 'Silver', c: '#BFC3C7' },
  ];
  return (
    <main data-screen-label="04 Color PPF">
      <section className="page-hero">
        <div className="container">
          <div className="grid-2" style={{ gap: 64, alignItems: 'center' }}>
            <div>
              <Eyebrow>{group.code}</Eyebrow>
              <h1 className="h-1" style={{ marginTop: 14 }}>Color Film Collection</h1>
              <p className="lede thai" style={{ marginTop: 20 }}>
                ฟิล์มสี PPF 5 รุ่น สำหรับเปลี่ยนลุครถพร้อมการปกป้องในฟิล์มเดียว
                ตั้งแต่สีเริ่มต้นที่คุ้มค่า ไปจนถึง Color Ultimate Carbon Fiber ที่มีความเป็นเอกลักษณ์สูง
              </p>
              <div className="row" style={{ marginTop: 32, gap: 12 }}>
                <button className="btn btn-primary btn-lg" onClick={() => go('contact')}>{CTA.viewAllFinishes}</button>
                <button className="btn btn-ghost btn-lg thai" onClick={() => go('contact')}>{CTA.findInstallerTH}</button>
              </div>
            </div>
            <ImgPh ratio="4/3" label="Color PPF · multi-color hero"/>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Eyebrow>Color PPF Models</Eyebrow>
          <h2 className="h-2 thai" style={{ marginTop: 14, marginBottom: 40 }}>5 รุ่นสำหรับเปลี่ยนลุครถพร้อมการปกป้อง</h2>
          <div className="grid-5">
            {items.map((p) => <ProductCard key={p.code} p={p} />)}
          </div>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container">
          <div style={{ maxWidth: 640, marginBottom: 40 }}>
            <Eyebrow>Explore Finishes</Eyebrow>
            <h2 className="h-1 thai" style={{ marginTop: 14 }}>เลือกเฉดสีและผิวสัมผัสที่สะท้อนตัวตนของคุณ</h2>
          </div>
          <div className="grid-4" style={{ gap: 16 }}>
            {swatches.map((s, i) => (
              <div key={i} className="card thai" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ aspectRatio: '4/3', background: s.c }}/>
                <div style={{ padding: '16px 18px' }}>
                  <div className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--nexs-ink-soft)' }}>Swatch</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginTop: 4, fontSize: 16 }}>{s.name}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="caption thai" style={{ marginTop: 16, color: 'var(--nexs-ink-soft)' }}>
            สีที่แสดงเป็นเฉดสีตัวอย่างเท่านั้น สีจริงอาจแตกต่างไปตามแสงและสีพื้นรถ
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64, alignItems: 'center' }}>
            <div>
              <Eyebrow>Color Ultimate Carbon Fiber</Eyebrow>
              <h2 className="h-1 thai" style={{ marginTop: 14 }}>ลุค Performance ที่มีเอกลักษณ์เฉพาะ</h2>
              <p className="lede thai" style={{ marginTop: 16 }}>
                ฟิล์ม PPF texture carbon สำหรับรถที่ต้องการลุค performance ที่พิเศษและมีความเป็นเอกลักษณ์สูง
                เหมาะกับการเน้นจุดของตัวรถ เช่น ฝากระโปรง หลังคา และดิฟฟิวเซอร์
              </p>
              <div className="row" style={{ marginTop: 24 }}>
                <button className="btn btn-primary thai" onClick={() => go('contact')}>{CTA.primary}</button>
              </div>
            </div>
            <div style={{
              aspectRatio: '4/3',
              borderRadius: 'var(--nexs-radius-lg)',
              background: 'repeating-linear-gradient(45deg, #0E0E0F 0 6px, #1D1D1F 6px 12px)',
              border: '1px solid var(--nexs-dark-panel)',
              display: 'grid', placeItems: 'center',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              Carbon Fiber Texture
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container center">
          <h2 className="h-1 thai" style={{ maxWidth: 720, margin: '0 auto' }}>Looking for a custom look?</h2>
          <p className="lede thai" style={{ margin: '16px auto 32px', maxWidth: 560 }}>
            เลือกเฉดสีได้ หรือสั่งทำสีพิเศษสำหรับลุคเฉพาะของคุณ
          </p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg thai" onClick={() => go('contact')}>{CTA.primary}</button>
            <button className="btn btn-ghost btn-lg" onClick={() => go('compare')}>Compare</button>
          </div>
        </div>
      </section>
    </main>
  );
};
