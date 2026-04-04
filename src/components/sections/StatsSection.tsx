'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

interface StatItem {
  value: number;
  suffix: string;
  key: string;
}

interface StatsSectionProps {
  stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
  { value: 150, suffix: '+', key: 'projects' },
  { value: 80, suffix: '+', key: 'clients' },
  { value: 6, suffix: '+', key: 'years' },
  { value: 12, suffix: '', key: 'team' },
];

export function StatsSection({ stats }: StatsSectionProps) {
  const t = useTranslations('home.stats');
  const items = stats || DEFAULT_STATS;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-950/85 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {items.map(({ value, suffix, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-3">
                <div className="text-5xl lg:text-6xl font-display font-bold text-white">
                  <AnimatedNumber value={value} suffix={suffix} />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-brand-400 to-accent-400 group-hover:w-full transition-all duration-500" />
              </div>
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">{t(key)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
