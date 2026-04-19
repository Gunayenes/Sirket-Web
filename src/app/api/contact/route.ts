import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendContactNotification, sendContactConfirmation } from '@/lib/email';
import { formRateLimit, isLikelySpam } from '@/lib/rate-limit';

const MAX_BODY_BYTES = 10 * 1024; // 10 KB is generous for a contact form

const schema = z.object({
  name:     z.string().min(2).max(100),
  email:    z.string().email().max(150),
  phone:    z.string().max(30).optional(),
  company:  z.string().max(100).optional(),
  budget:   z.string().max(50).optional(),
  services: z.array(z.string().max(60)).max(20).optional(),
  message:  z.string().min(10).max(3000),
  // Honeypot: bots fill every field; humans never see this.
  website:  z.string().max(0).optional(),
});

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: NextRequest) {
  // Size guard before parsing
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  const ip = getClientIp(req);

  try {
    const raw = await req.json();
    const data = schema.parse(raw);

    // Honeypot hit → silent accept (return 201) so bots don't retry, but don't store.
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ id: 'ok' }, { status: 201 });
    }

    // Per-IP + per-email rate limit
    const limit = formRateLimit(ip, data.email, {
      ipLimit: 3,           // 3 submissions per minute per IP
      ipWindowMs: 60_000,
      emailLimit: 5,        // 5 submissions per day per email
      emailWindowMs: 24 * 60 * 60 * 1000,
    });
    if (!limit.allowed) {
      const res = NextResponse.json(
        { error: limit.reason === 'email' ? 'Bu e-posta adresi için günlük sınır aşıldı.' : 'Çok fazla istek gönderdiniz, lütfen bekleyin.' },
        { status: 429 },
      );
      res.headers.set('Retry-After', String(Math.ceil(limit.retryAfterMs / 1000)));
      return res;
    }

    // Spam heuristic
    if (isLikelySpam(data.message) || (data.company && isLikelySpam(data.company))) {
      // Accept silently (bot feedback prevents retries) but don't store
      return NextResponse.json({ id: 'ok' }, { status: 201 });
    }

    const services = data.services?.length ? data.services.join(', ') : '';
    const subject = data.company
      ? `${data.company} — İletişim Formu`
      : 'Web Sitesi İletişim Formu';

    const message = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject,
        message: `${data.message}${services ? `\n\nİlgilenilen Hizmetler: ${services}` : ''}${data.budget ? `\nBütçe: ${data.budget}` : ''}`,
      },
    });

    Promise.all([
      sendContactNotification({ ...data, subject }),
      sendContactConfirmation(data.email, data.name),
    ]).catch(console.error);

    return NextResponse.json({ id: message.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.errors }, { status: 422 });
    }
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
