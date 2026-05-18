// PII-redacting logger for Server Actions. Email addresses and phone-like
// digit runs are masked before anything reaches stdout / Vercel logs.

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const PHONE_RE = /(?:\+?\d[\s\-()]?){8,}\d/g;

export function redactPII(value: unknown): string {
  let text: string;
  if (value instanceof Error) text = `${value.name}: ${value.message}`;
  else if (typeof value === 'string') text = value;
  else {
    try {
      text = JSON.stringify(value);
    } catch {
      text = String(value);
    }
  }
  return text.replace(EMAIL_RE, '<email>').replace(PHONE_RE, '<phone>');
}

export function safeError(label: string, err: unknown): void {
  console.error(`[${label}] ${redactPII(err)}`);
}
