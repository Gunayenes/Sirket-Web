'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { CTASection } from '@/components/sections/CTASection';

interface Project {
  id: string;
  image: string;
  technologies: string[];
  externalUrl?: string | null;
  translations: Array<{ title: string; description: string }>;
  category?: { translations: Array<{ name: string }>; slug: string } | null;
}

interface ProjectsClientProps {
  projects: Project[];
  categories: Array<{ slug: string; translations: Array<{ name: string }> }>;
  allTechs: string[];
}

export function ProjectsClient({ projects, categories, allTechs }: ProjectsClientProps) {
  const t = useTranslations('projects');
  const [catFilter, setCatFilter] = useState('all');
  const [techFilter, setTechFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (catFilter !== 'all' && p.category?.slug !== catFilter) return false;
      if (techFilter !== 'all' && !p.technologies.includes(techFilter)) return false;
      if (search && !p.translations[0]?.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [projects, catFilter, techFilter, search]);

  return (
    <>
      {/* Filters */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCatFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                catFilter === 'all' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-gray-200 text-gray-700 hover:border-brand-400'
              }`}
            >
              {t('filters.all')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setCatFilter(cat.slug)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  catFilter === cat.slug ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-gray-200 text-gray-700 hover:border-brand-400'
                }`}
              >
                {cat.translations[0]?.name}
              </button>
            ))}
          </div>

          {allTechs.length > 0 && (
            <select
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500 bg-white"
            >
              <option value="all">{t('filters.technology')}</option>
              {allTechs.map((tech) => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.translations[0]?.title || ''}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        {project.category && (
                          <Badge variant="gradient" className="text-xs">
                            {project.category.translations[0]?.name}
                          </Badge>
                        )}
                        {project.externalUrl && (
                          <a
                            href={project.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-gray-900"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-xs text-white/80 bg-white/10 px-2 py-0.5 rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-bold text-white mb-1">{project.translations[0]?.title}</h3>
                        <p className="text-gray-300 text-xs line-clamp-2">{project.translations[0]?.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">No projects found.</div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
