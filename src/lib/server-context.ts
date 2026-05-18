// Pulls client IP and User-Agent off the inbound request headers so Server
// Actions can attribute submissions for abuse review. Split into a pure
// `fromHeaders` (testable with a synthetic `Headers`) and a Next.js wrapper.

const TRUSTED_IP_HEADERS = ['x-forwarded-for', 'x-real-ip', 'fly-client-ip', 'cf-connecting-ip'];

export function clientContextFromHeaders(h: Headers): {
  ipAddress?: string;
  userAgent?: string;
} {
  let ipAddress: string | undefined;
  for (const name of TRUSTED_IP_HEADERS) {
    const value = h.get(name);
    if (!value) continue;
    const first = value.split(',')[0]?.trim();
    if (first) {
      ipAddress = first;
      break;
    }
  }
  const userAgent = h.get('user-agent')?.slice(0, 512) ?? undefined;
  return { ipAddress, userAgent };
}

export async function getClientContext(): Promise<{
  ipAddress?: string;
  userAgent?: string;
}> {
  const { headers } = await import('next/headers');
  return clientContextFromHeaders(await headers());
}
