import { prisma } from './prisma';

export async function getPageContent(page: string, section: string, locale: string) {
  return prisma.pageContent.findUnique({
    where: { page_section: { page, section } },
    include: { translations: { where: { locale } } },
  });
}

export async function getPageSections(page: string, locale: string) {
  return prisma.pageContent.findMany({
    where: { page, isActive: true },
    orderBy: { order: 'asc' },
    include: { translations: { where: { locale } } },
  });
}
