import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { getIcon } from '@/lib/icons';
import { getServiceConfig } from '@/lib/service-configs';
import {
  ArrowRight, CheckCircle2, Sparkles, Zap, ShieldCheck, Clock, Users,
  ChevronRight, Phone, ExternalLink,
} from 'lucide-react';

export const revalidate = 3600; // Service detail pages: rebuild once per hour
export const dynamicParams = true; // Allow new slugs added at runtime

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Map each service to relevant project category slugs
const SERVICE_PROJECT_CATEGORIES: Record<string, string[]> = {
  'web-ecommerce': ['web-app', 'ecommerce'],
  'mobile-apps': ['mobile'],
  'custom-software': ['web-app'],
  'crm-erp': ['web-app'],
  'ai-automation': ['web-app'],
  'api-backend': ['web-app'],
  'data-analytics': ['web-app'],
  'support-maintenance': ['web-app', 'ecommerce', 'mobile'],
};

export async function generateStaticParams() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
    include: { translations: { where: { locale } } },
  });
  if (!service) return { title: 'Hizmet bulunamadı' };
  const tr = service.translations[0];
  return {
    title: { absolute: `${tr?.title || slug} | Dahi Teknoloji` },
    description: tr?.description || '',
    alternates: { canonical: `${BASE_URL}/${locale}/services/${slug}` },
    openGraph: {
      title: `${tr?.title} | Dahi Teknoloji`,
      description: tr?.description || '',
    },
  };
}

const BENEFITS = [
  { icon: Zap, title: 'Hızlı Teslim', desc: 'Agile metodoloji ile zamanında teslim' },
  { icon: ShieldCheck, title: 'Güvenli Yapı', desc: 'En üst düzey güvenlik standartları' },
  { icon: Users, title: 'Uzman Ekip', desc: 'Alanında deneyimli profesyoneller' },
  { icon: Clock, title: '7/24 Destek', desc: 'Sürekli teknik destek hizmeti' },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const config = getServiceConfig(slug);
  const projectCategories = SERVICE_PROJECT_CATEGORIES[slug] || [];

  const [service, otherServices, exampleProjects] = await Promise.all([
    prisma.service.findUnique({
      where: { slug },
      include: { translations: { where: { locale } } },
    }),
    prisma.service.findMany({
      where: { isActive: true, slug: { not: slug } },
      orderBy: { order: 'asc' },
      take: 3,
      include: { translations: { where: { locale } } },
    }),
    prisma.project.findMany({
      where: {
        isActive: true,
        ...(projectCategories.length > 0
          ? { category: { slug: { in: projectCategories } } }
          : {}),
      },
      orderBy: { isFeatured: 'desc' },
      take: 4,
      include: {
        translations: { where: { locale } },
        category: { include: { translations: { where: { locale } } } },
      },
    }),
  ]);

  if (!service) notFound();

  const tr = service.translations[0];
  const features = (tr?.features as string[]) || [];
  const ServiceIcon = getIcon(service.icon);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Ana Sayfa', url: `${BASE_URL}/${locale}` },
          { name: 'Hizmetler', url: `${BASE_URL}/${locale}/services` },
          { name: tr?.title || slug, url: `${BASE_URL}/${locale}/services/${slug}` },
        ]}
      />
      <ServiceJsonLd name={tr?.title || ''} description={tr?.description || ''} locale={locale} />

      {/* HERO - Custom per service */}
      <section className={`relative pt-32 pb-24 overflow-hidden bg-gradient-to-br ${config.heroGradient}`}>
        {config.heroImage && (
          <>
            <div className="absolute inset-0">
              <Image src={config.heroImage} alt="" fill className="object-cover" priority />
            </div>
            <div className={`absolute inset-0 bg-gradient-to-br ${config.heroGradient} opacity-80`} />
          </>
        )}
        <div className={`absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-50 ${config.heroOrbColor}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-40 ${config.heroOrbColor}`} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 max-w-5xl mx-auto">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/services" className="hover:text-white">Hizmetler</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className={config.badgeColor}>{tr?.title}</span>
          </div>

          <div className="max-w-5xl mx-auto text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${config.iconBg} mb-8 shadow-2xl`}>
              <ServiceIcon className="h-10 w-10 text-white" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {tr?.title?.split(' ').slice(0, -1).join(' ')}{' '}
              <span className={`bg-gradient-to-r ${config.textGradient} bg-clip-text text-transparent`}>
                {tr?.title?.split(' ').slice(-1)}
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
              {tr?.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="xl" className={`bg-gradient-to-r ${config.iconBg} text-white shadow-2xl`}>
                <Link href="/contact">
                  {tr?.ctaText || 'Teklif Al'} <ArrowRight className="h-5 w-5" />
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

      {/* CUSTOM VISUAL SECTION - Each service has unique visual */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 ${config.badgeBg} ${config.badgeColor} text-sm font-medium px-4 py-2 rounded-full mb-4 border ${config.badgeBorder}`}>
              <Sparkles className="h-4 w-4" />
              Demo
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-3">
              {config.visualTitle}
            </h2>
            <p className="text-lg text-gray-500">{config.visualSubtitle}</p>
          </div>

          <div className="text-center">{config.visual}</div>

          {/* Service-specific stats below visual */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
            {config.stats.map((stat, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-xl transition-all`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${config.iconBg} mb-3 shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-display font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {features.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                  Hizmet Kapsamımız
                </h2>
                <p className="text-lg text-gray-500">
                  Bu hizmet kapsamında size sunduğumuz detaylar
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.iconBg} flex items-center justify-center shrink-0 shadow-lg`}>
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{feature}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TECH STACK */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-6">
              Kullandığımız Teknolojiler
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {config.techStack.map((tech, i) => (
                <span
                  key={i}
                  className={`px-5 py-2.5 ${config.badgeBg} ${config.badgeColor} rounded-full text-sm font-semibold border ${config.badgeBorder}`}
                  style={{ filter: 'brightness(1.5)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXAMPLE PROJECTS - Category-specific */}
      {exampleProjects.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className={`inline-flex items-center gap-2 ${config.badgeBg} ${config.badgeColor} text-sm font-medium px-4 py-2 rounded-full mb-4 border ${config.badgeBorder}`}>
                  <Sparkles className="h-4 w-4" />
                  Örnek Projeler
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                  Bu Alanda Yaptıklarımız
                </h2>
                <p className="text-lg text-gray-500">
                  {tr?.title} alanında tamamladığımız projeler
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exampleProjects.map((proj) => {
                  const projTr = proj.translations[0];
                  return (
                    <div
                      key={proj.id}
                      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${config.iconBg} p-1 shadow-xl`}
                    >
                      <div className="bg-white rounded-[1.4rem] overflow-hidden">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={proj.image}
                            alt={projTr?.title || ''}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {proj.category && (
                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${config.iconBg}`}>
                              {proj.category.translations[0]?.name}
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {projTr?.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                            {projTr?.description}
                          </p>
                          {proj.externalUrl && (
                            <a
                              href={proj.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 text-sm font-semibold ${config.badgeColor.replace('300', '600')}`}
                              style={{ filter: 'brightness(0.7)' }}
                            >
                              İncele <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg">
                  <Link href="/projects">Tüm Projeleri Gör</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BENEFITS */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                Neden Dahi Teknoloji?
              </h2>
              <p className="text-lg text-gray-500">
                Bu hizmette farkımızı yaratan değerler
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((benefit, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.iconBg} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-500">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      {otherServices.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-10 text-center">
                Diğer Hizmetlerimiz
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {otherServices.map((other) => {
                  const otherTr = other.translations[0];
                  const OtherIcon = getIcon(other.icon);
                  const otherCfg = getServiceConfig(other.slug);
                  return (
                    <Link
                      key={other.id}
                      href={`/services/${other.slug}` as never}
                      className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${otherCfg.iconBg} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <OtherIcon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        {otherTr?.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{otherTr?.description}</p>
                      <div className="mt-4 text-purple-600 text-sm font-semibold inline-flex items-center gap-1">
                        Detayları Gör <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={`py-24 bg-gradient-to-br ${config.heroGradient} relative overflow-hidden`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-30 ${config.heroOrbColor}`} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
              {tr?.title} hizmeti için <br />
              <span className={`bg-gradient-to-r ${config.textGradient} bg-clip-text text-transparent`}>
                hemen iletişime geçin
              </span>
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Ücretsiz danışmanlık ve teklif için hazırız.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="xl" className={`bg-gradient-to-r ${config.iconBg} text-white shadow-2xl`}>
                <Link href="/contact">
                  Teklif Al <ArrowRight className="h-5 w-5" />
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
