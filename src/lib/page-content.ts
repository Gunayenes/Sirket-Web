import { unstable_cache } from 'next/cache';
import { prisma } from './prisma';

const CACHE_REVALIDATE = 3600;

export const getPageContent = unstable_cache(
  async (page: string, section: string, locale: string) =>
    prisma.pageContent.findUnique({
      where: { page_section: { page, section } },
      include: { translations: { where: { locale } } },
    }),
  ['page-content'],
  { tags: ['page-contents'], revalidate: CACHE_REVALIDATE },
);

export const getPageSections = unstable_cache(
  async (page: string, locale: string) =>
    prisma.pageContent.findMany({
      where: { page, isActive: true },
      orderBy: { order: 'asc' },
      include: { translations: { where: { locale } } },
    }),
  ['page-sections'],
  { tags: ['page-contents'], revalidate: CACHE_REVALIDATE },
);
