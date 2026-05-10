import { BrandMark, Pill, QrGlyph } from '../../preview-redesign/variant-b-preview';

type CardState = 'active' | 'not-registered' | 'invalid';

function classifySerial(serial: string): CardState {
  if (serial.startsWith('INVALID')) return 'invalid';
  if (serial.startsWith('B-')) return 'not-registered';
  return 'active';
}

export default async function DigitalWarrantyCardPage({
  params,
}: {
  params: Promise<{ serial: string }>;
}) {
  const { serial } = await params;
  const decoded = decodeURIComponent(serial).toUpperCase();
  const state = classifySerial(decoded);

  return (
    <main className="variant-b-shell variant-b-warranty-card-shell">
      <div className="variant-b-warranty-card-wrap">
        <a href="/warranty" className="variant-b-warranty-card-back">
          ← กลับไปยังหน้าตรวจสอบ
        </a>
        {state === 'active' && <ActiveCard serial={decoded} />}
        {state === 'not-registered' && <NotRegisteredCard serial={decoded} />}
        {state === 'invalid' && <InvalidCard serial={decoded} />}
      </div>
    </main>
  );
}

function ActiveCard({ serial }: { serial: string }) {
  return (
    <>
      <DigitalCard serial={serial} />
      <div className="variant-b-warranty-card-timeline">
        <p className="variant-b-eyebrow">Care Timeline</p>
        <div className="variant-b-warranty-timeline-rows">
          {(
            [
              ['12 มี.ค. 2026', 'ลงทะเบียนการติดตั้ง', 'NEXS Authorized · Bangkok'],
              ['18 พ.ค. 2026', 'ตรวจสอบหลังติดตั้ง 60 วัน', 'ผ่านการตรวจสอบ'],
            ] as const
          ).map(([date, title, by]) => (
            <div key={date} className="variant-b-warranty-timeline-row">
              <span className="variant-b-warranty-timeline-date">{date}</span>
              <div>
                <strong>{title}</strong>
                <span>{by}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="variant-b-warranty-card-actions">
        <a className="variant-b-button primary" href="/support/inspection">
          ขอตรวจสอบปัญหา
        </a>
        <a className="variant-b-button secondary" href="/support/warranty">
          แจ้งบัตร / QR สูญหาย
        </a>
      </div>
      <p className="variant-b-warranty-card-pdpa">
        ข้อมูลที่แสดงเป็นแบบ PDPA-safe เบอร์โทรและทะเบียนรถบางส่วนถูกซ่อนเพื่อความปลอดภัย
      </p>
    </>
  );
}

function DigitalCard({ serial }: { serial: string }) {
  return (
    <aside className="variant-b-warranty-phone variant-b-warranty-phone-large" aria-label="Digital Warranty Card">
      <div className="variant-b-phone-bar">
        <BrandMark tone="light" />
        <Pill tone="active">Active</Pill>
      </div>
      <div className="variant-b-warranty-headline">
        <div>
          <p className="variant-b-warranty-product">NEXS PRO</p>
          <p className="variant-b-warranty-years">รับประกัน 8 ปี</p>
        </div>
        <div className="variant-b-warranty-qr" aria-hidden>
          <QrGlyph size={72} />
        </div>
      </div>
      <dl>
        <div>
          <dt>Serial</dt>
          <dd>{serial}</dd>
        </div>
        <div>
          <dt>Vehicle</dt>
          <dd>Sedan · Pearl White</dd>
        </div>
        <div>
          <dt>Dealer</dt>
          <dd>NEXS Authorized · Bangkok</dd>
        </div>
        <div>
          <dt>Plate</dt>
          <dd>1กก ··3456</dd>
        </div>
        <div>
          <dt>Install Date</dt>
          <dd>12 มี.ค. 2026</dd>
        </div>
        <div>
          <dt>Expiry Date</dt>
          <dd>12 มี.ค. 2034</dd>
        </div>
      </dl>
      <div className="variant-b-warranty-foot">
        <span>ID · {serial.slice(-6)}</span>
        <span>VERIFIED · NEXSPPF.COM</span>
      </div>
    </aside>
  );
}

function NotRegisteredCard({ serial }: { serial: string }) {
  return (
    <div className="variant-b-warranty-state-card">
      <div className="variant-b-warranty-state-pill">
        <Pill tone="warn">Serial Found · ยังไม่ลงทะเบียน</Pill>
      </div>
      <h2>Serial นี้อยู่ในระบบแล้ว แต่ยังไม่ได้ลงทะเบียนการติดตั้ง</h2>
      <p>
        Serial <span className="variant-b-warranty-state-mono">{serial}</span> ถูกผลิตและบันทึกในระบบ NEXS
        แต่ยังไม่มีตัวแทนจำหน่ายลงทะเบียนการติดตั้งกับลูกค้า
      </p>
      <div className="variant-b-warranty-state-note">
        <p className="variant-b-eyebrow">หากคุณติดตั้งแล้ว</p>
        <ol>
          <li>ติดต่อตัวแทนจำหน่ายที่ทำการติดตั้งให้ลงทะเบียนบัตรรับประกัน</li>
          <li>หากไม่สามารถติดต่อ dealer ได้ ส่งคำขอผ่าน &ldquo;แจ้งบัตร / QR สูญหาย&rdquo;</li>
        </ol>
      </div>
      <div className="variant-b-warranty-state-actions">
        <a className="variant-b-button primary" href="/support/warranty">
          ส่งคำขอตรวจสอบ
        </a>
        <a className="variant-b-button secondary" href="/contact">
          ติดต่อ NEXS
        </a>
      </div>
    </div>
  );
}

function InvalidCard({ serial }: { serial: string }) {
  return (
    <div className="variant-b-warranty-state-card">
      <div className="variant-b-warranty-state-pill">
        <Pill tone="error">Invalid · Not Found</Pill>
      </div>
      <h2>ไม่พบ Serial นี้ในระบบ NEXS</h2>
      <p>
        <span className="variant-b-warranty-state-mono">{serial}</span> ไม่ปรากฏในระบบ
        อาจเกิดจากการพิมพ์ผิด หรือสินค้าไม่ใช่ของ NEXS แท้
      </p>
      <p className="variant-b-warranty-state-fineprint">
        หมายเหตุ: การไม่พบ Serial ไม่ได้ยืนยันทันทีว่าสินค้าเป็นของปลอม กรุณาติดต่อทีมงานเพื่อยืนยัน
      </p>
      <div className="variant-b-warranty-state-actions">
        <a className="variant-b-button primary" href="/contact">
          ติดต่อทีมงาน
        </a>
        <a className="variant-b-button secondary" href="/warranty">
          กรอก Serial ใหม่
        </a>
      </div>
    </div>
  );
}
