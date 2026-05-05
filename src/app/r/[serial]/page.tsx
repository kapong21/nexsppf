import { DIGITAL_WARRANTY_CARD_MOCKS } from '@/content/ui-skeleton';

export default async function DigitalWarrantyCardPage({ params }: { params: Promise<{ serial: string }> }) {
  const { serial } = await params;
  const decodedSerial = decodeURIComponent(serial).toUpperCase();
  const active = DIGITAL_WARRANTY_CARD_MOCKS[0];
  const notRegistered = DIGITAL_WARRANTY_CARD_MOCKS[1];
  const invalid = DIGITAL_WARRANTY_CARD_MOCKS[2];
  const card = decodedSerial.startsWith('INVALID') ? invalid : decodedSerial.startsWith('B-') ? notRegistered : active;

  return (
    <main className="site-shell">
      <section className="section">
        <div className="mock-phone">
          <div className="status-card">
            <img src="/nexs-logo.png" alt="NEXS" style={{ height: 36, width: 'auto' }} />
            <span className={`status-pill ${card.status}`}>{card.status}</span>
            <h1>{card.title}</h1>
            <p>{card.description}</p>
            <p>หมายเลข Serial: {card.serialCode ?? decodedSerial}</p>
            {card.productName && <p>รุ่นสินค้า: {card.productName}</p>}
            {card.warrantyYears && <p>ระยะรับประกัน: {card.warrantyYears} ปี</p>}
            {card.installDate && <p>วันที่ติดตั้ง: {card.installDate}</p>}
            {card.expiryDate && <p>วันหมดอายุ: {card.expiryDate}</p>}
            {card.dealerName && <p>ตัวแทนจำหน่าย: {card.dealerName}</p>}
            {card.vehicle && <p>รถ: {card.vehicle}</p>}
            {card.licensePlateMasked && <p>ทะเบียน: {card.licensePlateMasked}</p>}
            {card.customerPhoneMasked && <p>เบอร์โทร: {card.customerPhoneMasked}</p>}
            <div className="actions">
              <a className="button secondary" href="/support/inspection">
                ขอให้ตรวจสอบปัญหา
              </a>
              <a className="button secondary" href="/support/warranty">
                แจ้งบัตรรับประกันหรือ QR หาย
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
