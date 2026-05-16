import { LeadPanel, MarketingHero } from '@/components/marketing/NexsMarketing';

const benefits = [
  'ลงทะเบียนบัตรรับประกันให้ลูกค้า',
  'ตรวจสอบ Serial / QR Code',
  'ดูประวัติงานติดตั้งของร้าน',
  'บันทึกการดูแลหลังการติดตั้ง',
  'เพิ่มความน่าเชื่อถือให้ร้านติดตั้ง',
] as const;

export default function ForDealersPage() {
  return (
    <>
      <MarketingHero
        eyebrow="For Dealers"
        title="Build Trust with NEXS"
        thaiTitle="สำหรับตัวแทนจำหน่ายและร้านติดตั้ง"
        subcopy="เข้าร่วมระบบ NEXS เพื่อยกระดับงานติดตั้ง การลงทะเบียน Digital Warranty และบริการหลังการขายที่ตรวจสอบได้"
        primaryHref="/contact"
        primaryLabel="Apply as Dealer"
        secondaryHref="/login"
        secondaryLabel="Dealer Login"
        tone="dealer"
      />
      <section className="section section-tight">
        <div className="premium-pillar-grid">
          {benefits.map((benefit) => (
            <article className="premium-pillar" key={benefit}>
              <span />
              <h3>{benefit}</h3>
              <p>ออกแบบเพื่อให้ร้านติดตั้งมี workflow ที่ชัดเจน และลูกค้าตรวจสอบข้อมูลหลังติดตั้งได้ง่ายขึ้น</p>
            </article>
          ))}
        </div>
      </section>
      <LeadPanel title="สมัครเป็นตัวแทนจำหน่าย NEXS" />
    </>
  );
}
