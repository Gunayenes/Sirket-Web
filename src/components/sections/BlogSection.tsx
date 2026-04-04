'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate, truncate } from '@/lib/utils';

interface BlogPost {
  id: string;
  slug: string;
  coverImage?: string | null;
  publishedAt?: Date | null;
  translations: Array<{ title: string; excerpt: string }>;
  category?: { translations: Array<{ name: string }> } | null;
}

interface BlogSectionProps {
  posts: BlogPost[];
  locale: string;
}

export function BlogSection({ posts, locale }: BlogSectionProps) {
  const t = useTranslations('home.blog');

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} className="mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                {/* Image */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 mb-5">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.translations[0]?.title || ''}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-100 to-accent-100" />
                  )}
                  {post.category && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="gradient" className="text-xs">
                        {post.category.translations[0]?.name}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  {post.publishedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.publishedAt, locale)}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    5 min
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {post.translations[0]?.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {truncate(post.translations[0]?.excerpt || '', 120)}
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 mt-4 group-hover:gap-2 transition-all">
                  {t('readMore')} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">{t('viewAll')}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
