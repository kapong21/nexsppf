import { WarrantyLookupPage } from '@/components/warranty';
import { seoFor } from '@/lib/seo';

export const metadata = seoFor('warranty', '/warranty');

export default function Page() {
  return <WarrantyLookupPage />;
}
