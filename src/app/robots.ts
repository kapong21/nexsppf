import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://nexsppf.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // PDPA + ops: customer warranty cards, dealer/admin consoles, drafts
        disallow: [
          '/api/',
          '/r/',
          '/admin',
          '/login',
          '/dealer',
          '/studio',
          '/preview',
          '/preview-redesign',
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
