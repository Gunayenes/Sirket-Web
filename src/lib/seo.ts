import { Metadata } from 'next';
import { prisma } from './prisma';

export async function getPageSeo(page: string, locale: string): Promise<Metadata | null> {
  const entry = await prisma.seoEntry.findUnique({
    where: { page_locale: { page, locale } },
  });

  if (!entry) return null;

  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords || undefined,
    openGraph: {
      title: entry.ogTitle || entry.title,
      description: entry.ogDescription || entry.description,
      images: entry.ogImage ? [{ url: entry.ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.ogTitle || entry.title,
      description: entry.ogDescription || entry.description,
    },
  };
}
