import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('_page') || 1);
  const perPage = Number(searchParams.get('_perPage') || 50);
  const skip = (page - 1) * perPage;

  const sortField = searchParams.get('_sortField') || 'order';
  const sortDir = (searchParams.get('_sortDir') || 'ASC').toLowerCase() === 'desc' ? 'desc' : 'asc';

  const location = searchParams.get('location');
  const isActive = searchParams.get('isActive');

  const where: Record<string, unknown> = {};
  if (location) where.location = location;
  if (isActive !== null) where.isActive = isActive === 'true';

  const [data, total] = await Promise.all([
    prisma.menuItem.findMany({
      where,
      skip, take: perPage,
      orderBy: { [sortField]: sortDir },
      include: { translations: true },
    }),
    prisma.menuItem.count({ where }),
  ]);

  return NextResponse.json(data, {
    headers: { 'Content-Range': `menu_items ${skip}-${skip + data.length - 1}/${total}` },
  });
}

export async function POST(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { translations, ...data } = body;

  const item = await prisma.menuItem.create({
    data: { ...data, translations: { create: translations } },
    include: { translations: true },
  });
  return NextResponse.json(item, { status: 201 });
}
