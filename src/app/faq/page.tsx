import { LeadPanel, MarketingHero } from '@/components/marketing/NexsMarketing';
import { FAQ_ITEMS } from '@/content/final-product-content';

export default function FaqPage() {
  return (
    <>
      <MarketingHero
        eyebrow="FAQ"
        title="NEXS PPF Questions"
        thaiTitle="คำถามสำคัญก่อนเลือกฟิล์ม NEXS"
        subcopy="รวมคำตอบจาก Final Copy Lock เพื่ออธิบาย product warranty, lifetime, Matte PPF และ Color PPF"
        primaryHref="/contact"
        primaryLabel="Contact Us"
        secondaryHref="/products"
        secondaryLabel="Explore Products"
        tone="clear"
      />
      <section className="section section-tight">
        <div className="faq-list-preview full">
          {FAQ_ITEMS.map((item) => (
            <article className="faq-row" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
      <LeadPanel title="ยังมีคำถามเพิ่มเติม?" />
    </>
  );
}
