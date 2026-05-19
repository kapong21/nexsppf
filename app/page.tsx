import { Home } from '@/components/home';
import { seoFor } from '@/lib/seo';

export const metadata = seoFor('home', '/');

export default function Page() {
  return <Home />;
}
