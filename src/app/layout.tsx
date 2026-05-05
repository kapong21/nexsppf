import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'NEXS PPF Digital Warranty',
  description: 'NEXS Paint Protection Film with QR-based warranty verification and Digital warranty card.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
