import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id }, include: { translations: true } });
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const { translations, ...serviceData } = body;

  // Upsert translations
  const service = await prisma.service.update({
    where: { id },
    data: {
      ...serviceData,
      translations: {
        upsert: translations.map((t: { locale: string; title: string; description: string }) => ({
          where: { serviceId_locale: { serviceId: id, locale: t.locale } },
          create: t,
          update: t,
        })),
      },
    },
    include: { translations: true },
  });

  return NextResponse.json(service);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ id });
}
