import { MattePPFPage } from '@/components/matte-color';
import { seoFor } from '@/lib/seo';

export const metadata = seoFor('matte-ppf', '/matte-ppf');

export default function Page() {
  return <MattePPFPage />;
}
