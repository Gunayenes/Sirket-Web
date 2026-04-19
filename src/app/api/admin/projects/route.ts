import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
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

  const sortField = searchParams.get('_sortField') || 'order';
  const sortDir = (searchParams.get('_sortDir') || 'ASC').toLowerCase() === 'desc' ? 'desc' : 'asc';

  const isActive = searchParams.get('isActive');
  const isFeatured = searchParams.get('isFeatured');
  const categoryId = searchParams.get('categoryId');
  const q = searchParams.get('q');

  const where: Prisma.ProjectWhereInput = {};
  if (isActive !== null) where.isActive = isActive === 'true';
  if (isFeatured !== null) where.isFeatured = isFeatured === 'true';
  if (categoryId) where.categoryId = categoryId;
  if (q) {
    where.OR = [
      { slug: { contains: q, mode: 'insensitive' } },
      { translations: { some: { title: { contains: q, mode: 'insensitive' } } } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.project.findMany({
      where,
      skip, take: perPage,
      orderBy: { [sortField]: sortDir },
      include: { translations: true, category: { include: { translations: true } } },
    }),
    prisma.project.count({ where }),
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
  revalidateTags('projects');
  return NextResponse.json(project, { status: 201 });
}
