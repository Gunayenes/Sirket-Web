import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPageSeo } from '@/lib/seo';
import { JsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from './FaqAccordion';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSeo('faq', locale);
  if (seo) return seo;
  const t = await getTranslations({ locale, namespace: 'faq' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/faq`,
      languages: { tr: `${BASE_URL}/tr/faq`, en: `${BASE_URL}/en/faq` },
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  const categories = t.raw('categories') as Array<{
    title: string;
    items: Array<{ q: string; a: string }>;
  }>;

  // FAQ JSON-LD for Google rich results
  const allQuestions = categories.flatMap((c) => c.items);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: allQuestions.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Ana Sayfa', url: `${BASE_URL}/${locale}` },
          { name: t('title'), url: `${BASE_URL}/${locale}/faq` },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <FaqAccordion categories={categories} />
        </div>
      </section>
    </>
  );
}
