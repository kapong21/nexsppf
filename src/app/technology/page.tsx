import { LeadPanel, MarketingHero } from '@/components/marketing/NexsMarketing';

const blocks = [
  ['Film Architecture', 'โครงสร้างฟิล์มถูกนำเสนอด้วยภาพ layer ที่สะอาด ไม่มีข้อความฝังในภาพ และแยก label ผ่าน UI เพื่อแก้ไขได้'],
  ['Surface Finish', 'เลือกภาพและคำอธิบายที่ช่วยให้เข้าใจผิวใส ผิวด้าน และผิวสี โดยไม่ใส่คำกล่าวอ้างเกินอนุมัติ'],
  ['Dealer Workflow', 'ระบบการติดตั้งและหลังการขายเชื่อมกับ Dealer/Admin เพื่อให้ข้อมูลรับประกันปลอดภัยและตรวจสอบได้'],
] as const;

export default function TechnologyPage() {
  return (
    <>
      <MarketingHero
        eyebrow="Technology"
        title="Precision Film Architecture"
        thaiTitle="ระบบฟิล์มที่เล่าให้เข้าใจง่ายและตรวจสอบได้"
        subcopy="หน้านี้เตรียมพื้นที่สำหรับอธิบายโครงสร้างฟิล์มและระบบบริการด้วยภาษาที่ public-safe ก่อนอนุมัติ claim เชิงเทคนิคเพิ่มเติม"
        primaryHref="/compare"
        primaryLabel="Compare Film Systems"
        secondaryHref="/contact"
        secondaryLabel="Talk to NEXS"
        tone="clear"
      />
      <section className="section section-tight">
        <div className="premium-pillar-grid">
          {blocks.map(([title, body]) => (
            <article className="premium-pillar" key={title}>
              <span />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <LeadPanel title="ต้องการคำแนะนำด้านระบบฟิล์ม NEXS" />
    </>
  );
}
