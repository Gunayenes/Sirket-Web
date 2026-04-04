'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const { ArrowRight } = LucideIcons;

function ServiceCard({ icon, title, description, index }: {
  icon: string; title: string; description: string; index: number;
}) {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[icon] || LucideIcons.Zap;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const COLORS = [
    { bg: 'from-brand-600 to-brand-700', light: 'bg-brand-50', text: 'text-brand-600' },
    { bg: 'from-accent-500 to-accent-600', light: 'bg-accent-50', text: 'text-accent-600' },
    { bg: 'from-violet-500 to-violet-600', light: 'bg-violet-50', text: 'text-violet-600' },
    { bg: 'from-amber-500 to-amber-600', light: 'bg-amber-50', text: 'text-amber-600' },
    { bg: 'from-rose-500 to-rose-600', light: 'bg-rose-50', text: 'text-rose-600' },
    { bg: 'from-cyan-500 to-cyan-600', light: 'bg-cyan-50', text: 'text-cyan-600' },
  ];
  const color = COLORS[index % COLORS.length];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
      className="group"
    >
      <motion.div
        className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer h-full"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* Gradient line top */}
        <div className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r ${color.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className={`w-14 h-14 rounded-2xl ${color.light} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className={`h-7 w-7 ${color.text}`} />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
          {title}
        </h3>
        <p className="text-gray-500 leading-relaxed text-[15px] mb-6">{description}</p>

        <div className={`flex items-center gap-1.5 ${color.text} font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
          Detaylı bilgi <ArrowRight className="h-4 w-4" />
        </div>

        {/* 3D shine effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.y * 4}% ${50 - tilt.x * 4}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

interface Service {
  id: string;
  icon: string;
  translations: Array<{ title: string; description: string }>;
}

export function ServicesSection({ services }: { services: Service[] }) {
  const t = useTranslations('home.services');

  return (
    <section className="py-28 bg-gray-50/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.translations[0]?.title || ''}
              description={service.translations[0]?.description || ''}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/services">{t('viewAll')}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
