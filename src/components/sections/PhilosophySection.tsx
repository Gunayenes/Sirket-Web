'use client';

import { motion } from 'framer-motion';
import { Eye, Sparkles } from 'lucide-react';

export function PhilosophySection() {
  return (
    <section className="py-28 bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-purple-500/20">
              <Eye className="h-4 w-4" />
              Tasarım Felsefemiz
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-white mb-8 leading-tight">
              İlk izlenim son şansınız <br />
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                olabilir.
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
              <p className="text-lg text-gray-400 leading-relaxed">
                Pikseller ve renkler sadece görsel değildir; markanızın karakterini, güvenilirliğini ve değerini tanımlar. Modern ve özgün tasarımlarla ziyaretçilerinizi müşterilere dönüştürüyoruz.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Her proje için kullanıcı deneyimini ön planda tutarak, markanızın hikayesini en etkili şekilde anlatan dijital deneyimler tasarlıyoruz. Çünkü ilk izlenim, son izlenimdir.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              {['Modern Tasarım', 'UX Odaklı', 'Marka Tutarlılığı', 'Responsive', 'Hızlı Yükleme'].map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-white/5 text-purple-200 rounded-full text-sm border border-white/10 backdrop-blur-sm">
                  <Sparkles className="inline h-3.5 w-3.5 mr-1.5 text-purple-400" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
