'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight, ChevronsRight } from 'lucide-react';

interface Project {
  id: string;
  slug: string;
  image: string;
  externalUrl?: string | null;
  technologies: string[];
  translations: Array<{ title: string; description: string }>;
  category?: { translations: Array<{ name: string }> } | null;
}

const PER_PAGE = 4;

function ProjectCard({ project, tilted }: { project: Project; tilted: boolean }) {
  const tr = project.translations[0];
  const categoryName = project.category?.translations[0]?.name;
  // Extract domain from external URL for display
  const domain = project.externalUrl
    ? project.externalUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="relative bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-[2rem] p-6 lg:p-10 shadow-xl shadow-purple-200/40 overflow-hidden">
        {/* Category tag in top-right */}
        {categoryName && (
          <div className="absolute top-0 right-0 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2 rounded-bl-2xl">
            {categoryName}
          </div>
        )}

        <div className="grid grid-cols-[auto_1fr] gap-5 lg:gap-8 items-center min-h-[260px] lg:min-h-[280px]">
          {/* Tilted phone mockup */}
          <div
            className="relative shrink-0 w-[120px] lg:w-[160px]"
            style={{ transform: `rotate(${tilted ? '-8deg' : '6deg'})` }}
          >
            <div className="relative rounded-[1.75rem] bg-gray-900 p-2 shadow-2xl shadow-black/30">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-gray-900 rounded-b-xl z-20" />
              <div className="relative aspect-[9/19] rounded-[1.5rem] overflow-hidden bg-white">
                <Image
                  src={project.image}
                  alt={tr?.title || ''}
                  fill
                  sizes="(max-width: 1024px) 120px, 160px"
                  loading="lazy"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="text-white min-w-0">
            <h3 className="text-2xl lg:text-3xl font-bold mb-2 truncate">
              {tr?.title}
            </h3>
            {domain && (
              <p className="text-purple-100 text-sm lg:text-base mb-6 truncate">
                {domain}
              </p>
            )}
            {project.externalUrl ? (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-colors"
              >
                İNCELE
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-900/70 text-white text-sm font-bold rounded-xl cursor-not-allowed"
              >
                İNCELE
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsListClient({ projects }: { projects: Project[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(projects.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const visible = projects.slice(start, start + PER_PAGE);

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Henüz proje eklenmemiş.
      </div>
    );
  }

  return (
    <div>
      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {visible.map((project, i) => (
          <ProjectCard key={project.id} project={project} tilted={i % 2 === 0} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-16">
          {Array.from({ length: totalPages }).map((_, i) => {
            const num = i + 1;
            const active = num === page;
            return (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                  active
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-110'
                    : 'bg-gray-900 text-white hover:bg-gray-700'
                }`}
              >
                {num}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="w-10 h-10 rounded-full bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            aria-label="Sonraki sayfa"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="w-10 h-10 rounded-full bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            aria-label="Son sayfa"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
