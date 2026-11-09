/**
 * Small in-memory rate limiter for form endpoints.
 * Good enough for a single Node instance; use the host's edge/WAF rules when the
 * app runs on more than one instance.
 */
const buckets = new Map();

export function rateLimit(key, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count };
}

// Keep the map from growing without bound in long-running processes.
if (typeof globalThis !== "undefined") {
  globalThis.__tactyqalRateLimitSweep ??= setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(key);
    }
  }, 120_000);
  globalThis.__tactyqalRateLimitSweep.unref?.();
}
