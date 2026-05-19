import { TechnologyPage } from '@/components/technology';
import { seoFor } from '@/lib/seo';

export const metadata = seoFor('technology', '/technology');

export default function Page() {
  return <TechnologyPage />;
}
