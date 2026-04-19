import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { prisma } from './prisma';

const CACHE_REVALIDATE = 3600; // 1 hour

export const getPageSeo = unstable_cache(
  async (page: string, locale: string): Promise<Metadata | null> => {
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
  },
  ['page-seo'],
  { tags: ['seo-entries'], revalidate: CACHE_REVALIDATE },
);
