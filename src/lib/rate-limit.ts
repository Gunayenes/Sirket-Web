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
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterMs: 0 };
  }

  entry.count++;
  if (entry.count > limit) {
    return { allowed: false, remaining: 0, retryAfterMs: entry.resetTime - now };
  }
  return { allowed: true, remaining: limit - entry.count, retryAfterMs: 0 };
}

/**
 * Per-email rate limit. Stops the same address from spamming forms even when the
 * attacker rotates IPs. Separate window from IP-based limits so legitimate users
 * behind NAT aren't punished for a neighbour's requests.
 */
export function emailRateLimit(
  email: string,
  limit = 3,
  windowMs = 24 * 60 * 60 * 1000,
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  return rateLimit(`email:${email.toLowerCase().trim()}`, limit, windowMs);
}

/**
 * Combined check: both IP and email windows must pass. Returns the first failure.
 */
export function formRateLimit(
  ip: string,
  email: string,
  opts: { ipLimit?: number; ipWindowMs?: number; emailLimit?: number; emailWindowMs?: number } = {},
): { allowed: boolean; retryAfterMs: number; reason?: 'ip' | 'email' } {
  const {
    ipLimit = 3,
    ipWindowMs = 60_000,
    emailLimit = 5,
    emailWindowMs = 24 * 60 * 60 * 1000,
  } = opts;

  const ipCheck = rateLimit(`form:${ip}`, ipLimit, ipWindowMs);
  if (!ipCheck.allowed) {
    return { allowed: false, retryAfterMs: ipCheck.retryAfterMs, reason: 'ip' };
  }

  const emailCheck = emailRateLimit(email, emailLimit, emailWindowMs);
  if (!emailCheck.allowed) {
    return { allowed: false, retryAfterMs: emailCheck.retryAfterMs, reason: 'email' };
  }

  return { allowed: true, retryAfterMs: 0 };
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

/**
 * Basic spam heuristic: flags payloads with too many URLs or suspicious patterns.
 * Not a replacement for a proper anti-spam service, but catches obvious bots.
 */
export function isLikelySpam(text: string): boolean {
  const urlCount = (text.match(/https?:\/\//gi) || []).length;
  if (urlCount >= 3) return true;
  if (/\b(viagra|casino|crypto pump|xxx|escort)\b/i.test(text)) return true;
  // Too many line breaks / repetitive content
  const uniqueLines = new Set(text.split('\n').map((l) => l.trim()).filter(Boolean));
  if (uniqueLines.size >= 5 && text.split('\n').length / uniqueLines.size > 3) return true;
  return false;
}
