import { FaqBlock, LeadPanel, MarketingHero } from '@/components/marketing/NexsMarketing';
import { FAQ_ITEMS } from '@/content/final-product-content';
import { SEO_FAQ, faqSchemaLD } from '@/data/seo';

export const metadata = SEO_FAQ;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchemaLD(FAQ_ITEMS)),
        }}
      />
      <LeadPanel title="ยังมีคำถามเพิ่มเติม?" />
    </>
  );
}
