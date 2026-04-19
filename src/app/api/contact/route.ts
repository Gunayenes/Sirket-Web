import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendContactNotification, sendContactConfirmation } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

const schema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  phone:    z.string().optional(),
  company:  z.string().optional(),
  budget:   z.string().optional(),
  services: z.array(z.string()).optional(),
  message:  z.string().min(10),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const { allowed } = rateLimit(ip, 5, 60_000);
  if (!allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  try {
    const body = await req.json();
    const data = schema.parse(body);

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

    // Send emails (don't block response)
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
