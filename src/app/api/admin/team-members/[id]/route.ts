import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id }, include: { translations: true } });
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(member);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const { translations, ...data } = body;

  const member = await prisma.teamMember.update({
    where: { id },
    data: {
      ...data,
      translations: {
        upsert: translations.map((t: { locale: string }) => ({
          where: { memberId_locale: { memberId: id, locale: t.locale } },
          create: t,
          update: t,
        })),
      },
    },
    include: { translations: true },
  });
  return NextResponse.json(member);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.teamMember.delete({ where: { id } });
  return NextResponse.json({ id });
}
