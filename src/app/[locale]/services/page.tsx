import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getPageSeo } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CTASection } from '@/components/sections/CTASection';

const { ArrowRight, CheckCircle2 } = LucideIcons;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSeo('services', locale);
  if (seo) return seo;
  const t = await getTranslations({ locale, namespace: 'services.hero' });
  return { title: t('title'), description: t('subtitle') };
}

async function getData(locale: string) {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    include: { translations: { where: { locale } } },
  });
}

const SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80',
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const services = await getData(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/95 to-gray-950" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="gradient" className="mb-6">{t('hero.badge')}</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Services - alternating layout */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-28">
            {services.map((service, i) => {
              const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[service.icon] || LucideIcons.Zap;
              const tr = service.translations[0];
              const features = (tr?.features as string[]) || [];
              const isReversed = i % 2 === 1;
              const img = SERVICE_IMAGES[i % SERVICE_IMAGES.length];

              return (
                <div
                  key={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? 'lg:direction-rtl' : ''}`}
                >
                  {/* Image */}
                  <div className={`relative ${isReversed ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={img}
                        alt={tr?.title || ''}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                    </div>
                    {/* Floating number */}
                    <div className="absolute -top-4 -left-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isReversed ? 'lg:order-1' : ''}>
                    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5">
                      <IconComponent className="h-6 w-6 text-brand-600" />
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{tr?.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{tr?.description}</p>

                    {features.length > 0 && (
                      <ul className="space-y-3 mb-8">
                        {features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-3 text-sm text-gray-700">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {tr?.ctaText && (
                      <Button asChild variant="outline" size="md">
                        <Link href="/contact">
                          {tr.ctaText} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
