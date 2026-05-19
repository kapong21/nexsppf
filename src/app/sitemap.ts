import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://nexsppf.com';

const STATIC_PATHS: ReadonlyArray<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}> = [
  // Brand / marketing — high priority
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/products', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/clear-ppf', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/matte-ppf', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/color-ppf', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/technology', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/compare', priority: 0.8, changeFrequency: 'monthly' },

  // Information
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about-nexs', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },

  // Dealer / sales
  { path: '/for-dealers', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/dealer', priority: 0.6, changeFrequency: 'monthly' },

  // Warranty (public lookup form — not the [serial] detail)
  { path: '/warranty', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/warranty-policy', priority: 0.5, changeFrequency: 'yearly' },

  // Support
  { path: '/support/warranty', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/support/inspection', priority: 0.5, changeFrequency: 'monthly' },

  // Legal
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return STATIC_PATHS.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
