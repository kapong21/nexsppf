import { AboutPage } from '@/components/about';
import { seoFor } from '@/lib/seo';

export const metadata = seoFor('about-nexs', '/about');

export default function Page() {
  return <AboutPage />;
}
