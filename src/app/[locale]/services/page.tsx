import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import Image from 'next/image';
import { getPageSeo } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import { ArrowRight, CheckCircle2, Sparkles, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { getIcon } from '@/lib/icons';
import { getServiceConfig } from '@/lib/service-configs';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSeo('services', locale);
  if (seo) return seo;
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return {
    title: { absolute: 'Yazılım Hizmetlerimiz | Web, Mobil, CRM/ERP, Yapay Zeka & API Geliştirme — Dahi Teknoloji' },
    description: 'Dahi Teknoloji olarak kurumsal web sitesi, e-ticaret, mobil uygulama, özel yazılım, CRM/ERP, yapay zeka otomasyon, API & backend geliştirme, veri analizi ve teknik destek hizmetleri sunuyoruz.',
    keywords: [
      'kurumsal web sitesi yapımı', 'e-ticaret sitesi geliştirme', 'mobil uygulama geliştirme Antalya',
      'özel yazılım geliştirme', 'iş yönetim sistemi', 'CRM yazılımı', 'ERP çözümleri',
      'yapay zeka otomasyon', 'chatbot geliştirme', 'API geliştirme', 'backend geliştirme',
      'veri analizi', 'iş zekası', 'teknik destek', 'yazılım bakım hizmeti',
    ],
    alternates: { canonical: `${BASE_URL}/${locale}/services` },
    openGraph: {
      title: 'Yazılım Hizmetlerimiz | Dahi Teknoloji',
      description: 'Web, mobil, CRM/ERP, yapay zeka, API geliştirme ve teknik destek. 8 farklı alanda profesyonel yazılım hizmetleri.',
    },
  };
}

const getData = unstable_cache(
  async (locale: string) =>
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: { translations: { where: { locale } } },
    }),
  ['services-page'],
  { tags: ['services'], revalidate: 300 },
);

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const services = await getData(locale);
  const svcBase = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd items={[
        { name: 'Ana Sayfa', url: `${svcBase}/tr` },
        { name: 'Hizmetler', url: `${svcBase}/tr/services` },
      ]} />
      {services.map((service) => {
        const tr = service.translations[0];
        if (!tr) return null;
        return <ServiceJsonLd key={service.id} name={tr.title} description={tr.description} locale={locale} />;
      })}

      {/* HERO - Dark gradient with image */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/40 to-gray-950">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-purple-950/60 to-gray-950/80" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-40 bg-purple-600" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-30 bg-fuchsia-500" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm text-purple-300 text-sm font-medium px-5 py-2.5 rounded-full mb-8 border border-purple-500/20">
            <Sparkles className="h-4 w-4" />
            Profesyonel Çözümler
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-[1.05]">
            Yazılım <br />
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
              Hizmetlerimiz
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            8 farklı alanda profesyonel yazılım çözümleri. Web, mobil, CRM/ERP, yapay zeka ve daha fazlası.
          </p>
        </div>
      </section>

      {/* SERVICES GRID - Each card has unique color from config */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {services.map((service, i) => {
              const IconComponent = getIcon(service.icon);
              const tr = service.translations[0];
              const features = (tr?.features as string[]) || [];
              const config = getServiceConfig(service.slug);

              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}` as never}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  {/* Top image with gradient overlay */}
                  <div className="relative aspect-[16/8] overflow-hidden">
                    <Image
                      src={config.featureImage}
                      alt={tr?.title || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                      loading={i < 2 ? 'eager' : 'lazy'}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${config.heroGradient} opacity-75 group-hover:opacity-60 transition-opacity duration-500`} />

                    {/* Service number */}
                    <div className="absolute top-5 left-5 text-white/30 font-display text-7xl font-bold leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Icon at bottom */}
                    <div className="absolute bottom-5 right-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.iconBg} flex items-center justify-center shadow-2xl`}>
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 lg:p-8">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {tr?.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed text-sm lg:text-base mb-5 line-clamp-3">
                      {tr?.description}
                    </p>

                    {features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {features.slice(0, 3).map((f, fi) => (
                          <li key={fi} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className={`inline-flex items-center gap-2 ${config.badgeColor} font-semibold text-sm group-hover:gap-3 transition-all`}
                      style={{ filter: 'brightness(0.7)' }}
                    >
                      Detayları Gör <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Hover gradient border */}
                  <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${config.iconBg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-purple-100">
                <Sparkles className="h-4 w-4" />
                Neden Dahi Teknoloji?
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                Tek Partner, <br />
                <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  8 Farklı Hizmet
                </span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Tüm dijital ihtiyaçlarınızı karşılayan tam kapsamlı çözüm ortağınız.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: '150+', label: 'Tamamlanan Proje' },
                { value: '50+', label: 'Mutlu Müşteri' },
                { value: '8', label: 'Hizmet Alanı' },
                { value: '7/24', label: 'Teknik Destek' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-6 text-center border border-purple-100"
                >
                  <div className="text-4xl lg:text-5xl font-display font-bold bg-gradient-to-br from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-950 via-purple-950/40 to-gray-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-30 bg-purple-600" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Projenize <span className="bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">birlikte başlayalım</span>
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Ücretsiz danışmanlık ve teklif için hemen iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="xl" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-2xl shadow-purple-600/30">
                <Link href="/contact">
                  Ücretsiz Teklif Al <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="xl" className="bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm">
                <a href="tel:+905427460197">
                  <Phone className="h-4 w-4" /> 0542 746 01 97
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
