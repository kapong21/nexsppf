import { LeadPanel, MarketingHero, ProductTierGrid } from '@/components/marketing/NexsMarketing';
import { getFilmCategory } from '@/content/final-product-content';
import { SEO_COLOR } from '@/data/seo';

export const metadata = SEO_COLOR;

export default function ColorPpfPage() {
  const category = getFilmCategory('color');
  return (
    <>
      <MarketingHero
        eyebrow={category.label}
        title={category.heroTitle}
        thaiTitle={category.heroThai}
        subcopy={category.heroSubcopy}
        primaryHref="/contact"
        primaryLabel="Explore Colors"
        secondaryHref="/compare"
        secondaryLabel="Compare Systems"
        tone="color"
      />
      <ProductTierGrid category={category} />
      <LeadPanel title="Book a Color PPF consultation" />
    </>
  );
}
