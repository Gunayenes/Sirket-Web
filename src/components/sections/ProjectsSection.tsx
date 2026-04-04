'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Project {
  id: string;
  image: string;
  technologies: string[];
  externalUrl?: string | null;
  translations: Array<{ title: string; description: string }>;
  category?: { translations: Array<{ name: string }> } | null;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      className="group"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-2xl transition-shadow duration-500"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.translations[0]?.title || ''}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />

          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {project.category && (
              <div className="mb-auto">
                <Badge variant="gradient" className="text-xs">
                  {project.category.translations[0]?.name}
                </Badge>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 font-medium">
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {project.translations[0]?.title}
            </h3>
            <p className="text-gray-300 text-sm line-clamp-2">
              {project.translations[0]?.description}
            </p>
          </div>

          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-gray-900"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* 3D shine */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.y * 5}% ${50 - tilt.x * 5}%, rgba(255,255,255,0.12) 0%, transparent 50%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const t = useTranslations('home.projects');

  return (
    <section className="py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
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
