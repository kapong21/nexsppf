import { LeadPanel, MarketingHero, ProductTierGrid } from '@/components/marketing/NexsMarketing';
import { getFilmCategory } from '@/content/final-product-content';
import { SEO_MATTE } from '@/data/seo';

export const metadata = SEO_MATTE;

export default function MattePpfPage() {
  const category = getFilmCategory('matte');
  return (
    <>
      <MarketingHero
        eyebrow={category.label}
        title={category.heroTitle}
        thaiTitle={category.heroThai}
        subcopy={category.heroSubcopy}
        primaryHref="/contact"
        primaryLabel="Book Consultation"
        secondaryHref="/compare"
        secondaryLabel="Compare Systems"
        tone="matte"
      />
      <ProductTierGrid category={category} />
      <LeadPanel title="ปรึกษาฟิล์มด้านสำหรับรถของคุณ" />
    </>
  );
}
