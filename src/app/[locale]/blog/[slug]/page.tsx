import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BlogPostJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { formatDate } from '@/lib/utils';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { translations: { where: { locale } }, category: { include: { translations: { where: { locale } } } } },
  });
  if (!post) return {};
  const t = post.translations[0];
  return {
    title: t?.metaTitle || t?.title,
    description: t?.metaDesc || t?.excerpt,
    keywords: post.tags.length > 0 ? post.tags : undefined,
    openGraph: {
      title: t?.metaTitle || t?.title || '',
      description: t?.metaDesc || t?.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630 }] : undefined,
      section: post.category?.translations[0]?.name,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: t?.metaTitle || t?.title || '',
      description: t?.metaDesc || t?.excerpt || '',
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: { tr: `${BASE_URL}/tr/blog/${slug}`, en: `${BASE_URL}/en/blog/${slug}` },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const post = await prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
    include: {
      translations: { where: { locale } },
      category: { include: { translations: { where: { locale } } } },
    },
  });

  if (!post) notFound();

  const translation = post.translations[0];
  const readTime = Math.ceil((translation?.content?.split(' ').length || 0) / 200);

  // Related posts
  const related = await prisma.blogPost.findMany({
    where: { isPublished: true, categoryId: post.categoryId, NOT: { id: post.id } },
    take: 3,
    include: { translations: { where: { locale } } },
  });

  return (
    <article className="pt-32 pb-24">
      <BlogPostJsonLd
        title={translation?.title || ''}
        description={translation?.excerpt || ''}
        slug={slug}
        publishedAt={post.publishedAt?.toISOString() || post.createdAt.toISOString()}
        updatedAt={post.updatedAt.toISOString()}
        coverImage={post.coverImage}
        locale={locale}
        category={post.category?.translations[0]?.name}
        tags={post.tags}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Ana Sayfa', url: `${BASE_URL}/${locale}` },
        { name: 'Blog', url: `${BASE_URL}/${locale}/blog` },
        { name: translation?.title || '', url: `${BASE_URL}/${locale}/blog/${slug}` },
      ]} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back */}
        <Button asChild variant="ghost" size="sm" className="mb-8 text-gray-600">
          <Link href="/blog"><ArrowLeft className="h-4 w-4" /> {t('backToBlog')}</Link>
        </Button>

        {/* Header */}
        <header className="mb-10">
          {post.category && (
            <Badge variant="gradient" className="mb-4">{post.category.translations[0]?.name}</Badge>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            {translation?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt, locale)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {readTime} {t('minuteRead')}
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-[2/1] rounded-3xl overflow-hidden bg-gray-100 mb-12">
            <Image src={post.coverImage} alt={translation?.title || ''} fill className="object-cover" priority />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-brand-600"
          dangerouslySetInnerHTML={{ __html: translation?.content || '' }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16 pt-8 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('relatedPosts')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group">
                  <h4 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 text-sm">
                    {r.translations[0]?.title}
                  </h4>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
