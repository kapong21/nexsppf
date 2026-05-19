'use client';

import { useState } from 'react';
import { Icon } from './shared';
import { CTA, BRAND } from '@/data/brand';

type LeadPayload = Record<string, unknown> & { formType: string };

async function postLead(payload: LeadPayload): Promise<{ ok: boolean }> {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const w = window as unknown as { dataLayer?: unknown[] };
    if (typeof window !== 'undefined' && Array.isArray(w.dataLayer)) {
      w.dataLayer.push({
        event: `lead_submit_${payload.formType}`,
        product_interest: payload.product_interest ?? payload.interest,
        source_page: window.location.pathname,
      });
    }
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

export const ContactForm = ({ compact, formType = 'contact' }: { compact?: boolean; formType?: string }) => {
  const [data, setData] = useState({
    name: '', phone: '', line: '', province: '', carModel: '',
    interest: 'ขอคำแนะนำเลือกรุ่น',
    contactType: 'ลูกค้า',
    message: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const set = <K extends keyof typeof data>(k: K, v: typeof data[K]) => setData((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.consent) return;
    setSubmitting(true);
    await postLead({ formType, ...data });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card thai" style={{ textAlign: 'center', padding: '64px 32px', maxWidth: 560, margin: '0 auto' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(27,127,79,0.1)', color: 'var(--status-active)', display: 'grid', placeItems: 'center', margin: '0 auto' }}>
          <Icon name="check" size={22}/>
        </div>
        <h3 className="h-2" style={{ marginTop: 24 }}>ได้รับข้อมูลแล้ว</h3>
        <p className="body" style={{ marginTop: 12 }}>
          ทีมงาน NEXS หรือตัวแทนจำหน่ายในพื้นที่จะติดต่อกลับโดยเร็วที่สุด
        </p>
        <button
          className="btn btn-secondary btn-sm"
          style={{ marginTop: 24 }}
          onClick={() => {
            setSubmitted(false);
            setData({ name: '', phone: '', line: '', province: '', carModel: '', interest: 'ขอคำแนะนำเลือกรุ่น', contactType: 'ลูกค้า', message: '', consent: false });
          }}
        >
          กรอกใหม่
        </button>
      </div>
    );
  }

  return (
    <form className="card thai" style={{ padding: compact ? 32 : 40 }} onSubmit={handleSubmit}>
      <div className="field-row">
        <div className="field">
          <label className="label">ชื่อ–นามสกุล</label>
          <input className="input" required value={data.name} onChange={(e) => set('name', e.target.value)} placeholder="ชื่อของคุณ"/>
        </div>
        <div className="field">
          <label className="label">เบอร์โทร</label>
          <input className="input" required value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="08x-xxx-xxxx"/>
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label className="label">LINE ID <span className="opt">(ถ้ามี)</span></label>
          <input className="input" value={data.line} onChange={(e) => set('line', e.target.value)} placeholder={'@' + BRAND.handle}/>
        </div>
        <div className="field">
          <label className="label">จังหวัด</label>
          <input className="input" value={data.province} onChange={(e) => set('province', e.target.value)} placeholder="กรุงเทพฯ"/>
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label className="label">รุ่นรถ</label>
          <input className="input" value={data.carModel} onChange={(e) => set('carModel', e.target.value)} placeholder="ยี่ห้อ / รุ่น / ปี"/>
        </div>
        <div className="field">
          <label className="label">กลุ่มฟิล์มที่สนใจ</label>
          <select className="select" value={data.interest} onChange={(e) => set('interest', e.target.value)}>
            <option>ขอคำแนะนำเลือกรุ่น</option>
            <option>Clear PPF</option>
            <option>Matte PPF</option>
            <option>Color PPF</option>
            <option>Color Ultimate Carbon Fiber</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label className="label">ประเภทผู้ติดต่อ</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['ลูกค้า', 'ร้านค้า / ตัวแทน', 'สอบถามบัตรรับประกัน', 'อื่นๆ'].map((t) => (
            <button type="button" key={t}
              onClick={() => set('contactType', t)}
              className="btn btn-sm"
              style={{
                background: data.contactType === t ? 'var(--nexs-ink)' : 'transparent',
                color: data.contactType === t ? 'white' : 'var(--nexs-ink)',
                border: '1px solid',
                borderColor: data.contactType === t ? 'var(--nexs-ink)' : 'var(--nexs-border)',
              }}>{t}</button>
          ))}
        </div>
      </div>
      <div className="field">
        <label className="label">ข้อความเพิ่มเติม <span className="opt">(ไม่บังคับ)</span></label>
        <textarea className="textarea" value={data.message} onChange={(e) => set('message', e.target.value)} placeholder="รายละเอียดเพิ่มเติม"/>
      </div>
      <div className="checkbox-row" style={{ marginTop: 8, marginBottom: 24 }}>
        <input id="pdpa" type="checkbox" checked={data.consent} onChange={(e) => set('consent', e.target.checked)}/>
        <label htmlFor="pdpa">
          ยินยอมให้ NEXS เก็บและใช้ข้อมูลการติดต่อเพื่อจุดประสงค์การให้บริการตาม
          <a style={{ color: 'var(--nexs-ink)', textDecoration: 'underline' }}> Privacy Policy</a>
        </label>
      </div>
      <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <button className="btn btn-primary btn-lg" type="submit" disabled={!data.consent || submitting}>
          {submitting ? 'กำลังส่ง...' : CTA.primary} <Icon name="arrow-right" size={14}/>
        </button>
        <span className="caption">ใช้เวลาประมาณ 1 นาที</span>
      </div>
    </form>
  );
};
