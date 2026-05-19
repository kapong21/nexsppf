'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eyebrow, Icon } from './shared';
import { DigitalCardMock } from './home-sections';
import { Faq } from './faq';
import { useGo } from '@/lib/use-go';

export const WarrantyLookupPage = () => {
  const router = useRouter();
  const [serial, setSerial] = useState('');

  const goToCard = (s: string, state = 'active') => {
    router.push(`/warranty/${encodeURIComponent(s)}/${state}`);
  };

  return (
    <main data-screen-label="12 Warranty Lookup">
      <section className="page-hero">
        <div className="container">
          <Eyebrow>Digital Warranty</Eyebrow>
          <h1 className="h-1 thai" style={{ marginTop: 14 }}>บัตรรับประกันดิจิทัล ตรวจสอบได้ทุกครั้งที่ต้องการ</h1>
          <p className="lede thai" style={{ marginTop: 20, maxWidth: 680 }}>
            กรอก Serial Number บนบรรจุภัณฑ์หรือบนบัตรรับประกันของคุณ เพื่อตรวจสอบสถานะบัตรรับประกันดิจิทัลของ NEXS
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-narrow">
          <div className="card" style={{ padding: 40 }}>
            <form className="thai" onSubmit={(e) => { e.preventDefault(); goToCard(serial.trim() || 'PRO-1196MXY0401178Q'); }}>
              <label className="label">Serial Number</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input className="input" style={{ fontFamily: 'var(--font-mono)' }} value={serial} onChange={(e) => setSerial(e.target.value)} placeholder="เช่น PRO-1196MXY0401178Q"/>
                <button className="btn btn-primary" type="submit">ตรวจสอบ <Icon name="arrow-right" size={14}/></button>
              </div>
              <div className="help" style={{ marginTop: 12, color: 'var(--nexs-ink-soft)' }}>
                ตัวอย่างที่ใช้ทดลอง: <button type="button" className="btn-link" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--nexs-ink)', padding: 0, height: 'auto' }} onClick={() => setSerial('PRO-1196MXY0401178Q')}>PRO-1196MXY0401178Q</button>
              </div>

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--nexs-hairline)' }}>
                <p className="body" style={{ lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--nexs-ink)' }}>หมายเหตุสำคัญ:</strong> ลูกค้าไม่สามารถเปิดใช้งานบัตรรับประกันเองได้ การลงทะเบียนต้องให้ตัวแทนจำหน่ายหรือ Admin ของ NEXS เป็นผู้ลงทะเบียนหลังการติดตั้งจริง
                </p>
              </div>
            </form>
          </div>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span className="caption thai" style={{ paddingTop: 8 }}>ดูตัวอย่างสถานะ:</span>
            <button className="btn btn-ghost btn-sm" onClick={() => goToCard('PRO-1196MXY0401178Q', 'active')}>Active</button>
            <button className="btn btn-ghost btn-sm" onClick={() => goToCard('PRO-9999XYZ0401000A', 'not-registered')}>Found · ยังไม่ลงทะเบียน</button>
            <button className="btn btn-ghost btn-sm" onClick={() => goToCard('INVALID-CODE', 'invalid')}>Invalid</button>
          </div>
        </div>
      </section>

      <WarrantySupportSection />

      <section className="section">
        <div className="container container-narrow">
          <div style={{ maxWidth: 640, marginBottom: 32 }}>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="h-1 thai" style={{ marginTop: 14 }}>คำถามเกี่ยวกับบัตรรับประกัน</h2>
          </div>
          <Faq items={[
            { q: 'Serial Number ของฉันอยู่ที่ไหน?', a: 'Serial อยู่บนบัตรรับประกันที่ตัวแทนจำหน่ายมอบให้หลังติดตั้ง หรือบนบรรจุภัณฑ์ของสินค้าที่ใช้ในการติดตั้ง' },
            { q: 'ตรวจสอบแล้วขึ้นว่า Not Registered หมายความว่าอย่างไร?', a: 'แปลว่า NEXS รู้จัก Serial นี้ในระบบ แต่ตัวแทนจำหน่ายยังไม่ได้ลงทะเบียนการติดตั้งกับลูกค้า กรุณาติดต่อร้านที่ติดตั้งให้ดำเนินการ' },
            { q: 'Invalid / Not Found หมายความว่าอย่างไร?', a: 'Serial นี้ไม่ปรากฏในระบบ NEXS อาจเกิดจากการพิมพ์ผิด หรือสินค้าไม่ใช่ของ NEXS แท้ กรุณาติดต่อทีมงานเพื่อตรวจสอบ' },
            { q: 'ลูกค้าสามารถเปิดใช้งานบัตรรับประกันเองได้หรือไม่?', a: 'ไม่ได้ การลงทะเบียนต้องทำโดยตัวแทนจำหน่ายหรือ Admin หลังการติดตั้งจริงเท่านั้น เพื่อความถูกต้องของข้อมูล' },
            { q: 'บัตรรับประกันสูญหายต้องทำอย่างไร?', a: 'ส่งคำขอผ่านหน้า แจ้งบัตร/QR สูญหาย ทีมงานจะตรวจสอบสิทธิ์และออกบัตรใหม่ให้' },
          ]}/>
        </div>
      </section>
    </main>
  );
};

const WarrantySupportSection = () => {
  const go = useGo();
  return (
    <section className="section section-grey">
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
          <Eyebrow>After-sales Support</Eyebrow>
          <h2 className="h-1 thai" style={{ marginTop: 14 }}>การดูแลหลังการขายของ NEXS</h2>
        </div>
        <div className="grid-3">
          {[
            { icon: 'clipboard', t: 'แจ้งบัตรรับประกัน / QR สูญหาย', d: 'กรอกข้อมูลและทีมงานจะตรวจสอบสิทธิ์ก่อนแสดง record และออกใหม่', cta: 'ส่งคำขอ', to: 'support-warranty' },
            { icon: 'wand', t: 'ขอตรวจสอบฟิล์มหลังติดตั้ง', d: 'นัดตรวจสอบฟิล์มและงานหลังการติดตั้งกับตัวแทนจำหน่ายในพื้นที่', cta: 'ส่งคำขอตรวจสอบ', to: 'support-inspection' },
            { icon: 'phone', t: 'ติดต่อ NEXS หรือ Dealer', d: 'สอบถามข้อมูลทั่วไป รุ่นที่เหมาะสม หรือการบำรุงรักษาเบื้องต้น', cta: 'ติดต่อเรา', to: 'contact' },
          ].map((c, i) => (
            <div key={i} className="card thai" style={{ background: 'var(--nexs-canvas)' }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--nexs-canvas-soft)', display: 'grid', placeItems: 'center', marginBottom: 24, color: 'var(--nexs-red)' }}>
                <Icon name={c.icon} size={18}/>
              </div>
              <h3 className="h-3" style={{ marginBottom: 8 }}>{c.t}</h3>
              <p className="body" style={{ marginBottom: 24 }}>{c.d}</p>
              <button className="btn-link" onClick={() => go(c.to)}>{c.cta} <Icon name="arrow-right" size={14}/></button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WarrantyCardPage = ({ serial, state = 'active' }: { serial: string; state?: string }) => {
  const router = useRouter();
  const go = useGo();
  return (
    <main data-screen-label={`13 Warranty Card · ${state}`} style={{ background: 'var(--nexs-canvas-soft)', minHeight: '100vh', padding: '48px 0 80px' }}>
      <div className="container-narrow">
        <button className="btn-link thai" onClick={() => router.push('/warranty')} style={{ color: 'var(--nexs-ink-muted)', marginBottom: 24, fontSize: 13 }}>
          ← กลับไปยังหน้าตรวจสอบ
        </button>

        {state === 'active' && <ActiveCard serial={serial} go={go}/>}
        {state === 'not-registered' && <NotRegisteredCard serial={serial} go={go}/>}
        {state === 'invalid' && <InvalidCard serial={serial} go={go}/>}
      </div>
    </main>
  );
};

const ActiveCard = ({ serial, go }: { serial: string; go: (r: string) => void }) => (
  <>
    <DigitalCardMock
      data={{
        status: 'Active', product: 'NEXS Clear PPF · Pro', warrantyYears: 10,
        serial,
        vehicle: 'Sedan · Pearl White', plate: '1กก ··3456',
        dealer: 'NEXS Authorized · Bangkok',
        install: '12 มี.ค. 2026', expiry: '12 มี.ค. 2036',
      }}
      state="active"
    />

    <div className="card thai" style={{ marginTop: 24, padding: 28 }}>
      <div className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Care Timeline</div>
      <div style={{ marginTop: 20 }}>
        {[
          ['12 มี.ค. 2026', 'ลงทะเบียนการติดตั้ง', 'NEXS Authorized · Bangkok'],
          ['18 พ.ค. 2026', 'ตรวจสอบหลังติดตั้ง 60 วัน', 'ผ่านการตรวจสอบ'],
        ].map(([d, t, by], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, padding: '14px 0', borderBottom: i === 1 ? 'none' : '1px solid var(--nexs-hairline)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--nexs-ink-muted)' }}>{d}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{t}</div>
              <div className="caption" style={{ color: 'var(--nexs-ink-muted)' }}>{by}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="grid-2 thai" style={{ marginTop: 16, gap: 12 }}>
      <button className="btn btn-primary" onClick={() => go('support-inspection')}>ขอตรวจสอบปัญหา</button>
      <button className="btn btn-ghost" onClick={() => go('support-warranty')}>แจ้งบัตร / QR สูญหาย</button>
    </div>

    <p className="caption thai" style={{ marginTop: 24, textAlign: 'center', color: 'var(--nexs-ink-soft)', lineHeight: 1.6 }}>
      ข้อมูลที่แสดงเป็นแบบ PDPA-safe เบอร์โทรและทะเบียนรถบางส่วนถูกซ่อนเพื่อความปลอดภัย
    </p>
  </>
);

const NotRegisteredCard = ({ serial, go }: { serial: string; go: (r: string) => void }) => (
  <div className="card thai" style={{ padding: 40, textAlign: 'center' }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
      <span className="pill pill-warn"><span className="dot"/>Serial Found · ยังไม่ลงทะเบียน</span>
    </div>
    <h2 className="h-2">Serial นี้อยู่ในระบบแล้ว แต่ยังไม่ได้ลงทะเบียนการติดตั้ง</h2>
    <p className="body" style={{ maxWidth: 520, margin: '16px auto 0' }}>
      Serial <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--nexs-ink)' }}>{serial}</span> ถูกผลิตและบันทึกในระบบ NEXS แต่ยังไม่มีตัวแทนจำหน่ายลงทะเบียนการติดตั้งกับลูกค้า
    </p>
    <div className="card-flat" style={{ marginTop: 32, textAlign: 'left', padding: 24, background: 'var(--nexs-canvas-soft)', border: 'none' }}>
      <div className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>หากคุณติดตั้งแล้ว</div>
      <ol style={{ paddingLeft: 18, marginTop: 10, lineHeight: 1.7, fontSize: 14, color: 'var(--nexs-ink-muted)' }}>
        <li>ติดต่อตัวแทนจำหน่ายที่ทำการติดตั้งให้ลงทะเบียนบัตรรับประกัน</li>
        <li>หากไม่สามารถติดต่อ dealer ได้ ส่งคำขอผ่าน &ldquo;แจ้งบัตร / QR สูญหาย&rdquo;</li>
      </ol>
    </div>
    <div className="row" style={{ justifyContent: 'center', marginTop: 24 }}>
      <button className="btn btn-primary" onClick={() => go('support-warranty')}>ส่งคำขอตรวจสอบ</button>
      <button className="btn btn-ghost" onClick={() => go('contact')}>ติดต่อ NEXS</button>
    </div>
  </div>
);

const InvalidCard = ({ serial, go }: { serial: string; go: (r: string) => void }) => (
  <div className="card thai" style={{ padding: 40, textAlign: 'center' }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
      <span className="pill pill-error"><span className="dot"/>Invalid · Not Found</span>
    </div>
    <h2 className="h-2">ไม่พบ Serial นี้ในระบบ NEXS</h2>
    <p className="body" style={{ maxWidth: 520, margin: '16px auto 0' }}>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--nexs-ink)' }}>{serial}</span> ไม่ปรากฏในระบบ อาจเกิดจากการพิมพ์ผิด หรือสินค้าไม่ใช่ของ NEXS แท้
    </p>
    <p className="caption" style={{ marginTop: 16, color: 'var(--nexs-ink-soft)', lineHeight: 1.6, maxWidth: 480, margin: '16px auto 0' }}>
      หมายเหตุ: การไม่พบ Serial ไม่ได้ยืนยันทันทีว่าสินค้าเป็นของปลอม กรุณาติดต่อทีมงานเพื่อยืนยัน
    </p>
    <div className="row" style={{ justifyContent: 'center', marginTop: 32 }}>
      <button className="btn btn-primary" onClick={() => go('contact')}>ติดต่อทีมงาน</button>
      <button className="btn btn-ghost" onClick={() => go('warranty')}>กรอก Serial ใหม่</button>
    </div>
  </div>
);
