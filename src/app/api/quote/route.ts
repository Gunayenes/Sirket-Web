import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendQuoteNotification } from '@/lib/email';
import { formRateLimit, isLikelySpam } from '@/lib/rate-limit';

const MAX_BODY_BYTES = 20 * 1024; // 20 KB — quote forms can be longer

const schema = z.object({
  name:        z.string().min(2).max(100),
  email:       z.string().email().max(150),
  phone:       z.string().max(30).optional(),
  company:     z.string().max(100).optional(),
  budget:      z.string().max(50).optional(),
  deadline:    z.string().max(50).optional(),
  services:    z.array(z.string().max(60)).min(1).max(20),
  description: z.string().min(20).max(5000),
  website:     z.string().max(0).optional(), // honeypot
});

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  const ip = getClientIp(req);

  try {
    const raw = await req.json();
    const data = schema.parse(raw);

    if (data.website && data.website.length > 0) {
      return NextResponse.json({ id: 'ok' }, { status: 201 });
    }

    const limit = formRateLimit(ip, data.email, {
      ipLimit: 3,
      ipWindowMs: 60_000,
      emailLimit: 3,        // Quote is higher-intent: 3/day per email
      emailWindowMs: 24 * 60 * 60 * 1000,
    });
    if (!limit.allowed) {
      const res = NextResponse.json(
        { error: limit.reason === 'email' ? 'Bu e-posta adresi için günlük teklif sınırı aşıldı.' : 'Çok fazla istek gönderdiniz, lütfen bekleyin.' },
        { status: 429 },
      );
      res.headers.set('Retry-After', String(Math.ceil(limit.retryAfterMs / 1000)));
      return res;
    }

    if (isLikelySpam(data.description) || (data.company && isLikelySpam(data.company))) {
      return NextResponse.json({ id: 'ok' }, { status: 201 });
    }

    const { website: _honeypot, ...quoteData } = data;
    const quote = await prisma.quoteRequest.create({ data: quoteData });

    sendQuoteNotification(quoteData).catch(console.error);

    return NextResponse.json({ id: quote.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.errors }, { status: 422 });
    }
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
