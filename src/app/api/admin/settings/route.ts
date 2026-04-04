import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await prisma.siteSetting.findMany({ orderBy: { group: 'asc' } });
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json() as Array<{ key: string; value: Prisma.InputJsonValue; group?: string }>;

  const updated = await Promise.all(
    body.map(({ key, value, group }) =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, value, group: group || 'general' },
        update: { value },
      })
    )
  );

  return NextResponse.json(updated);
}
