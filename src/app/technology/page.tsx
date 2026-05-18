import { LeadPanel, MarketingHero } from '@/components/marketing/NexsMarketing';
import { TECH_BENEFITS, TECH_LAYERS } from '@/content/spec-v52';
import { SEO_TECHNOLOGY } from '@/data/seo';

export const metadata = SEO_TECHNOLOGY;

export default function TechnologyPage() {
  return (
    <>
      <MarketingHero
        eyebrow="Advanced Film Technology"
        title="The Technology Behind the Finish"
        thaiTitle="เทคโนโลยีเบื้องหลังผิวสัมผัสระดับพรีเมียม"
        subcopy="NEXS พัฒนาโครงสร้างฟิล์มหลายชั้นให้ทำงานร่วมกันอย่างแม่นยำ ตั้งแต่ขั้นซ่อมรอย ขั้น TPU ขั้นกาว ไปจนถึง release liner เพื่อให้ได้ finish ที่ใส เรียบเนียน ทนทาน และติดตั้งได้อย่างมั่นใจ"
        primaryHref="/compare"
        primaryLabel="Compare Film Systems"
        secondaryHref="/contact"
        secondaryLabel="Talk to NEXS"
        tone="clear"
      />

      <section className="section section-tight">
        <div className="section-head">
          <div>
            <p className="eyebrow">Layer Stack</p>
            <h2>4 ชั้นที่ออกแบบให้ทำงานร่วมกัน</h2>
          </div>
          <p>โครงสร้างฟิล์มหลายชั้น ตั้งแต่ผิวบนสุดที่ช่วยลดรอยขนแมว ไปจนถึง release liner ที่ทำให้การติดตั้งสะอาด</p>
        </div>
        <div className="premium-pillar-grid">
          {TECH_LAYERS.map((layer) => (
            <article className="premium-pillar" key={layer.layer}>
              <span aria-hidden>{`0${layer.layer}`}</span>
              <h3>{layer.title}</h3>
              <p className="muted">{layer.thai}</p>
              <p>{layer.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tight">
        <div className="section-head">
          <div>
            <p className="eyebrow">Performance Features</p>
            <h2>เทคโนโลยีที่ทำงานในทุกวันที่คุณขับ</h2>
          </div>
        </div>
        <div className="premium-pillar-grid">
          {TECH_BENEFITS.map((benefit) => (
            <article className="premium-pillar" key={benefit.title}>
              <span />
              <h3>{benefit.title}</h3>
              <p className="muted">{benefit.thai}</p>
              <p>{benefit.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <LeadPanel title="ต้องการคำแนะนำด้านระบบฟิล์ม NEXS" />
    </>
  );
}
