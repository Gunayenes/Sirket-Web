'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';

interface TeamMember {
  id: string;
  photo?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  translations: Array<{ name: string; role: string; bio?: string | null }>;
}

export function TeamSection({ members }: { members: TeamMember[] }) {
  const t = useTranslations('home.team');

  return (
    <section className="py-28 bg-gray-50/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} className="mb-16" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group text-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.translations[0]?.name || ''}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-accent-100">
                    <span className="text-brand-600 font-bold text-4xl">
                      {member.translations[0]?.name?.charAt(0)}
                    </span>
                  </div>
                )}
                {/* Overlay with social links */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex items-center gap-2">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors">
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 mb-0.5">{member.translations[0]?.name}</h4>
              <p className="text-sm text-brand-600 font-medium">{member.translations[0]?.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/about">{t('viewAll')}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
