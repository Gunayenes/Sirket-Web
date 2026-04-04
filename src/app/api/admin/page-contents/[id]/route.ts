import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const content = await prisma.pageContent.findUnique({ where: { id }, include: { translations: true } });
  if (!content) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const { translations, ...contentData } = body;

  // Remove fields that shouldn't be passed to Prisma update
  delete contentData.id;
  delete contentData.createdAt;
  delete contentData.updatedAt;

  const content = await prisma.pageContent.update({
    where: { id },
    data: {
      ...contentData,
      translations: translations
        ? {
            upsert: translations.map((t: { locale: string; title?: string; subtitle?: string; body?: string }) => ({
              where: { contentId_locale: { contentId: id, locale: t.locale } },
              create: t,
              update: t,
            })),
          }
        : undefined,
    },
    include: { translations: true },
  });

  return NextResponse.json(content);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.pageContent.delete({ where: { id } });
  return NextResponse.json({ id });
}
