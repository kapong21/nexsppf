'use client';

import { useState } from 'react';
import { Eyebrow } from './shared';
import { ComparisonTable } from './products';
import { productsByGroup, CTA, type ProductGroup } from '@/data/brand';
import { useGo } from '@/lib/use-go';

export const ComparePage = () => {
  const go = useGo();
  const [group, setGroup] = useState<ProductGroup>('clear');
  const items = productsByGroup(group);

  return (
    <main data-screen-label="06 Compare">
      <section className="page-hero">
        <div className="container">
          <Eyebrow>Compare Film Systems</Eyebrow>
          <h1 className="h-1" style={{ marginTop: 14 }}>Find Your Best Match</h1>
          <p className="lede thai" style={{ marginTop: 20, maxWidth: 680 }}>
            เปรียบเทียบรุ่นในแต่ละกลุ่มฟิล์ม เพื่อให้คุณเลือกได้ตามการใช้งานจริง สไตล์ที่ต้องการ และระดับพรีเมียมที่เหมาะกับรถของคุณ
          </p>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--nexs-hairline)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '20px 24px' }}>
          <div className="thai" style={{ display: 'inline-flex', gap: 4, padding: 4, borderRadius: 999, background: 'var(--nexs-canvas-soft)' }}>
            {([['clear', 'Clear PPF'], ['matte', 'Matte PPF'], ['color', 'Color PPF']] as const).map(([k, l]) => (
              <button key={k} className="btn btn-sm" onClick={() => setGroup(k)}
                style={{ background: group === k ? 'var(--nexs-ink)' : 'transparent', color: group === k ? 'white' : 'var(--nexs-ink)' }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
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
        <div className="container">
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <Eyebrow>Selection Guide</Eyebrow>
            <h2 className="h-1 thai" style={{ marginTop: 14 }}>เลือกอย่างไรให้เหมาะกับรถ</h2>
          </div>
          <div className="grid-3">
            {[
              ['รถใช้งานทุกวัน ต้องการเริ่มต้นดูแล', 'Begin', 'สำหรับการใช้งานในเมือง รอยขีดข่วนทั่วไป'],
              ['รถส่วนตัว ต้องการสมดุลคุ้มค่า', 'Prime', 'รุ่นแนะนำของ NEXS คุ้มค่าและพรีเมียม'],
              ['รถระดับพรีเมียมหรือใหม่ป้ายแดง', 'Pro หรือ Ultimate', 'ต้องการระดับการดูแลและรับประกันที่ยาวขึ้น'],
            ].map(([q, a, d], i) => (
              <div key={i} className="card thai">
                <div className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>หากคุณ…</div>
                <h3 className="h-3" style={{ marginTop: 10, fontSize: 18 }}>{q}</h3>
                <div style={{ margin: '20px 0 12px', paddingTop: 18, borderTop: '1px solid var(--nexs-hairline)' }}>
                  <div className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>เลือก</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 4 }}>{a}</div>
                </div>
                <p className="body">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container center">
          <h2 className="h-1 thai" style={{ maxWidth: 720, margin: '0 auto' }}>Talk to an Expert</h2>
          <p className="lede thai" style={{ margin: '16px auto 32px', maxWidth: 560 }}>
            ให้ทีมงานหรือตัวแทนจำหน่ายในพื้นที่ช่วยแนะนำตามการใช้งานจริงและรถของคุณ
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
