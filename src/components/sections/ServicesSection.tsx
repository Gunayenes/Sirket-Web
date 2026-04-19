'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Smartphone } from 'lucide-react';
import { getIcon } from '@/lib/icons';

interface Service {
  id: string;
  icon: string;
  translations: Array<{ title: string; description: string }>;
}

function ServiceItem({
  icon, title, description, index, side,
}: {
  icon: string; title: string; description: string; index: number; side: 'left' | 'right';
}) {
  const IconComponent = getIcon(icon);

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-4 ${side === 'left' ? 'lg:text-right lg:flex-row-reverse' : ''}`}
    >
      <div className="shrink-0 w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
        <IconComponent className="h-6 w-6 text-purple-600" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 mb-1.5 leading-snug">
          {title}
        </h3>
        <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

export function ServicesSection({ services }: { services: Service[] }) {
  const t = useTranslations('home.services');

  const leftServices = services.slice(0, 4);
  const rightServices = services.slice(4, 8);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-gray-900 mb-3">
            <span className="text-purple-600">#</span>
            <span>Neler Yapıyoruz?</span>
          </div>
          <p className="text-purple-600 font-bold text-xs sm:text-sm uppercase tracking-widest">
            HİZMET ÇEŞİTLERİ
          </p>
        </motion.div>

        {/* MOBILE: Single column list */}
        <div className="lg:hidden space-y-8 max-w-md mx-auto">
          {services.slice(0, 8).map((service, i) => (
            <ServiceItem
              key={service.id}
              icon={service.icon}
              title={service.translations[0]?.title || ''}
              description={service.translations[0]?.description || ''}
              index={i}
              side="right"
            />
          ))}
        </div>

        {/* DESKTOP: 3-column with phone in middle */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-12 items-center max-w-7xl mx-auto">
          {/* LEFT */}
          <div className="space-y-14">
            {leftServices.map((service, i) => (
              <ServiceItem
                key={service.id}
                icon={service.icon}
                title={service.translations[0]?.title || ''}
                description={service.translations[0]?.description || ''}
                index={i}
                side="left"
              />
            ))}
          </div>

          {/* CENTER PHONE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto"
          >
            <div className="relative w-[280px] h-[560px] rounded-[3rem] bg-gray-900 p-3 shadow-2xl shadow-purple-300/40">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-b-2xl z-30" />
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 flex items-center justify-center">
                <div className="absolute inset-0 grid grid-cols-4 gap-3 p-6 pt-16">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const colors = [
                      'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500',
                      'bg-violet-500', 'bg-indigo-500', 'bg-blue-500', 'bg-cyan-500',
                      'bg-emerald-500', 'bg-amber-500', 'bg-orange-500', 'bg-red-500',
                    ];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03, duration: 0.4 }}
                        className={`aspect-square rounded-2xl ${colors[i % colors.length]} opacity-90 shadow-lg`}
                      />
                    );
                  })}
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-purple-500/50"
                >
                  <Smartphone className="h-12 w-12 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <div className="space-y-14">
            {rightServices.map((service, i) => (
              <ServiceItem
                key={service.id}
                icon={service.icon}
                title={service.translations[0]?.title || ''}
                description={service.translations[0]?.description || ''}
                index={i}
                side="right"
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14 lg:mt-20"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-lg shadow-purple-500/25">
            <Link href="/services">{t('viewAll')}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
