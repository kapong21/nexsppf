'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { href } from '@/lib/routes';

/**
 * Catches old Vite hash routes (e.g. /#about-nexs, /#warranty-card/SERIAL/STATE)
 * and rewrites them to the new clean paths. Sits in root layout so it covers
 * every page. Critical for warranty QR backwards-compat.
 */
export function LegacyHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const wc = hash.match(/^warranty-card\/([^/]+)\/([^/]+)$/);
    if (wc) {
      const [, serial, state] = wc;
      router.replace(`/warranty/${encodeURIComponent(serial)}/${state}`);
      return;
    }

    const target = href(hash);
    if (target && target !== `/${hash}`) {
      router.replace(target);
    } else if (hash !== 'home') {
      router.replace(target);
    } else {
      router.replace('/');
    }
  }, [router]);
  return null;
}
