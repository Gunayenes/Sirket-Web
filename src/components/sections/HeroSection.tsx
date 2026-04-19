'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Phone, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  const t = useTranslations('home.hero');
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const highlightsRaw = t.raw('highlights') as Record<string, string>;
  const highlights = Object.values(highlightsRaw);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
      {/* Static fallback (visible while video loads or for reduced-motion users) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-950"
        aria-hidden="true"
      />

      {/* Background video — skipped for users who prefer reduced motion */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/videos/hero-poster.jpg"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background-1.webm" type="video/webm" />
          <source src="/videos/hero-background-1.mp4" type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/75 via-gray-950/55 to-gray-950/85" />

      {/* Animated orbs (reduced opacity, video is now primary visual) */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full blur-[160px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #9333ea 0%, transparent 70%)',
          x: mousePos.x * -20,
          y: mousePos.y * -20,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-12"
        style={{
          background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
          x: mousePos.x * 15,
          y: mousePos.y * 15,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm text-purple-300 text-sm font-medium px-5 py-2.5 rounded-full mb-8 border border-purple-500/20">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            {t('badge')}
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight text-white mb-8 leading-[1.05]"
          >
            Dijital Geleceğinizi <br />
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
              Beraber
            </span>
            <br />Kuruyoruz
          </motion.h1>

          <motion.p variants={item} className="text-lg lg:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </motion.p>

          {/* Highlights */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12">
            {highlights.map((h, i) => (
              <span key={i} className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                {h}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="xl" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-2xl shadow-purple-600/30">
              <Link href="/contact">
                {t('cta')} <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="xl" className="bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm">
              <a href="tel:+905427460197">
                <Phone className="h-4 w-4" /> 0542 746 01 97
              </a>
            </Button>
          </motion.div>

          {/* Trust badge with image */}
          <motion.div
            variants={item}
            className="mt-20 hidden lg:flex items-center justify-center gap-8 text-gray-500 text-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 ring-2 ring-gray-950" />
                ))}
              </div>
              <span><strong className="text-white">150+</strong> Tamamlanan Proje</span>
            </div>
            <div className="w-px h-6 bg-gray-700" />
            <div className="flex items-center gap-2">
              <span className="text-purple-400">★★★★★</span>
              <span><strong className="text-white">%98</strong> Müşteri Memnuniyeti</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 z-10"
      >
        <span className="text-xs font-medium tracking-widest uppercase">{t('scrollHint')}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
