'use client';

import { useRouter } from 'next/navigation';
import { href } from './routes';

/**
 * Shim for legacy `go(route)` callsites from the Vite hash-router era.
 * Components keep their existing `onClick={() => go('clear-ppf')}` callsites
 * unchanged — just call `useGo()` instead of receiving `go` as a prop.
 */
export function useGo() {
  const router = useRouter();
  return (route: string) => router.push(href(route));
}
