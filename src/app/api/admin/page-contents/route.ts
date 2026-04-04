import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('_page') || 1);
  const perPage = Number(searchParams.get('_perPage') || 25);
  const skip = (page - 1) * perPage;

  const [data, total] = await Promise.all([
    prisma.pageContent.findMany({
      skip,
      take: perPage,
      orderBy: [{ page: 'asc' }, { order: 'asc' }],
      include: { translations: true },
    }),
    prisma.pageContent.count(),
  ]);

  return NextResponse.json(data, {
    headers: { 'Content-Range': `page-contents ${skip}-${skip + data.length - 1}/${total}` },
  });
}

export async function POST(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { translations, ...contentData } = body;

  const content = await prisma.pageContent.create({
    data: {
      ...contentData,
      translations: { create: translations },
    },
    include: { translations: true },
  });

  return NextResponse.json(content, { status: 201 });
}
