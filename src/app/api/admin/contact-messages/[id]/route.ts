import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const msg = await prisma.contactMessage.findUnique({ where: { id } });
  if (!msg) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  // Mark as read
  if (msg.status === 'UNREAD') {
    await prisma.contactMessage.update({ where: { id }, data: { status: 'READ' } });
  }
  return NextResponse.json(msg);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const msg = await prisma.contactMessage.update({ where: { id }, data: body });
  return NextResponse.json(msg);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.contactMessage.delete({ where: { id } });
  return NextResponse.json({ id });
}
