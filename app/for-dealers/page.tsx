import { DealerPage } from '@/components/dealer-contact-login';
import { seoFor } from '@/lib/seo';

export const metadata = seoFor('for-dealers', '/for-dealers');

export default function Page() {
  return <DealerPage />;
}
