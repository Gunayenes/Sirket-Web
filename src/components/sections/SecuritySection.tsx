'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function SecuritySection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-3xl p-12 shadow-2xl shadow-purple-500/30">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] rounded-3xl" />

              <div className="relative z-10 text-white">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8">
                  <Shield className="h-10 w-10 text-white" />
                </div>

                <div className="text-7xl font-display font-bold mb-2">%80</div>
                <div className="text-lg text-purple-100 mb-8">
                  Web projelerinin sızma testlerini geçemediği biliniyor.
                </div>

                <div className="space-y-3">
                  {[
                    { icon: Lock, text: 'SSL/TLS şifreleme' },
                    { icon: Shield, text: 'Güvenlik açığı taraması' },
                    { icon: CheckCircle2, text: 'OWASP Top 10 uyumluluğu' },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90">
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating warning badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Güvenlik Skoru</div>
                <div className="text-lg font-bold text-gray-900">A+</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-purple-100">
              <Shield className="h-4 w-4" />
              Güvenli Yazılım
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
              Güvenlik bizim için <br />
              <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                ana değerdir
              </span>
            </h2>

            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Geliştirdiğimiz her projede en üst düzey güvenlik standartlarını uyguluyoruz. KVKK uyumlu altyapı, düzenli sızma testleri ve sürekli güncellemeler ile verileriniz her zaman koruma altında.
            </p>

            <div className="space-y-4">
              {[
                { title: 'KVKK Uyumlu', desc: 'Kişisel verilerin korunması yasasına tam uyum' },
                { title: 'Düzenli Test', desc: 'Periyodik penetration test ve güvenlik denetimi' },
                { title: '7/24 İzleme', desc: 'Sunucu ve uygulama performans takibi' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
