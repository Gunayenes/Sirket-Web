import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { unlink } from 'fs/promises';
import path from 'path';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const media = await prisma.mediaFile.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(media);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  const body = await req.json();
  const updated = await prisma.mediaFile.update({
    where: { id },
    data: {
      alt: typeof body.alt === 'string' ? body.alt : null,
      folder: typeof body.folder === 'string' ? body.folder : null,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  const media = await prisma.mediaFile.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Delete file from disk
  try {
    await unlink(path.join(process.cwd(), 'public', media.url));
  } catch {}

  await prisma.mediaFile.delete({ where: { id } });
  return NextResponse.json({ id });
}
