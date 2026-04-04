import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { loginUser, getSession, generateCsrfToken } from '@/lib/auth';
import { loginRateLimit, recordLoginFailure, clearLoginFailures } from '@/lib/rate-limit';

const schema = z.object({
  email:    z.string().email(),
  password: z.string().min(6).max(128),
  hp:       z.string().max(0).optional(), // honeypot — must be empty
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown';

  // Progressive lockout
  const { allowed, retryAfterMs } = loginRateLimit(ip);
  if (!allowed) {
    const retryAfterSec = Math.ceil(retryAfterMs / 1000);
    console.warn(`[AUTH] Login blocked for IP ${ip} — retry after ${retryAfterSec}s`);
    return NextResponse.json(
      { error: 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin.' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
    );
  }

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Geçersiz giriş bilgileri' }, { status: 422 });
    }

    const { email, password, hp } = parsed.data;

    // Honeypot check
    if (hp) {
      return NextResponse.json({ error: 'Geçersiz giriş bilgileri' }, { status: 401 });
    }

    const user = await loginUser(email, password);
    if (!user) {
      recordLoginFailure(ip);
      console.warn(`[AUTH] Failed login: ${email} from ${ip}`);
      return NextResponse.json({ error: 'E-posta veya şifre hatalı' }, { status: 401 });
    }

    // Success
    clearLoginFailures(ip);

    const session = await getSession();
    session.userId = user.id;
    session.email = user.email;
    session.name = user.name;
    session.role = user.role;
    session.isLoggedIn = true;
    session.csrfToken = generateCsrfToken();
    session.loginAt = Date.now();
    await session.save();

    console.info(`[AUTH] Login OK: ${email} from ${ip}`);

    return NextResponse.json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      csrfToken: session.csrfToken,
    });
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
