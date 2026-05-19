'use client';

import { useState } from 'react';
import { Eyebrow } from './shared';
import { FAQ_PUBLIC, CTA } from '@/data/brand';
import { useGo } from '@/lib/use-go';

type FaqItem = { q: string; a: string };

export const Faq = ({ items = FAQ_PUBLIC }: { items?: FaqItem[] }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className="thai" style={{ borderTop: '1px solid var(--nexs-hairline)' }}>
      {items.map((it, i) => (
        <div key={i} style={{ borderBottom: '1px solid var(--nexs-hairline)' }}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              width: '100%', padding: '22px 0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer',
            }}
            aria-expanded={open === i}
          >
            <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--nexs-ink)' }}>{it.q}</span>
            <span style={{ fontSize: 22, color: 'var(--nexs-ink-soft)', transform: open === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .2s' }}>+</span>
          </button>
          {open === i && (
            <div className="body" style={{ paddingBottom: 22, maxWidth: 840, lineHeight: 1.65, color: 'var(--nexs-ink-muted)' }}>{it.a}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export const FaqPage = () => {
  const go = useGo();
  return (
    <main data-screen-label="08 FAQ">
      <section className="page-hero">
        <div className="container">
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="h-1 thai" style={{ marginTop: 14 }}>คำถามที่พบบ่อย</h1>
          <p className="lede thai" style={{ marginTop: 20, maxWidth: 680 }}>
            คำตอบสำหรับคำถามที่ลูกค้าและร้านติดตั้งสอบถามบ่อยที่สุด หากไม่พบคำตอบที่ต้องการ ติดต่อทีมงานได้ตลอดเวลา
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container container-narrow">
          <Faq/>
        </div>
      </section>

      <section className="section section-light">
        <div className="container center">
          <h2 className="h-1 thai" style={{ maxWidth: 720, margin: '0 auto' }}>มีคำถามอื่น?</h2>
          <p className="lede thai" style={{ margin: '16px auto 32px', maxWidth: 560 }}>
            ติดต่อทีมงาน NEXS หรือตัวแทนจำหน่ายในพื้นที่ของคุณ
          </p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg thai" onClick={() => go('contact')}>{CTA.primary}</button>
            <button className="btn btn-ghost btn-lg" onClick={() => go('warranty')}>Check Warranty</button>
          </div>
        </div>
      </section>
    </main>
  );
};
