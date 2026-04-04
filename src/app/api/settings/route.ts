import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const group = searchParams.get('group');
  const where = group ? { group } : {};

  const settings = await prisma.siteSetting.findMany({ where, orderBy: { group: 'asc' } });
  const grouped: Record<string, Record<string, unknown>> = {};

  for (const s of settings) {
    if (!grouped[s.group]) grouped[s.group] = {};
    grouped[s.group][s.key] = s.value;
  }

  return NextResponse.json(grouped, {
    headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate' },
  });
}
