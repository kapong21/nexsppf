import { NextResponse, type NextRequest } from 'next/server';

// In-memory per-process rate limit. For multi-instance VPS or scaling out,
// swap for Redis/Upstash. Documented in deploy README.
const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimitHit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);
  if (!entry || entry.resetAt < now) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_PER_WINDOW) return true;
  entry.count += 1;
  return false;
}

type LeadBody = {
  consent?: boolean;
  formType?: string;
  [key: string]: unknown;
};

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (rateLimitHit(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }
  if (!body.consent) {
    return NextResponse.json({ ok: false, error: 'consent_required' }, { status: 400 });
  }

  // Structured server log — ready to forward to CRM/Slack/Sheets (TODO).
  // Logs do not include PII beyond what the user explicitly submitted with consent.
  console.log('[NEXS lead]', { ip, ts: new Date().toISOString(), ...body });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: 'leads' });
}
