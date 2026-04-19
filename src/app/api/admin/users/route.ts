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

export async function GET(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('_page') || 1);
  const perPage = Number(searchParams.get('_perPage') || 25);
  const skip = (page - 1) * perPage;

  const sortField = searchParams.get('_sortField') || 'createdAt';
  const sortDir = (searchParams.get('_sortDir') || 'DESC').toLowerCase() === 'asc' ? 'asc' : 'desc';

  const role = searchParams.get('role');
  const q = searchParams.get('q');

  const where: Record<string, unknown> = {};
  if (role) where.role = role;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { [sortField]: sortDir },
      select: SAFE_SELECT,
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json(data, {
    headers: { 'Content-Range': `users ${skip}-${skip + data.length - 1}/${total}` },
  });
}

export async function POST(req: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { email, name, password, role, avatar } = body;

  if (!email || !name || !password) {
    return NextResponse.json({ error: 'E-posta, ad ve şifre zorunludur' }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Şifre en az 8 karakter olmalıdır' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Bu e-posta zaten kayıtlı' }, { status: 409 });
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashed,
      role: role || 'EDITOR',
      avatar: avatar || null,
    },
    select: SAFE_SELECT,
  });

  return NextResponse.json(user, { status: 201 });
}
