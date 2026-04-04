import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('_page') || 1);
  const perPage = Number(searchParams.get('_perPage') || 10);
  const skip = (page - 1) * perPage;

  const [data, total] = await Promise.all([
    prisma.project.findMany({
      skip, take: perPage,
      orderBy: { order: 'asc' },
      include: { translations: true, category: { include: { translations: true } } },
    }),
    prisma.project.count(),
  ]);

  return NextResponse.json(data, {
    headers: { 'Content-Range': `projects ${skip}-${skip + data.length - 1}/${total}` },
  });
}

export async function POST(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { translations, ...data } = body;

  const project = await prisma.project.create({
    data: { ...data, translations: { create: translations } },
    include: { translations: true },
  });
  return NextResponse.json(project, { status: 201 });
}
