import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('_page') || 1);
  const perPage = Number(searchParams.get('_perPage') || 20);
  const skip = (page - 1) * perPage;

  const sortField = searchParams.get('_sortField') || 'createdAt';
  const sortDir = (searchParams.get('_sortDir') || 'DESC').toLowerCase() === 'asc' ? 'asc' : 'desc';

  const status = searchParams.get('status');
  const createdFrom = searchParams.get('createdAt_gte');
  const createdTo = searchParams.get('createdAt_lte');
  const q = searchParams.get('q');

  const where: Prisma.QuoteRequestWhereInput = {};
  if (status) where.status = status as Prisma.QuoteRequestWhereInput['status'];
  if (createdFrom || createdTo) {
    where.createdAt = {};
    if (createdFrom) where.createdAt.gte = new Date(createdFrom);
    if (createdTo) where.createdAt.lte = new Date(createdTo);
  }
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { company: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { [sortField]: sortDir },
    }),
    prisma.quoteRequest.count({ where }),
  ]);

  return NextResponse.json(data, {
    headers: { 'Content-Range': `quote_requests ${skip}-${skip + data.length - 1}/${total}` },
  });
}
