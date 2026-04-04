import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('_page') || 1);
  const perPage = Number(searchParams.get('_perPage') || 20);
  const skip = (page - 1) * perPage;

  const [data, total] = await Promise.all([
    prisma.contactMessage.findMany({ skip, take: perPage, orderBy: { createdAt: 'desc' } }),
    prisma.contactMessage.count(),
  ]);

  return NextResponse.json(data, {
    headers: { 'Content-Range': `contact_messages ${skip}-${skip + data.length - 1}/${total}` },
  });
}
