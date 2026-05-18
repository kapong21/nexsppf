import { LeadPanel, MarketingHero } from '@/components/marketing/NexsMarketing';
import { BRAND_STORY, NEXS_STANDARD } from '@/content/spec-v52';
import { SEO_ABOUT } from '@/data/seo';

export const metadata = SEO_ABOUT;

export default function AboutNexsPage() {
  return (
    <>
      <MarketingHero
        eyebrow="About NEXS"
        title="A Higher Standard for Invisible Surfaces."
        thaiTitle="ผิวรถที่สมบูรณ์แบบเริ่มจากรายละเอียดที่มองแทบไม่เห็น"
        subcopy="NEXS จัดวางสินค้า ภาพลักษณ์ และระบบรับประกันให้ลูกค้าเข้าใจง่ายตั้งแต่ก่อนติดตั้งจนถึงหลังการขาย"
        primaryHref="/products"
        primaryLabel="Explore Products"
        secondaryHref="/contact"
        secondaryLabel="Contact NEXS"
        tone="dealer"
      />

      <section className="section section-tight">
        <div className="section-head">
          <div>
            <p className="eyebrow">Brand Story</p>
            <h2>Think New. Think NEXS.</h2>
          </div>
        </div>
        <div className="brand-story">
          {BRAND_STORY.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section section-tight">
        <div className="section-head">
          <div>
            <p className="eyebrow">The NEXS Standard</p>
            <h2>มาตรฐานที่ทำให้ลูกค้าและร้านติดตั้งวางใจ</h2>
          </div>
        </div>
        <div className="premium-pillar-grid">
          {NEXS_STANDARD.map((card, idx) => (
            <article className="premium-pillar" key={card.title}>
              <span aria-hidden>{`0${idx + 1}`}</span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <LeadPanel title="Talk to NEXS" />
    </>
  );
}
