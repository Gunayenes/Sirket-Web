import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { revalidateTags } from '@/lib/cache';

export async function GET(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('_page') || 1);
  const perPage = Number(searchParams.get('_perPage') || 10);
  const skip = (page - 1) * perPage;

  const [data, total] = await Promise.all([
    prisma.service.findMany({
      skip,
      take: perPage,
      orderBy: { order: 'asc' },
      include: { translations: true },
    }),
    prisma.service.count(),
  ]);

  return NextResponse.json(data, {
    headers: { 'Content-Range': `services ${skip}-${skip + data.length - 1}/${total}` },
  });
}

export async function POST(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { translations, ...serviceData } = body;

  const service = await prisma.service.create({
    data: {
      ...serviceData,
      translations: { create: translations },
    },
    include: { translations: true },
  });

  revalidateTags('services');
  return NextResponse.json(service, { status: 201 });
}
