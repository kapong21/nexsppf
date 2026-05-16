import { ComparisonMatrix, LeadPanel, MarketingHero } from '@/components/marketing/NexsMarketing';

export default function ComparePage() {
  return (
    <>
      <MarketingHero
        eyebrow="Compare"
        title="Compare NEXS Film Systems"
        thaiTitle="เปรียบเทียบ Clear, Matte และ Color PPF ในที่เดียว"
        subcopy="ดูโครงสินค้า 12 ทางเลือกจากข้อมูล public-safe เพื่อคุยกับทีม NEXS หรือ installer ได้ง่ายขึ้น"
        primaryHref="/contact"
        primaryLabel="Talk to an Expert"
        secondaryHref="/products"
        secondaryLabel="Back to Products"
        tone="carbon"
      />
      <ComparisonMatrix />
      <LeadPanel title="ให้ทีมงานช่วยแนะนำรุ่นที่เหมาะกับรถของคุณ" />
    </>
  );
}
