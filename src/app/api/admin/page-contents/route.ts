import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { revalidateTags } from '@/lib/cache';

export async function GET(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('_page') || 1);
  const perPage = Number(searchParams.get('_perPage') || 25);
  const skip = (page - 1) * perPage;

  const pageFilter = searchParams.get('page');
  const contentType = searchParams.get('contentType');
  const isActive = searchParams.get('isActive');

  const where: Record<string, unknown> = {};
  if (pageFilter) where.page = pageFilter;
  if (contentType) where.contentType = contentType;
  if (isActive !== null) where.isActive = isActive === 'true';

  const [data, total] = await Promise.all([
    prisma.pageContent.findMany({
      where,
      skip,
      take: perPage,
      orderBy: [{ page: 'asc' }, { order: 'asc' }],
      include: { translations: true },
    }),
    prisma.pageContent.count({ where }),
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

  revalidateTags('page-contents');
  return NextResponse.json(content, { status: 201 });
}
