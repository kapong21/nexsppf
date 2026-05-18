import { describe, expect, it } from 'vitest';
import { clientContextFromHeaders } from '@/lib/server-context';

describe('server-context — clientContextFromHeaders', () => {
  it('reads x-forwarded-for and takes the first hop as the client IP', () => {
    const headers = new Headers({
      'x-forwarded-for': '203.0.113.5, 10.0.0.1, 10.0.0.2',
      'user-agent': 'Mozilla/5.0',
    });
    const ctx = clientContextFromHeaders(headers);
    expect(ctx.ipAddress).toBe('203.0.113.5');
    expect(ctx.userAgent).toBe('Mozilla/5.0');
  });

  it('falls back to x-real-ip when x-forwarded-for is absent', () => {
    const headers = new Headers({ 'x-real-ip': '203.0.113.6' });
    expect(clientContextFromHeaders(headers).ipAddress).toBe('203.0.113.6');
  });

  it('prefers cf-connecting-ip / fly-client-ip too', () => {
    const headers = new Headers({ 'cf-connecting-ip': '203.0.113.7' });
    expect(clientContextFromHeaders(headers).ipAddress).toBe('203.0.113.7');
  });

  it('returns undefined when no IP header is present', () => {
    const ctx = clientContextFromHeaders(new Headers());
    expect(ctx.ipAddress).toBeUndefined();
    expect(ctx.userAgent).toBeUndefined();
  });

  it('truncates absurdly long user-agent strings to 512 chars', () => {
    const huge = 'A'.repeat(2_000);
    const ctx = clientContextFromHeaders(new Headers({ 'user-agent': huge }));
    expect(ctx.userAgent?.length).toBe(512);
  });
});
