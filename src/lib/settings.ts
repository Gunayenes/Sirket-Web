import { unstable_cache } from 'next/cache';
import { prisma } from './prisma';

const CACHE_REVALIDATE = 3600; // 1 hour

export const getSiteSettings = unstable_cache(
  async (group?: string): Promise<Record<string, unknown>> => {
    const where = group ? { group } : {};
    const settings = await prisma.siteSetting.findMany({ where });
    return Object.fromEntries(settings.map((s) => [s.key, s.value]));
  },
  ['site-settings'],
  { tags: ['site-settings'], revalidate: CACHE_REVALIDATE },
);

export const getSetting = unstable_cache(
  async (key: string): Promise<unknown> => {
    const s = await prisma.siteSetting.findUnique({ where: { key } });
    return s?.value ?? null;
  },
  ['site-setting'],
  { tags: ['site-settings'], revalidate: CACHE_REVALIDATE },
);
