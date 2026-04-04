import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getPageSeo } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Calendar, ArrowRight, Clock, TrendingUp, Search } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSeo('blog', locale);
  if (seo) return seo;
  const t = await getTranslations({ locale, namespace: 'blog.hero' });
  return { title: t('title'), description: t('subtitle') };
}

async function getData(locale: string) {
  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      include: {
        translations: { where: { locale } },
        category: { include: { translations: { where: { locale } } } },
      },
    }),
    prisma.blogCategory.findMany({
      include: {
        translations: { where: { locale } },
        _count: { select: { posts: { where: { isPublished: true } } } },
      },
    }),
  ]);
  return { posts, categories };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const { posts: allPosts, categories } = await getData(locale);

  const posts = q
    ? allPosts.filter((p) => {
        const title = p.translations[0]?.title?.toLowerCase() || '';
        const excerpt = p.translations[0]?.excerpt?.toLowerCase() || '';
        const search = q.toLowerCase();
        return title.includes(search) || excerpt.includes(search) || p.tags.some((tag) => tag.toLowerCase().includes(search));
      })
    : allPosts;

  const featured = q ? null : posts[0];
  const secondary = q ? [] : posts.slice(1, 3);
  const rest = q ? posts : posts.slice(3);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-2">
                {t('hero.title')}
              </h1>
              <p className="text-gray-500">
                {t('hero.subtitle')}
              </p>
            </div>
            <form action="" method="get" className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  name="q"
                  defaultValue={q || ''}
                  placeholder={'Yazılarda ara...'}
                  className="w-56 pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </form>
          </div>

          {/* Category tabs */}
          {categories.length > 0 && (
            <div className="flex gap-2 mt-8 overflow-x-auto pb-2">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-brand-600 text-white shrink-0">
                {'Tümü'}
              </span>
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer shrink-0"
                >
                  {cat.translations[0]?.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Search results header */}
      {q && (
        <section className="pt-8 pb-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">&ldquo;{q}&rdquo;</span>
              {' '}{`için ${posts.length} sonuç bulundu`}
              {' · '}
              <Link href="/blog" className="text-brand-600 hover:underline">
                {'Temizle'}
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* Featured + Secondary */}
      {featured && (
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main featured */}
              <Link href={`/blog/${featured.slug}`} className="group lg:col-span-2">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 mb-5">
                  {featured.coverImage ? (
                    <Image
                      src={featured.coverImage}
                      alt={featured.translations[0]?.title || ''}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-100 to-accent-100" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    {featured.category && (
                      <Badge variant="gradient" className="mb-3">{featured.category.translations[0]?.name}</Badge>
                    )}
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-brand-200 transition-colors">
                      {featured.translations[0]?.title}
                    </h2>
                    <p className="text-gray-300 line-clamp-2 max-w-2xl text-sm lg:text-base">
                      {featured.translations[0]?.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-4">
                      {featured.publishedAt && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(featured.publishedAt, locale)}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        5 {t('minuteRead')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Secondary posts - stacked */}
              <div className="flex flex-col gap-6">
                {secondary.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.translations[0]?.title || ''}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-100 to-accent-100" />
                      )}
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      {post.category && (
                        <span className="text-xs font-semibold text-brand-600 mb-1.5">
                          {post.category.translations[0]?.name}
                        </span>
                      )}
                      <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 text-[15px] leading-snug mb-2">
                        {post.translations[0]?.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {post.publishedAt && (
                          <span>{formatDate(post.publishedAt, locale)}</span>
                        )}
                        <span>5 {t('minuteRead')}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      {rest.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-100" />
        </div>
      )}

      {/* Rest of posts - grid */}
      {rest.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-gray-900 mb-8">
              {'Tüm Yazılar'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 mb-4">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.translations[0]?.title || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-50 to-accent-50" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    {post.category && (
                      <span className="text-xs font-semibold text-brand-600">{post.category.translations[0]?.name}</span>
                    )}
                    {post.publishedAt && (
                      <span className="text-xs text-gray-400">{formatDate(post.publishedAt, locale)}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
                    {post.translations[0]?.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{post.translations[0]?.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 mt-3 group-hover:gap-2 transition-all">
                    {t('readMore')} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center text-gray-500">
            {'Henüz yazı yayınlanmamış.'}
          </div>
        </section>
      )}
    </>
  );
}
