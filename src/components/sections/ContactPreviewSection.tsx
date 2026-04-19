'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';

interface ContactPreviewSectionProps {
  contactInfo?: {
    email?: { display?: string; href?: string };
    phone?: { display?: string; href?: string };
    address?: string;
  };
}

export function ContactPreviewSection({ contactInfo }: ContactPreviewSectionProps) {
  const t = useTranslations('home.contact');

  const items = [
    {
      icon: Mail,
      label: contactInfo?.email?.display || 'hello@dahiteknoloji.com',
      href: contactInfo?.email?.href || 'mailto:hello@dahiteknoloji.com',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Phone,
      label: contactInfo?.phone?.display || '+90 212 123 45 67',
      href: contactInfo?.phone?.href || 'tel:+902121234567',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: MapPin,
      label: contactInfo?.address || 'Muratpaşa, Antalya',
      href: undefined,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <section className="py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <SectionHeader title={t('title')} subtitle={t('subtitle')} align="left" className="mb-10" />

            <div className="space-y-4 mb-10">
              {items.map(({ icon: Icon, label, href, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {href ? (
                    <a href={href} className="text-gray-900 font-medium hover:text-brand-600 transition-colors">
                      {label}
                    </a>
                  ) : (
                    <span className="text-gray-900 font-medium">{label}</span>
                  )}
                </motion.div>
              ))}
            </div>

            <Button asChild size="lg" variant="gradient">
              <Link href="/contact">
                {t('ctaButton')} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=700&q=80"
                alt="Modern office"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 opacity-20 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
