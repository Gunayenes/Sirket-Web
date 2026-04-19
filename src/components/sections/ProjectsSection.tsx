'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';

interface Project {
  id: string;
  image: string;
  technologies: string[];
  externalUrl?: string | null;
  translations: Array<{ title: string; description: string }>;
  category?: { translations: Array<{ name: string }> } | null;
}

function PhoneMockup({ project, index }: { project: Project; index: number }) {
  // Stagger phones at different vertical positions for visual rhythm
  const offset = [0, -30, 20, -20, 30, -10][index % 6] || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginTop: `${offset}px` }}
      className="group relative"
    >
      {/* Phone frame */}
      <div className="relative mx-auto w-full max-w-[260px]">
        <div className="relative rounded-[2.5rem] bg-gray-900 p-3 shadow-2xl shadow-purple-200/50 group-hover:shadow-purple-300/60 transition-shadow duration-500">
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-20" />

          {/* Screen */}
          <div className="relative aspect-[9/19] rounded-[2rem] overflow-hidden bg-white">
            <Image
              src={project.image}
              alt={project.translations[0]?.title || ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading="lazy"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />

            {/* External link overlay */}
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <span className="bg-white text-purple-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-xl">
                  Görüntüle <ExternalLink className="h-4 w-4" />
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Title under phone */}
        <div className="mt-5 text-center">
          {project.category && (
            <span className="text-xs font-medium text-purple-600 uppercase tracking-wider">
              {project.category.translations[0]?.name}
            </span>
          )}
          <h3 className="mt-1 text-lg font-bold text-gray-900">
            {project.translations[0]?.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2 px-2">
            {project.translations[0]?.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const t = useTranslations('home.projects');

  return (
    <section className="py-28 bg-gradient-to-b from-purple-50/30 via-white to-purple-50/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-20"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto pb-12">
          {projects.map((project, i) => (
            <PhoneMockup key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">{t('viewAll')}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
