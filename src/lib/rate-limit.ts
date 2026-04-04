const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const lockoutMap = new Map<string, { until: number; failures: number }>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetTime) rateLimitMap.delete(key);
  }
  for (const [key, entry] of lockoutMap) {
    if (now > entry.until && entry.until > 0) lockoutMap.delete(key);
  }
}, 5 * 60 * 1000);

export function rateLimit(
  ip: string,
  limit = 10,
  windowMs = 60_000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  entry.count++;
  if (entry.count > limit) {
    return { allowed: false, remaining: 0 };
  }
  return { allowed: true, remaining: limit - entry.count };
}

/**
 * Progressive lockout for login.
 * 5 failures → 1 min, 10 → 15 min, 15+ → 1 hour
 */
export function loginRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const lockout = lockoutMap.get(ip);

  if (lockout && lockout.until > 0 && now < lockout.until) {
    return { allowed: false, retryAfterMs: lockout.until - now };
  }

  const { allowed } = rateLimit(`login:${ip}`, 5, 5 * 60 * 1000);
  if (!allowed) {
    const failures = (lockout?.failures || 0) + 1;
    let lockMs = 60_000;
    if (failures >= 15) lockMs = 60 * 60 * 1000;
    else if (failures >= 10) lockMs = 15 * 60 * 1000;

    lockoutMap.set(ip, { until: now + lockMs, failures });
    return { allowed: false, retryAfterMs: lockMs };
  }

  return { allowed: true, retryAfterMs: 0 };
}

export function recordLoginFailure(ip: string): void {
  const existing = lockoutMap.get(ip);
  lockoutMap.set(ip, { until: existing?.until || 0, failures: (existing?.failures || 0) + 1 });
}

export function clearLoginFailures(ip: string): void {
  lockoutMap.delete(ip);
  rateLimitMap.delete(`login:${ip}`);
}
