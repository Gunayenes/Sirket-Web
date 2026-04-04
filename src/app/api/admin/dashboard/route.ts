import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [
    totalServices,
    totalProjects,
    totalPosts,
    totalTeam,
    unreadMessages,
    pendingQuotes,
    recentMessages,
    recentQuotes,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.teamMember.count({ where: { isActive: true } }),
    prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
    prisma.quoteRequest.count({ where: { status: 'PENDING' } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  return NextResponse.json({
    stats: { totalServices, totalProjects, totalPosts, totalTeam, unreadMessages, pendingQuotes },
    recentMessages,
    recentQuotes,
  });
}
