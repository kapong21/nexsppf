import Script from 'next/script';
import { FaqPage } from '@/components/faq';
import { seoFor } from '@/lib/seo';
import { FAQ_PUBLIC } from '@/data/brand';
import { faqSchema } from '@/data/seo';

export const metadata = seoFor('faq', '/faq');

export default function Page() {
  return (
    <>
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ_PUBLIC)) }}
      />
      <FaqPage />
    </>
  );
}
