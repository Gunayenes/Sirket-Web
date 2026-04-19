'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Palette, Code2, Rocket } from 'lucide-react';

const STEP_ICONS = [ClipboardList, Palette, Code2, Rocket];
const STEP_COLORS = [
  { bg: 'bg-blue-500', shadow: 'shadow-blue-500/40', dots: 'text-blue-300' },
  { bg: 'bg-orange-500', shadow: 'shadow-orange-500/40', dots: 'text-orange-300' },
  { bg: 'bg-emerald-500', shadow: 'shadow-emerald-500/40', dots: 'text-emerald-300' },
  { bg: 'bg-red-500', shadow: 'shadow-red-500/40', dots: 'text-red-300' },
];

const STEPS = [
  { title: 'Planlama', desc: 'Proje sahibinin isteği çok iyi analiz edilir, beklenti ve ulaşmak istediğiniz hedefe göre harekete geçilir.' },
  { title: 'Görsel Tasarım', desc: 'Genel konsept tasarımı ve alt sayfa duruşları belirlenerek grafik tasarımı ve iskelet gövde oluşturulur.' },
  { title: 'Kodlama', desc: 'Kod geliştirme, kod yapısı ile tasarımın uyumlulaştırılması, veri girişi işlemleri gerçekleştirilir.' },
  { title: 'SEO Optimizasyonu', desc: 'Projenin site içi ve site dışı optimizasyonu yapılır ve projenin en iyi geri dönüşleri alabilmesi sağlanır.' },
];

function DottedArrow({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 60 30" className={`w-16 h-8 ${color}`} fill="currentColor">
      {/* Two arrow shapes made of dots */}
      {[0, 1].map((arrowIdx) => (
        <g key={arrowIdx} transform={`translate(${arrowIdx * 18}, 0)`}>
          {[0, 1, 2, 3, 4].map((col) => {
            const rows = col < 3 ? col + 1 : 5 - col;
            return Array.from({ length: rows }).map((_, row) => (
              <circle
                key={`${col}-${row}`}
                cx={col * 4}
                cy={15 - (rows - 1) * 2 + row * 4}
                r="1.2"
              />
            ));
          })}
        </g>
      ))}
    </svg>
  );
}

export function ProcessSection() {
  return (
    <section className="py-24 bg-blue-50/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-3">
            <span className="text-red-500">#</span>
            <span>Nasıl Çalışıyoruz?</span>
          </div>
          <p className="text-red-500 font-bold text-sm uppercase tracking-widest">
            YAPIM AŞAMASI
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
            {STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i];
              const color = STEP_COLORS[i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative text-center"
                >
                  {/* Circle Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`relative w-28 h-28 rounded-full ${color.bg} ${color.shadow} shadow-2xl flex items-center justify-center`}>
                      <Icon className="h-14 w-14 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm max-w-xs mx-auto">
                    {step.desc}
                  </p>

                  {/* Dotted arrow between steps */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:flex absolute top-10 -right-12 items-center justify-center pointer-events-none">
                      <DottedArrow color={color.dots} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
