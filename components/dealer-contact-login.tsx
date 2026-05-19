'use client';

import { ImgPh, Eyebrow, Icon } from './shared';
import { ContactForm } from './contact-form';
import { DEALER_BENEFITS, BRAND, CTA } from '@/data/brand';
import { useGo } from '@/lib/use-go';

export const DealerPage = () => {
  const go = useGo();
  return (
    <main data-screen-label="09 For Dealers">
      <section className="page-hero">
        <div className="container">
          <div className="grid-2" style={{ gap: 64, alignItems: 'center' }}>
            <div>
              <Eyebrow>Built for Professional Installers</Eyebrow>
              <h1 className="h-1" style={{ marginTop: 14 }}>Built for Installers. Designed for Growth.</h1>
              <p className="lede thai" style={{ marginTop: 16 }}>
                NEXS พร้อมสนับสนุนร้านติดตั้งด้วยระบบสินค้าที่ชัดเจน สื่อการขายที่พร้อมใช้งาน การอบรมมาตรฐาน และเครื่องมือที่ช่วยให้การแนะนำลูกค้าเป็นเรื่องง่ายขึ้น
              </p>
              <div className="row" style={{ marginTop: 32, gap: 12 }}>
                <button className="btn btn-primary btn-lg" onClick={() => go('contact')}>{CTA.becomeDealer}</button>
                <button className="btn btn-ghost btn-lg" onClick={() => go('contact')}>{CTA.dealerLogin}</button>
              </div>
            </div>
            <div><ImgPh ratio="5/4" label="Authorized Installer · workshop"/></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <Eyebrow>Dealer Benefits</Eyebrow>
            <h2 className="h-1 thai" style={{ marginTop: 14 }}>ทำไมร้านติดตั้งเลือกร่วมกับ NEXS</h2>
          </div>
          <div className="grid-3">
            {DEALER_BENEFITS.map((b, i) => (
              <div key={i} className="card-flat thai" style={{ background: 'var(--nexs-canvas)' }}>
                <div className="caption" style={{ color: 'var(--nexs-ink-soft)', fontFamily: 'var(--font-mono)' }}>0{i + 1}</div>
                <h3 className="h-3" style={{ marginTop: 10, marginBottom: 6, fontSize: 17 }}>{b.title}</h3>
                <div className="caption" style={{ marginBottom: 10 }}>{b.th}</div>
                <p className="body" style={{ fontSize: 13 }}>{b.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container">
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <Eyebrow>Workflow Preview</Eyebrow>
            <h2 className="h-1 thai" style={{ marginTop: 14 }}>เครื่องมือสำหรับร้านติดตั้ง</h2>
            <p className="lede thai" style={{ marginTop: 16 }}>
              ตัวอย่างหน้าจอสำหรับ Dealer หลังจาก login เข้าใช้งานระบบ
            </p>
          </div>
          <DealerDashboardMock/>
        </div>
      </section>

      <section className="section">
        <div className="container center">
          <h2 className="h-1 thai" style={{ maxWidth: 720, margin: '0 auto' }}>พร้อมร่วมเครือข่าย NEXS Authorized Dealer?</h2>
          <p className="lede thai" style={{ margin: '16px auto 32px', maxWidth: 560 }}>
            ทีมงาน NEXS จะติดต่อกลับเพื่อให้ข้อมูลเงื่อนไขและขั้นตอนการสมัคร
          </p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg" onClick={() => go('contact')}>{CTA.becomeDealer}</button>
            <button className="btn btn-ghost btn-lg" onClick={() => go('contact')}>{CTA.dealerLogin}</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export const DealerDashboardMock = () => (
  <div className="card" style={{ padding: 0, overflow: 'hidden', background: 'white' }}>
    <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--nexs-hairline)', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--nexs-canvas-soft)' }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E5E7EA' }}/>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E5E7EA' }}/>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E5E7EA' }}/>
      <div style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'var(--nexs-ink-soft)', fontFamily: 'var(--font-mono)' }}>{BRAND.handle}.com/dealer</div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 420 }}>
      <aside style={{ borderRight: '1px solid var(--nexs-hairline)', padding: 18, background: 'var(--nexs-canvas-soft)' }}>
        <div style={{ fontSize: 12, color: 'var(--nexs-ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }} className="thai">Dealer Console</div>
        {([
          ['chart', 'ภาพรวม', true],
          ['qr', 'ตรวจสอบ Serial', false],
          ['clipboard', 'ลงทะเบียนใหม่', false],
          ['history', 'ประวัติงานติดตั้ง', false],
          ['users', 'ลูกค้า', false],
          ['wand', 'คำขอตรวจสอบ', false],
        ] as const).map(([ic, l, act], i) => (
          <div key={i} className="thai" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, fontSize: 13.5, color: act ? 'var(--nexs-ink)' : 'var(--nexs-ink-muted)', background: act ? 'white' : 'transparent', border: act ? '1px solid var(--nexs-hairline)' : 'none', marginBottom: 2 }}>
            <Icon name={ic} size={16}/>{l}
          </div>
        ))}
      </aside>
      <div style={{ padding: 24 }}>
        <div className="thai between" style={{ marginBottom: 18 }}>
          <div>
            <div className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Today</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>NEXS Authorized · Bangkok</div>
          </div>
          <button className="btn btn-primary btn-sm">+ ลงทะเบียนงาน</button>
        </div>
        <div className="grid-3" style={{ gap: 12, marginBottom: 18 }}>
          {[['12', 'งานเดือนนี้'], ['146', 'งานทั้งหมด'], ['3', 'คำขอรอตรวจ']].map(([n, l], i) => (
            <div key={i} style={{ padding: 16, border: '1px solid var(--nexs-hairline)', borderRadius: 12 }}>
              <div className="caption thai" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, marginTop: 4 }}>{n}</div>
            </div>
          ))}
        </div>
        <div className="thai" style={{ border: '1px solid var(--nexs-hairline)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--nexs-hairline)', background: 'var(--nexs-canvas-soft)', fontSize: 13, fontWeight: 600 }}>งานล่าสุด</div>
          {[
            ['PRO-1196MXY0401178Q', 'NEXS Clear PPF · Pro', 'Sedan', '12 มี.ค.', 'Active'],
            ['P-9911XYZ0344112B', 'NEXS Clear PPF · Prime', 'SUV', '11 มี.ค.', 'Active'],
            ['U-7720ABC0398765K', 'NEXS Color · Ultimate', 'Sedan', '10 มี.ค.', 'Active'],
          ].map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 0.8fr 0.8fr 100px', gap: 12, padding: '12px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--nexs-hairline)', fontSize: 13, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r[0]}</span>
              <span>{r[1]}</span>
              <span className="muted">{r[2]}</span>
              <span className="muted">{r[3]}</span>
              <span className="pill pill-active" style={{ fontSize: 11 }}><span className="dot"/>{r[4]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const ContactPage = () => {
  const go = useGo();
  return (
    <main data-screen-label="10 Contact">
      <section className="page-hero">
        <div className="container">
          <Eyebrow>Let&apos;s Build Something Premium</Eyebrow>
          <h1 className="h-1 thai" style={{ marginTop: 14 }}>ติดต่อ NEXS</h1>
          <p className="lede thai" style={{ marginTop: 20, maxWidth: 680 }}>
            ติดต่อทีม NEXS เพื่อสอบถามสินค้า นัดหมายติดตั้ง หรือสมัครเป็นตัวแทนจำหน่าย
          </p>
        </div>
      </section>
      <section className="section-tight">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48 }} className="contact-layout">
            <ContactForm formType="contact"/>
            <aside className="thai stack-24" style={{ position: 'sticky', top: 80, height: 'fit-content' }}>
              <div className="card-flat">
                <div className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Quick Contact</div>
                <ul className="stack-12" style={{ listStyle: 'none', padding: 0, marginTop: 14, fontSize: 14 }}>
                  <li className="row" style={{ gap: 10 }}><Icon name="phone" size={16}/><span className="muted">โทร · กำลังเปิดให้บริการ</span></li>
                  <li className="row" style={{ gap: 10 }}><Icon name="mail" size={16}/><span className="muted">LINE OA · @{BRAND.handle}</span></li>
                  <li className="row" style={{ gap: 10 }}><Icon name="globe" size={16}/><span className="muted">Facebook · @{BRAND.handle}</span></li>
                </ul>
              </div>
              <div className="card-flat">
                <div className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>หลังกรอกฟอร์ม</div>
                <p className="body" style={{ marginTop: 10 }}>
                  ทีมงาน NEXS หรือตัวแทนจำหน่ายในพื้นที่จะติดต่อกลับภายในเวลาทำการ
                </p>
              </div>
              <div className="card-flat">
                <div className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>ตรวจสอบบัตร</div>
                <p className="body" style={{ marginTop: 10 }}>
                  หากต้องการตรวจสอบบัตรรับประกัน
                </p>
                <button className="btn-link" style={{ marginTop: 8 }} onClick={() => go('warranty')}>เปิดหน้าตรวจสอบ <Icon name="arrow-right" size={14}/></button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};
