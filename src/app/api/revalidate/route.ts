import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Sanity (or any CMS) webhook handler.
 *
 * Webhook setup: Sanity dashboard → API → Webhooks
 *   URL    = https://nexsppf.com/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *   Method = POST
 *
 * Any page/data using `fetch(..., { next: { tags: ['sanity'] } })` will be busted.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  const expected = process.env.SANITY_REVALIDATE_SECRET;

  if (expected && secret !== expected) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  // Next.js 16 — second arg is the cache profile name (or CacheLifeConfig).
  revalidateTag('sanity', 'default');
  return NextResponse.json({ ok: true, revalidated: 'sanity', ts: new Date().toISOString() });
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: 'revalidate' });
}
