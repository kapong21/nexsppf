import type { MetadataRoute } from 'next';

const BASE = 'https://nexsppf.com';

const STATIC_PATHS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/clear-ppf', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/matte-ppf', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/color-ppf', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/technology', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/compare', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/for-dealers', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/warranty', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/support/warranty', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/support/inspection', priority: 0.5, changeFrequency: 'monthly' },
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
