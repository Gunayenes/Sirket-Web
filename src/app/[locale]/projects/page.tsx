import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import { getPageSeo } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { ProjectsListClient } from '@/components/sections/ProjectsListClient';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSeo('projects', locale);
  if (seo) return seo;
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return {
    title: { absolute: 'Projelerimiz | Dahi Teknoloji — Web, Mobil & Kurumsal Yazılım Portföyü' },
    description: 'Dahi Teknoloji tarafından geliştirilen kurumsal web sitesi, e-ticaret platformu, mobil uygulama ve özel yazılım projelerini inceleyin. Başarılı dijital dönüşüm hikayeleri.',
    keywords: ['yazılım portföyü', 'web projeler', 'mobil uygulama örnekleri', 'e-ticaret projeleri', 'kurumsal yazılım referansları'],
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects`,
    },
    openGraph: {
      title: 'Projelerimiz | Dahi Teknoloji',
      description: 'Kurumsal web, e-ticaret, mobil uygulama ve özel yazılım projelerimizi keşfedin.',
    },
  };
}

const getData = unstable_cache(
  async (locale: string) =>
    prisma.project.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        translations: { where: { locale } },
        category: { include: { translations: { where: { locale } } } },
      },
    }),
  ['projects-page'],
  { tags: ['projects'], revalidate: 300 },
);

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const projects = await getData(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-10 overflow-hidden bg-gradient-to-br from-white via-purple-50/40 to-fuchsia-50/30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="gradient" className="mb-4">Portföyümüz</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-base lg:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-20 bg-gray-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <ProjectsListClient projects={projects} />
        </div>
      </section>
    </>
  );
}
