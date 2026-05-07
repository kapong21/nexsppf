import { getImageSlot } from '@/content/image-assets';
import { SITE_COPY } from '@/content/site-content';

export default function DealerPage() {
  const visual = getImageSlot('dealer_installation_visual');
  return (
    <main className="site-shell">
      <section className="hero dealer-visual-panel"><div className="hero-copy"><p className="eyebrow">Dealer Program</p><h1>ร่วมเป็นตัวแทนจำหน่าย NEXS PPF</h1><p className="lead">ร้านติดตั้งสามารถยกระดับความน่าเชื่อถือของร้านด้วยระบบ Authorized Dealer, Digital Warranty, Serial / QR Verification และ workflow หลังการติดตั้งที่ตรวจสอบได้</p><div className="actions"><a className="button primary" href="/contact">{SITE_COPY.dealer.primaryCta}</a><a className="button secondary" href="/login">{SITE_COPY.dealer.secondaryCta}</a></div></div><div className={`hero-visual ${visual.layoutClass}`}>{visual.path && <img src={visual.path} alt={visual.alt} />}</div></section>
      <section className="section"><div className="section-head"><h2>ระบบสำหรับตัวแทนจำหน่าย</h2><p>ออกแบบเพื่อช่วยร้านติดตั้งสร้างความน่าเชื่อถือ จัดการข้อมูลงานติดตั้ง และให้บริการหลังการขายได้เป็นระบบ</p></div><div className="grid five">{SITE_COPY.dealer.benefits.map((benefit) => <article className="card" key={benefit}><h3>{benefit}</h3></article>)}</div></section>
      <section className="section trust-proof-section"><div className="section-head"><h2>Authorized Dealer และความน่าเชื่อถือของร้าน</h2><p>Dealer Program ช่วยให้ร้านสื่อสารกับลูกค้าได้ชัดเจนขึ้น ตั้งแต่การเลือกรุ่นสินค้าไปจนถึงการออก Digital Warranty</p></div><div className="grid three">{SITE_COPY.trustProof.map((proof) => <article className="card" key={proof.title}><h3>{proof.title}</h3><p>{proof.body}</p></article>)}</div><div className="actions"><a className="button primary" href="/contact">ขอข้อมูล Dealer Program</a></div></section>
      <section className="section inspection-process"><div className="section-head"><h2>FAQ และขั้นตอนตรวจสอบปัญหา</h2><p>ช่วยให้ Dealer อธิบายการลงทะเบียนและการตรวจสอบหลังการขายได้ตรงกัน</p></div><div className="grid three faq-grid">{SITE_COPY.faq.map((item) => <article className="card" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section>
    </main>
  );
}
