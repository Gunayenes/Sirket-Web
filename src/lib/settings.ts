import { prisma } from './prisma';

export async function getSiteSettings(group?: string): Promise<Record<string, unknown>> {
  const where = group ? { group } : {};
  const settings = await prisma.siteSetting.findMany({ where });
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}

export async function getSetting(key: string): Promise<unknown> {
  const s = await prisma.siteSetting.findUnique({ where: { key } });
  return s?.value ?? null;
}
