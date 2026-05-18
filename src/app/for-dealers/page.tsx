import { LeadPanel, MarketingHero } from '@/components/marketing/NexsMarketing';
import { DEALER_BENEFITS } from '@/content/spec-v52';
import { SEO_DEALERS } from '@/data/seo';

export const metadata = SEO_DEALERS;

export default function ForDealersPage() {
  return (
    <>
      <MarketingHero
        eyebrow="Built for Professional Installers"
        title="Built for Installers. Designed for Growth."
        thaiTitle="พาร์ทเนอร์ที่ร้านติดตั้งวางใจ เลือกง่าย ขายง่าย"
        subcopy="NEXS พร้อมสนับสนุนร้านติดตั้งด้วยระบบสินค้าที่ชัดเจน สื่อการขายที่พร้อมใช้งาน การอบรมมาตรฐาน และเครื่องมือที่ช่วยให้การแนะนำลูกค้าเป็นเรื่องง่ายขึ้น"
        primaryHref="/contact"
        primaryLabel="Become a Dealer"
        secondaryHref="/login"
        secondaryLabel="Dealer Login"
        tone="dealer"
      />

      <section className="section section-tight">
        <div className="section-head">
          <div>
            <p className="eyebrow">Dealer Benefits</p>
            <h2>ทำไมร้านติดตั้งเลือกร่วมกับ NEXS</h2>
          </div>
        </div>
        <div className="premium-pillar-grid">
          {DEALER_BENEFITS.map((benefit, idx) => (
            <article className="premium-pillar" key={benefit.title}>
              <span aria-hidden>{`0${idx + 1}`}</span>
              <h3>{benefit.title}</h3>
              <p className="muted">{benefit.thai}</p>
              <p>{benefit.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <LeadPanel title="สมัครเป็นตัวแทนจำหน่าย NEXS" />
    </>
  );
}
