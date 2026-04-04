import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendQuoteNotification } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

const schema = z.object({
  name:        z.string().min(2),
  email:       z.string().email(),
  phone:       z.string().optional(),
  company:     z.string().optional(),
  budget:      z.string().optional(),
  deadline:    z.string().optional(),
  services:    z.array(z.string()).min(1),
  description: z.string().min(20),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const { allowed } = rateLimit(ip, 5, 60_000);
  if (!allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const quote = await prisma.quoteRequest.create({ data });

    sendQuoteNotification(data).catch(console.error);

    return NextResponse.json({ id: quote.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.errors }, { status: 422 });
    }
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return NextResponse.json(quotes);
}
