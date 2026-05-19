import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { ROOT_METADATA } from '@/lib/seo';
import { ORGANIZATION_LD } from '@/data/seo';
import { ChromeShell } from '@/components/chrome';
import { LegacyHashRedirect } from '@/components/legacy-hash-redirect';
import './globals.css';

export const metadata: Metadata = ROOT_METADATA;

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_LD) }}
        />
      </head>
      <body>
        <LegacyHashRedirect />
        <ChromeShell>{children}</ChromeShell>
      </body>
    </html>
  );
}
