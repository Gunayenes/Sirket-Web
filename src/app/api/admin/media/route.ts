import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { unlink } from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('_page') || 1);
  const perPage = Number(searchParams.get('_perPage') || 25);
  const skip = (page - 1) * perPage;

  const [data, total] = await Promise.all([
    prisma.mediaFile.findMany({ skip, take: perPage, orderBy: { createdAt: 'desc' } }),
    prisma.mediaFile.count(),
  ]);

  return NextResponse.json(data, {
    headers: { 'Content-Range': `media ${skip}-${skip + data.length - 1}/${total}` },
  });
}
