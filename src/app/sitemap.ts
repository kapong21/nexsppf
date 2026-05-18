import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://nexsppf.com';

const ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: 'clear-ppf', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'matte-ppf', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'color-ppf', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'products', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'technology', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'compare', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'for-dealers', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'about-nexs', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'warranty', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'warranty-policy', priority: 0.5, changeFrequency: 'monthly' },
  { path: 'privacy', priority: 0.3, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path === '' ? `${baseUrl}/` : `${baseUrl}/${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
