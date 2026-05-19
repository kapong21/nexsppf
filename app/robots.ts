import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // PDPA: warranty card detail pages contain customer data — never index
        disallow: ['/api/', '/warranty/'],
      },
    ],
    sitemap: 'https://nexsppf.com/sitemap.xml',
  };
}
