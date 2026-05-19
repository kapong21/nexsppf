import { ComparePage } from '@/components/compare';
import { seoFor } from '@/lib/seo';

export const metadata = seoFor('compare', '/compare');

export default function Page() {
  return <ComparePage />;
}
