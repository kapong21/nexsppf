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
            <p>Serial: {card.serialCode ?? decodedSerial}</p>
            {card.productName && <p>Product: {card.productName}</p>}
            {card.warrantyYears && <p>Warranty: {card.warrantyYears} years</p>}
            {card.installDate && <p>Install date: {card.installDate}</p>}
            {card.expiryDate && <p>Expiry date: {card.expiryDate}</p>}
            {card.dealerName && <p>Dealer: {card.dealerName}</p>}
            {card.vehicle && <p>Vehicle: {card.vehicle}</p>}
            {card.licensePlateMasked && <p>License: {card.licensePlateMasked}</p>}
            {card.customerPhoneMasked && <p>Phone: {card.customerPhoneMasked}</p>}
            <div className="actions">
              <a className="button secondary" href="/support/inspection">
                Request inspection
              </a>
              <a className="button secondary" href="/support/warranty">
                Lost warranty support
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
