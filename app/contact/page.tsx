import { ContactPage } from '@/components/dealer-contact-login';
import { seoFor } from '@/lib/seo';

export const metadata = seoFor('contact', '/contact');

export default function Page() {
  return <ContactPage />;
}
