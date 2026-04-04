import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

function addSecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin routes
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return addSecurityHeaders(NextResponse.next());
    }
    const session = request.cookies.get('admin_session');
    if (!session) {
      return addSecurityHeaders(
        NextResponse.redirect(new URL('/admin/login', request.url))
      );
    }
    return addSecurityHeaders(NextResponse.next());
  }

  // API routes: add security headers, skip intl
  if (pathname.startsWith('/api')) {
    const response = NextResponse.next();
    // Block admin API from external origins in production
    if (pathname.startsWith('/api/admin')) {
      const origin = request.headers.get('origin');
      const host = request.headers.get('host');
      if (origin && host && !origin.includes(host)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }
    return addSecurityHeaders(response);
  }

  const response = intlMiddleware(request);
  return addSecurityHeaders(response);
}

export const config = {
  matcher: [
    String.raw`/((?!_next|_vercel|.*\..*).*)`
    '/api/:path*',
  ],
};
