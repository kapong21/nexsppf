import { ColorPPFPage } from '@/components/matte-color';
import { seoFor } from '@/lib/seo';

export const metadata = seoFor('color-ppf', '/color-ppf');

export default function Page() {
  return <ColorPPFPage />;
}
