'use client';

import { Eyebrow, Icon, ImgPh, QrGlyph } from './shared';
import { ContactForm } from './contact-form';
import { CTA, BRAND } from '@/data/brand';
import { useGo } from '@/lib/use-go';

export const DigitalWarrantySection = () => {
  const go = useGo();
  return (
    <section className="section section-grey">
      <div className="container">
        <div style={{ maxWidth: 720, marginBottom: 64 }}>
          <Eyebrow>Digital Warranty</Eyebrow>
          <h2 className="h-1 thai" style={{ marginTop: 14 }}>บัตรรับประกันที่ตรวจสอบได้ ทุกครั้งที่ต้องการ</h2>
          <p className="lede thai" style={{ marginTop: 16 }}>
            ทุกการติดตั้ง NEXS PPF จะลงทะเบียน Serial และข้อมูลรถโดยตัวแทนจำหน่าย
            ลูกค้าสแกน QR Code เพื่อเปิดบัตรรับประกันดิจิทัลและประวัติการดูแลได้ทันที
          </p>
        </div>

        <div className="grid-2" style={{ gap: 64, alignItems: 'center' }}>
          <div className="thai">
            {[
              ['ติดตั้งกับตัวแทนจำหน่าย', 'ทีมช่างที่ผ่านการอบรมและรับการสนับสนุนจาก NEXS'],
              ['Dealer ลงทะเบียน Serial', 'บันทึกรุ่นสินค้า ทะเบียน วันที่ติดตั้ง'],
              ['ลูกค้าสแกน QR Code', 'ตรวจสอบสถานะได้จากมือถือ'],
              ['เปิด Digital Warranty Card', 'พร้อมประวัติการดูแลและช่องทางติดต่อ'],
            ].map(([t, d], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 20, padding: '22px 0', borderTop: i === 0 ? '1px solid var(--nexs-hairline)' : 'none', borderBottom: '1px solid var(--nexs-hairline)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--nexs-hairline)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--nexs-ink-soft)' }}>0{i + 1}</div>
                <div>
                  <div className="h-3" style={{ marginBottom: 4, fontWeight: 600 }}>{t}</div>
                  <div className="body">{d}</div>
                </div>
              </div>
            ))}
            <div className="row" style={{ marginTop: 32, gap: 12 }}>
              <button className="btn btn-secondary" onClick={() => go('warranty')}>
                เปิดหน้าตรวจสอบ <Icon name="arrow-right" size={14}/>
              </button>
              <button className="btn btn-ghost" onClick={() => go('support-inspection')}>ขอตรวจสอบฟิล์ม</button>
            </div>
          </div>

          <div>
            <DigitalCardMock />
            <p className="caption thai" style={{ marginTop: 14, color: 'var(--nexs-ink-soft)' }}>
              ตัวอย่างบัตรรับประกันดิจิทัล แสดงข้อมูลแบบ PDPA-safe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

type CardData = {
  status: string; product: string; warrantyYears: number;
  serial: string; vehicle: string; plate: string;
  dealer: string; install: string; expiry: string;
};

export const DigitalCardMock = ({ data, state = 'active' }: { data?: CardData; state?: 'active' | 'warn' | 'error' }) => {
  const d: CardData = data || {
    status: 'Active', product: 'NEXS Clear PPF · Pro', warrantyYears: 10,
    serial: 'PRO-1196MXY0401178Q', vehicle: 'Sedan · Pearl White', plate: '1กก ··3456',
    dealer: 'NEXS Authorized · Bangkok', install: '12 มี.ค. 2026', expiry: '12 มี.ค. 2036',
  };
  return (
    <div style={{
      borderRadius: 'var(--nexs-radius-lg)',
      background: 'linear-gradient(180deg, var(--nexs-dark-panel) 0%, #000 100%)',
      color: 'white', padding: 28,
      boxShadow: '0 30px 60px -20px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.08)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 40% at 80% 0%, rgba(215,25,32,0.14), transparent 70%)', pointerEvents: 'none' }}/>
      <div className="between" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 24, height: 24, borderRadius: 7, background: 'white', color: 'var(--nexs-ink)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 11 }}>N</span>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>NEXS</div>
            <div style={{ fontSize: 13, letterSpacing: '-0.005em' }}>Digital Warranty</div>
          </div>
        </div>
        <span className={`pill ${state === 'active' ? 'pill-active' : state === 'warn' ? 'pill-warn' : 'pill-error'}`}>
          <span className="dot"/>{d.status}
        </span>
      </div>

      <div style={{ position: 'relative', marginTop: 36, display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {d.product}
          </div>
          <div className="thai" style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
            Warranty up to {d.warrantyYears} years
          </div>
        </div>
        <div style={{ background: 'white', padding: 8, borderRadius: 10, lineHeight: 0 }}>
          <QrGlyph size={72}/>
        </div>
      </div>

      <div style={{ position: 'relative', marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, fontSize: 12 }}>
        <Field k="Serial Number" v={d.serial} mono/>
        <Field k="Vehicle" v={d.vehicle}/>
        <Field k="Dealer" v={d.dealer}/>
        <Field k="Plate" v={d.plate} mono/>
        <Field k="Install Date" v={d.install}/>
        <Field k="Expiry Date" v={d.expiry}/>
      </div>

      <div style={{ position: 'relative', marginTop: 28, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em' }}>
        <span>ID · {d.serial.slice(-6)}</span>
        <span>VERIFIED · {BRAND.handle.toUpperCase()}.COM</span>
      </div>
    </div>
  );
};

const Field = ({ k, v, mono }: { k: string; v: string; mono?: boolean }) => (
  <div>
    <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)', fontSize: 10 }}>{k}</div>
    <div style={{ marginTop: 4, fontFamily: mono ? 'var(--font-mono)' : 'inherit', fontSize: 13, color: 'white' }}>{v}</div>
  </div>
);

export const DealerInvite = () => {
  const go = useGo();
  return (
    <section className="section">
      <div className="container">
        <div className="grid-2" style={{ gap: 64, alignItems: 'center' }}>
          <div>
            <Eyebrow>Built for Professional Installers</Eyebrow>
            <h2 className="h-1 thai" style={{ marginTop: 14 }}>พาร์ทเนอร์ที่ร้านติดตั้งวางใจ เลือกง่าย ขายง่าย</h2>
            <p className="lede thai" style={{ marginTop: 16 }}>
              NEXS พร้อมสนับสนุนร้านติดตั้งด้วยระบบสินค้าที่ชัดเจน สื่อการขายที่พร้อมใช้งาน การอบรมมาตรฐาน และเครื่องมือที่ช่วยให้การแนะนำลูกค้าเป็นเรื่องง่ายขึ้น
            </p>
            <ul className="thai stack-12" style={{ listStyle: 'none', padding: 0, margin: '32px 0 0' }}>
              {['ไลน์สินค้าขายง่าย โครงสร้างชัดเจน',
                'อบรมและมาตรฐานการติดตั้ง',
                'สื่อการตลาดและภาพประกอบพร้อมใช้',
                'การดูแลหลังการขายที่ต่อเนื่อง'].map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: 'var(--nexs-ink)', fontSize: 15 }}>
                  <span style={{ color: 'var(--nexs-red)' }}><Icon name="check" size={18}/></span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="row" style={{ marginTop: 32, gap: 12 }}>
              <button className="btn btn-primary thai" onClick={() => go('for-dealers')}>{CTA.becomeDealer}</button>
              <button className="btn btn-ghost" onClick={() => go('contact')}>{CTA.dealerLogin}</button>
            </div>
          </div>
          <div>
            <ImgPh ratio="5/4" label="Installer · workshop · install detail"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export const QrProof = () => (
  <section className="section section-grey">
    <div className="container">
      <div className="grid-2" style={{ gap: 64, alignItems: 'center' }}>
        <div>
          <Eyebrow>Proof of Authenticity</Eyebrow>
          <h2 className="h-1 thai" style={{ marginTop: 14 }}>QR Code และ Serial Number ที่ตรวจสอบได้</h2>
          <p className="lede thai" style={{ marginTop: 16 }}>
            QR Code และ Serial บนบรรจุภัณฑ์ NEXS ช่วยให้ลูกค้าตรวจสอบสถานะสินค้าและบัตรรับประกันได้อย่างชัดเจน
            เมื่อ Dealer ลงทะเบียนการติดตั้งแล้ว ลูกค้าจะสามารถสแกนเพื่อดูข้อมูลบัตรรับประกันดิจิทัลได้ทันที
          </p>
        </div>
        <div className="card" style={{ padding: 32, background: 'var(--nexs-canvas)' }}>
          <div className="row" style={{ gap: 24, alignItems: 'flex-start' }}>
            <div style={{ background: 'white', padding: 14, borderRadius: 14, border: '1px solid var(--nexs-hairline)' }}>
              <QrGlyph size={120}/>
            </div>
            <div className="thai" style={{ flex: 1 }}>
              <div className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Serial Number</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, marginTop: 6 }}>PRO-1196MXY0401178Q</div>
              <div className="caption" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 18 }}>Status</div>
              <div style={{ marginTop: 6 }}>
                <span className="pill pill-active"><span className="dot"/>Active · ลงทะเบียนแล้ว</span>
              </div>
              <div style={{ borderTop: '1px solid var(--nexs-hairline)', marginTop: 20, paddingTop: 16, display: 'flex', gap: 18, fontSize: 13, color: 'var(--nexs-ink-muted)' }}>
                <div><strong style={{ color: 'var(--nexs-ink)' }}>NEXS Clear PPF · Pro</strong><br/>Warranty up to 10 years</div>
                <div><strong style={{ color: 'var(--nexs-ink)' }}>NEXS Authorized</strong><br/>Bangkok</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const ContactStrip = () => (
  <section className="section">
    <div className="container">
      <div style={{ maxWidth: 720, marginBottom: 48 }}>
        <Eyebrow>Let&apos;s Build Something Premium</Eyebrow>
        <h2 className="h-1 thai" style={{ marginTop: 14 }}>ขอใบเสนอราคา หรือคำแนะนำเลือกรุ่น</h2>
        <p className="lede thai" style={{ marginTop: 16 }}>
          ติดต่อทีม NEXS เพื่อสอบถามสินค้า นัดหมายติดตั้ง หรือสมัครเป็นตัวแทนจำหน่าย
        </p>
      </div>
      <ContactForm compact/>
    </div>
  </section>
);
