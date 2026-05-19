import type { Metadata } from 'next';
import { SEO, type SeoRoute } from '@/data/seo';
import { BRAND } from '@/data/brand';

const SITE_URL = 'https://nexsppf.com';

export function seoFor(route: SeoRoute, path: string = ''): Metadata {
  const entry = SEO[route];
  const url = `${SITE_URL}${path}`;
  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url,
      siteName: BRAND.name,
      type: 'website',
      locale: 'th_TH',
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.description,
    },
  };
}

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NEXS — Engineered for Perfect Surfaces',
    template: '%s',
  },
  description: 'NEXS Paint Protection Film — ฟิล์มปกป้องผิวรถยนต์ระดับพรีเมียม Clear / Matte / Color PPF 12 ทางเลือก พร้อมบัตรรับประกันดิจิทัล',
  formatDetection: { telephone: false },
};
