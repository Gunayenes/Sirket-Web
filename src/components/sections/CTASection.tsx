'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  const t = useTranslations('home.cta');

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Soft orbs */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-5 py-2.5 rounded-full mb-8 border border-white/20">
            <Sparkles className="h-4 w-4 text-yellow-200" />
            {t('badge')}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-white/80 mb-10 leading-relaxed">{t('subtitle')}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="xl"
              className="bg-white text-brand-700 hover:bg-white/90 shadow-2xl shadow-black/10 font-bold"
            >
              <Link href="/contact">
                {t('primary')} <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              className="border-2 border-white/30 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm"
            >
              <Link href="/about">{t('secondary')}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
