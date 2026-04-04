'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Search, Map, Code2, Rocket } from 'lucide-react';

const STEP_ICONS = [Search, Map, Code2, Rocket];
const STEP_COLORS = [
  { bg: 'bg-brand-50', text: 'text-brand-600', ring: 'ring-brand-100' },
  { bg: 'bg-accent-50', text: 'text-accent-600', ring: 'ring-accent-100' },
  { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'ring-violet-100' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
];

export function ProcessSection() {
  const t = useTranslations('home.process');
  const steps = t.raw('steps') as Array<{ title: string; desc: string }>;

  return (
    <section className="py-28 bg-gray-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-20"
          dark
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-brand-500/40 via-accent-500/40 to-emerald-500/40" />

          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i] || Search;
            const color = STEP_COLORS[i] || STEP_COLORS[0];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center group"
              >
                {/* Step number + icon */}
                <div className="relative inline-flex flex-col items-center mb-6">
                  <div className={`w-24 h-24 rounded-2xl ${color.bg} ring-4 ${color.ring} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className={`h-10 w-10 ${color.text}`} />
                  </div>
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
