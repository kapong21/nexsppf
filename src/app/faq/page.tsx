import { FaqBlock, LeadPanel, MarketingHero } from '@/components/marketing/NexsMarketing';

export default function FaqPage() {
  return (
    <>
      <MarketingHero
        eyebrow="FAQ"
        title="NEXS PPF Questions"
        thaiTitle="คำถามสำคัญก่อนเลือกฟิล์ม NEXS"
        subcopy="คำตอบ public-safe สำหรับการเลือกระบบฟิล์ม การรับประกัน และการติดต่อทีมงาน NEXS"
        primaryHref="/contact"
        primaryLabel="Contact NEXS"
        secondaryHref="/products"
        secondaryLabel="Explore Products"
        tone="clear"
      />
      <FaqBlock />
      <LeadPanel title="ยังมีคำถามเพิ่มเติม?" />
    </>
  );
}
