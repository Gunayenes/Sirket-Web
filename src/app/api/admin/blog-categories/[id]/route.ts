import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const cat = await prisma.blogCategory.findUnique({ where: { id }, include: { translations: true } });
  if (!cat) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(cat);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const { translations, ...data } = body;

  const cat = await prisma.blogCategory.update({
    where: { id },
    data: {
      ...data,
      translations: {
        upsert: translations.map((t: { locale: string }) => ({
          where: { categoryId_locale: { categoryId: id, locale: t.locale } },
          create: t,
          update: t,
        })),
      },
    },
    include: { translations: true },
  });
  return NextResponse.json(cat);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.blogCategory.delete({ where: { id } });
  return NextResponse.json({ id });
}
