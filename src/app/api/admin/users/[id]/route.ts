import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, hashPassword } from '@/lib/auth';

const SAFE_SELECT = {
  id: true,
  email: true,
  name: true,
  role: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id }, select: SAFE_SELECT });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { email, name, password, role, avatar } = body;

  const data: Record<string, unknown> = {};
  if (typeof email === 'string') data.email = email;
  if (typeof name === 'string') data.name = name;
  if (typeof role === 'string') data.role = role;
  if (avatar !== undefined) data.avatar = avatar || null;

  if (password) {
    if (password.length < 8) {
      return NextResponse.json({ error: 'Şifre en az 8 karakter olmalıdır' }, { status: 400 });
    }
    data.password = await hashPassword(password);
  }

  const user = await prisma.user.update({
    where: { id },
    data,
    select: SAFE_SELECT,
  });

  return NextResponse.json(user);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  // Prevent deleting yourself (account lockout protection)
  if (session.userId === id) {
    return NextResponse.json({ error: 'Kendi hesabınızı silemezsiniz' }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ id });
}
