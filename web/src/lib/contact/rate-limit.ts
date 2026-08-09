type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Simple per-instance rate limit. Good enough for basic abuse protection. */
export function hitRateLimit(key: string, limit = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || now > current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { ok: false as const, retryAfterSec: Math.ceil((current.resetAt - now) / 1000) };
  }

  current.count += 1;
  return { ok: true as const, remaining: limit - current.count };
}
