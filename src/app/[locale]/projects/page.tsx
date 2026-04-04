import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getPageSeo } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink } from 'lucide-react';
import { CTASection } from '@/components/sections/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSeo('projects', locale);
  if (seo) return seo;
  const t = await getTranslations({ locale, namespace: 'projects.hero' });
  return { title: t('title'), description: t('subtitle') };
}

async function getData(locale: string) {
  return prisma.project.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    include: {
      translations: { where: { locale } },
      category: { include: { translations: { where: { locale } } } },
    },
  });
}

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
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/95 to-gray-950" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="gradient" className="mb-6">Portföyümüz</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const tr = project.translations[0];
              return (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={tr?.title || ''}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.externalUrl && (
                          <a
                            href={project.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-gray-900"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white mb-1.5">{tr?.title}</h3>
                        <p className="text-gray-300 text-sm line-clamp-2">{tr?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              Henüz proje eklenmemiş.
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
