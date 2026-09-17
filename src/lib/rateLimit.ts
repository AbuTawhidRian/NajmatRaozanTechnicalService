/**
 * Simple in-memory IP rate limiter.
 * Resets on server restart. Suitable for single-server / Docker deployments.
 * For multi-server setups, replace with Upstash Redis.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/**
 * Check whether the given key (usually an IP address) has exceeded the limit.
 * @param key       Unique identifier, typically the client IP.
 * @param limit     Max number of requests allowed in the window.
 * @param windowMs  Time window in milliseconds.
 * @returns `{ allowed: boolean; remaining: number; resetAt: number }`
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  let entry = store.get(key);

  // Reset expired window
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs };
    store.set(key, entry);
  }

  entry.count += 1;

  const remaining = Math.max(0, limit - entry.count);
  const allowed = entry.count <= limit;

  return { allowed, remaining, resetAt: entry.resetAt };
}

// Periodically prune expired entries to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(key);
    }
  }, 5 * 60 * 1000); // every 5 minutes
}
