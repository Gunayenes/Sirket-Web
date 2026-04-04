import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from './prisma';

// ─── Session ─────────────────────────────────────────────────────────────────

export interface SessionData {
  userId?: string;
  email?: string;
  name?: string;
  role?: string;
  isLoggedIn: boolean;
  csrfToken?: string;
  loginAt?: number;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours (work day)
    path: '/',
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }
  return session;
}

// ─── CSRF ────────────────────────────────────────────────────────────────────

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function validateCsrf(req: NextRequest): Promise<boolean> {
  const session = await getSession();
  const token = req.headers.get('x-csrf-token');
  if (!session.csrfToken || !token) return false;
  return crypto.timingSafeEqual(
    Buffer.from(session.csrfToken),
    Buffer.from(token)
  );
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function loginUser(email: string, password: string) {
  // Constant-time comparison: always run bcrypt even if user not found
  const user = await prisma.user.findUnique({ where: { email } });
  const hash = user?.password || '$2a$12$invalidhashpaddingtoconsumetime00000000000000';
  const valid = await bcrypt.compare(password, hash);
  if (!user || !valid) return null;
  return user;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    return null;
  }
  // Session timeout: force re-login after 8 hours
  if (session.loginAt && Date.now() - session.loginAt > 8 * 60 * 60 * 1000) {
    session.destroy();
    return null;
  }
  return session;
}

// ─── Admin API guard (use in all admin routes) ──────────────────────────────

export async function adminGuard(req: NextRequest): Promise<NextResponse | null> {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // CSRF check for mutating requests
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const valid = await validateCsrf(req);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }
  }

  return null; // Authorized
}
