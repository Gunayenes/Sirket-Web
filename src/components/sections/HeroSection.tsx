'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Play, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  const t = useTranslations('home.hero');
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const highlights = t.raw('highlights') as string[];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/95 to-gray-950/70" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{
          background: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)',
          x: mousePos.x * -15,
          y: mousePos.y * -15,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)',
          x: mousePos.x * 10,
          y: mousePos.y * 10,
        }}
      />

      <motion.div style={{ opacity }} className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ y: textY }}
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t('badge')}
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight text-white mb-8 leading-[1.1]"
            >
              {t('title').split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-accent-400 bg-clip-text text-transparent">
                      {line}
                    </span>
                  ) : line}
                </span>
              ))}
            </motion.h1>

            <motion.p variants={item} className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
              {t('subtitle')}
            </motion.p>

            {/* Highlights */}
            <motion.div variants={item} className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
              {highlights.map((h, i) => (
                <span key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  {h}
                </span>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row items-start gap-4">
              <Button asChild size="xl" variant="gradient" className="shadow-lg shadow-brand-600/25">
                <Link href="/contact">
                  {t('cta')} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="xl" className="bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm">
                <Link href="/projects">
                  <Play className="h-4 w-4" /> {t('secondary')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: 3D floating image composition */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            style={{ y: imageY }}
            className="hidden lg:block"
          >
            <div
              className="relative"
              style={{ perspective: '1200px' }}
            >
              {/* Main image card - 3D tilt */}
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                style={{
                  transformStyle: 'preserve-3d',
                  rotateY: mousePos.x * 5,
                  rotateX: mousePos.y * -5,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 30 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team collaboration"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
              </motion.div>

              {/* Floating stat card - top right */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl shadow-black/20"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                style={{
                  transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 40px)`,
                }}
              >
                <div className="text-2xl font-bold text-gray-900">150+</div>
                <div className="text-xs text-gray-500 font-medium">{t('floatingProjects')}</div>
              </motion.div>

              {/* Floating badge card - bottom left */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-brand-600 to-accent-500 rounded-xl px-5 py-3 shadow-xl shadow-brand-600/30"
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
                style={{
                  transform: `translate3d(${mousePos.x * -6}px, ${mousePos.y * -6}px, 30px)`,
                }}
              >
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-semibold text-sm">{t('floatingSuccess')}</span>
                </div>
              </motion.div>

              {/* Small floating image - behind main */}
              <motion.div
                className="absolute -bottom-10 right-8 w-32 h-32 rounded-xl overflow-hidden shadow-lg shadow-black/30 border-2 border-white/10"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 20px)`,
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&q=80"
                  alt="Design work"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
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
