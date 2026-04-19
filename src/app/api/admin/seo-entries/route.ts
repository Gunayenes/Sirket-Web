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

  const [data, total] = await Promise.all([
    prisma.seoEntry.findMany({ skip, take: perPage, orderBy: { page: 'asc' } }),
    prisma.seoEntry.count(),
  ]);

  return NextResponse.json(data, {
    headers: { 'Content-Range': `seo_entries ${skip}-${skip + data.length - 1}/${total}` },
  });
}

export async function POST(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const entry = await prisma.seoEntry.create({ data: body });
  revalidateTags('seo-entries');
  return NextResponse.json(entry, { status: 201 });
}
