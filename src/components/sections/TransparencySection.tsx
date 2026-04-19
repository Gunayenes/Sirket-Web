'use client';

import { motion } from 'framer-motion';
import { MessagesSquare, Workflow, BarChart3, Clock } from 'lucide-react';

const FEATURES = [
  {
    icon: MessagesSquare,
    title: 'Şeffaf İletişim',
    desc: 'Proje boyunca düzenli toplantılar, anlık raporlar ve sürekli iletişim.',
  },
  {
    icon: Workflow,
    title: 'CRM/ERP Yönetimi',
    desc: 'Kurumsal proje yönetim sistemleri ile her aşamayı takip edin.',
  },
  {
    icon: BarChart3,
    title: 'Anlık Raporlama',
    desc: 'Proje durumunu, ilerlemeyi ve kullanılan kaynakları gerçek zamanlı görün.',
  },
  {
    icon: Clock,
    title: 'Zamanında Teslim',
    desc: 'Agile metodoloji ile sprintler halinde, planlandığı gibi teslim.',
  },
];

export function TransparencySection() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-purple-100">
            <Workflow className="h-4 w-4" />
            Proje Yönetimi
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Şeffaf süreç, <br />
            <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              güvenilir partner
            </span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Her projede şeffaf iletişim ve modern yönetim araçları kullanıyoruz. Projenizin her aşamasında bilgi sahibi olur, sürece dahil olursunuz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
