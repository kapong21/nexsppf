// In-memory rate limiter for public Server Actions.
//
// Two enforced limits per key:
//   - minIntervalMs — minimum wait between two consecutive hits
//   - maxPerHour    — sliding-window cap inside the trailing hour
//
// `now` is injected so tests can drive deterministic time without timers.
// `clock()` defaults to `Date.now`. Buckets are pruned opportunistically.
//
// Production note: this lives in the function process memory, so each VPS
// instance has its own view. For nexsppf-web today (single-VPS Docker)
// that is the entire perimeter; if we add replicas later, swap the backing
// store for Redis without changing the call sites.

export type RateLimitConfig = {
  minIntervalMs: number;
  maxPerHour: number;
};

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; reason: 'too_soon' | 'hourly_cap'; retryAfterMs: number };

export type RateLimiter = {
  check(key: string, now?: number): RateLimitResult;
  reset(key?: string): void;
};

const HOUR_MS = 60 * 60 * 1000;

export function createRateLimiter(config: RateLimitConfig, clock: () => number = Date.now): RateLimiter {
  const hits = new Map<string, number[]>();

  function prune(timestamps: number[], cutoff: number): number[] {
    let i = 0;
    while (i < timestamps.length && timestamps[i] < cutoff) i++;
    return i === 0 ? timestamps : timestamps.slice(i);
  }

  return {
    check(key, now = clock()): RateLimitResult {
      const cutoff = now - HOUR_MS;
      const previous = hits.get(key) ?? [];
      const recent = prune(previous, cutoff);

      const last = recent[recent.length - 1];
      if (last !== undefined && now - last < config.minIntervalMs) {
        return {
          allowed: false,
          reason: 'too_soon',
          retryAfterMs: config.minIntervalMs - (now - last),
        };
      }

      if (recent.length >= config.maxPerHour) {
        const oldest = recent[0];
        return {
          allowed: false,
          reason: 'hourly_cap',
          retryAfterMs: HOUR_MS - (now - oldest),
        };
      }

      recent.push(now);
      hits.set(key, recent);
      return { allowed: true };
    },
    reset(key) {
      if (key === undefined) hits.clear();
      else hits.delete(key);
    },
  };
}

// Default singleton for Server Actions. Five-second minimum + ten/hour
// per (IP, form-type) key — generous for humans, instantly rejects bots
// that hammer the form. Lives for the lifetime of the function process.
export const publicFormRateLimiter = createRateLimiter({
  minIntervalMs: 5_000,
  maxPerHour: 10,
});
