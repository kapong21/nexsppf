import { describe, expect, it } from 'vitest';
import { createRateLimiter } from '@/lib/rate-limit';

describe('rate-limit — createRateLimiter', () => {
  it('allows the first hit on a fresh key', () => {
    const rl = createRateLimiter({ minIntervalMs: 5_000, maxPerHour: 10 });
    expect(rl.check('user-a', 1_000).allowed).toBe(true);
  });

  it('rejects a second hit inside the minimum interval', () => {
    const rl = createRateLimiter({ minIntervalMs: 5_000, maxPerHour: 10 });
    rl.check('user-a', 1_000);
    const result = rl.check('user-a', 3_000);
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.reason).toBe('too_soon');
      expect(result.retryAfterMs).toBe(3_000);
    }
  });

  it('permits a second hit once the minimum interval has elapsed', () => {
    const rl = createRateLimiter({ minIntervalMs: 5_000, maxPerHour: 10 });
    rl.check('user-a', 1_000);
    expect(rl.check('user-a', 6_001).allowed).toBe(true);
  });

  it('isolates keys — different IP / form-type counts independently', () => {
    const rl = createRateLimiter({ minIntervalMs: 5_000, maxPerHour: 10 });
    rl.check('ip-a|contact', 1_000);
    expect(rl.check('ip-a|quote', 1_000).allowed).toBe(true);
    expect(rl.check('ip-b|contact', 1_000).allowed).toBe(true);
  });

  it('blocks at the hourly cap', () => {
    const rl = createRateLimiter({ minIntervalMs: 0, maxPerHour: 3 });
    rl.check('flood', 0);
    rl.check('flood', 1);
    rl.check('flood', 2);
    const result = rl.check('flood', 3);
    expect(result.allowed).toBe(false);
    if (!result.allowed) expect(result.reason).toBe('hourly_cap');
  });

  it('forgets hits older than one hour (sliding window)', () => {
    const rl = createRateLimiter({ minIntervalMs: 0, maxPerHour: 2 });
    rl.check('window', 0);
    rl.check('window', 1);
    expect(rl.check('window', 2).allowed).toBe(false);
    // Sixty-one minutes later — the two old hits have fallen out of the window.
    expect(rl.check('window', 61 * 60 * 1000).allowed).toBe(true);
  });

  it('reset() clears a single key without affecting others', () => {
    const rl = createRateLimiter({ minIntervalMs: 5_000, maxPerHour: 10 });
    rl.check('a', 1_000);
    rl.check('b', 1_000);
    rl.reset('a');
    expect(rl.check('a', 1_500).allowed).toBe(true);
    expect(rl.check('b', 1_500).allowed).toBe(false);
  });
});
