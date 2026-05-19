import type { Metadata } from 'next';
import { WarrantyCardPage } from '@/components/warranty';

// PDPA — warranty cards must NEVER be cached, even per-region
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Digital Warranty Card — NEXS',
  description: 'NEXS digital warranty card lookup',
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ serial: string; state: string }> }) {
  const { serial, state } = await params;
  return <WarrantyCardPage serial={decodeURIComponent(serial)} state={state} />;
}
