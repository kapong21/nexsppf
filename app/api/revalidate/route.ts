import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Sanity webhook handler. Sanity dashboard sends a POST when content changes;
 * we revalidate the `sanity` tag, which busts every page that called
 * `safeFetch()` (see lib/sanity/queries.ts).
 *
 * Webhook setup: Sanity dashboard → API → Webhooks → URL = /api/revalidate
 *                Secret = SANITY_REVALIDATE_SECRET (compared against `?secret=`).
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (process.env.SANITY_REVALIDATE_SECRET && secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  revalidateTag('sanity');
  return NextResponse.json({ ok: true, revalidated: 'sanity', ts: new Date().toISOString() });
}
