'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shield, Zap, HeartHandshake, TrendingUp, Clock, Award } from 'lucide-react';

const ICONS = [Zap, Shield, HeartHandshake, TrendingUp, Clock, Award];

export function WhyUsSection() {
  const t = useTranslations('home.why');

  return (
    <section className="py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image composition */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80"
                alt="Team meeting"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating accent image */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80"
                alt="Collaboration"
                fill
                className="object-cover"
              />
            </motion.div>
            {/* Experience badge */}
            <motion.div
              className="absolute -top-4 -left-4 bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-2xl p-5 shadow-lg hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="text-3xl font-bold">6+</div>
              <div className="text-xs font-medium text-white/80">{t('experienceBadge')}</div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <SectionHeader
              title={t('title')}
              subtitle={t('subtitle')}
              align="left"
              className="mb-10"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ICONS.map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-[15px]">
                      {t(`reasons.${i}.title`)}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {t(`reasons.${i}.desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
