import { CategoryOverview, ComparisonMatrix, LeadPanel, MarketingHero } from '@/components/marketing/NexsMarketing';

export default function ProductsPage() {
  return (
    <>
      <MarketingHero
        eyebrow="Film Systems"
        title="Choose Your Film System"
        thaiTitle="ฟิล์มรถยนต์ระดับพรีเมียม 3 กลุ่ม 12 ทางเลือก"
        subcopy="เปรียบเทียบ Clear PPF, Matte PPF และ Color PPF จากโครงสินค้า public-safe พร้อมแนวทางเลือกรุ่น"
        primaryHref="/clear-ppf"
        primaryLabel="Explore Clear PPF"
        secondaryHref="/compare"
        secondaryLabel="Compare All"
        tone="color"
      />
      <CategoryOverview />
      <ComparisonMatrix />
      <LeadPanel title="ให้ NEXS ช่วยเลือกระบบฟิล์มที่เหมาะกับรถของคุณ" />
    </>
  );
}
