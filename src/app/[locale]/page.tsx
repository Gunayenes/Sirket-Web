import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getPageSeo } from '@/lib/seo';
import { getSiteSettings } from '@/lib/settings';
import { HeroSection }    from '@/components/sections/HeroSection';
import { StatsSection }   from '@/components/sections/StatsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ProcessSection }  from '@/components/sections/ProcessSection';
import { WhyUsSection }    from '@/components/sections/WhyUsSection';
import { ContactPreviewSection } from '@/components/sections/ContactPreviewSection';

export const revalidate = 300; // ISR: rebuild once per 5 minutes

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSeo('home', locale);
  if (seo) return seo;
  return {
    title: { absolute: 'Dahi Teknoloji | Kurumsal Web Sitesi, E-Ticaret, Mobil Uygulama & Yazılım Geliştirme' },
    description: 'Dahi Teknoloji ile kurumsal web sitesi, e-ticaret platformu, mobil uygulama, CRM/ERP, yapay zeka otomasyon ve özel yazılım projelerinizi hayata geçirin. Antalya merkezli profesyonel yazılım şirketi.',
    keywords: ['kurumsal web sitesi', 'e-ticaret geliştirme', 'mobil uygulama', 'özel yazılım', 'CRM', 'ERP', 'yapay zeka', 'Antalya yazılım şirketi'],
    openGraph: {
      title: 'Dahi Teknoloji | Web, Mobil & Özel Yazılım Çözümleri',
      description: 'Kurumsal web sitesi, e-ticaret, mobil uygulama, CRM/ERP ve yapay zeka çözümleri. Profesyonel yazılım geliştirme hizmetleri.',
    },
  };
}

const getHomeContent = unstable_cache(
  async (locale: string) => {
    const [services, projects] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        take: 8,
        include: { translations: { where: { locale } } },
      }),
      prisma.project.findMany({
        where: { isActive: true, isFeatured: true },
        orderBy: { order: 'asc' },
        take: 4,
        include: {
          translations: { where: { locale } },
          category: { include: { translations: { where: { locale } } } },
        },
      }),
    ]);
    return { services, projects };
  },
  ['home-content'],
  { tags: ['services', 'projects'], revalidate: 300 },
);

async function getData(locale: string) {
  const [{ services, projects }, statsSettings, contactSettings] = await Promise.all([
    getHomeContent(locale),
    getSiteSettings('stats'),
    getSiteSettings('contact'),
  ]);

  // Build stats from settings
  const statsKeys = ['stats_projects', 'stats_clients', 'stats_years'];
  const statsLabels = ['projects', 'clients', 'years'];
  const stats = statsKeys.map((key, i) => {
    const val = statsSettings[key] as { value?: number; suffix?: string } | undefined;
    return {
      value: val?.value || [150, 80, 6][i],
      suffix: val?.suffix ?? ['+', '+', '+'][i],
      key: statsLabels[i],
    };
  });

  const contactInfo = {
    email: contactSettings.contact_email as { display?: string; href?: string } | undefined,
    phone: contactSettings.contact_phone as { display?: string; href?: string } | undefined,
    address: (contactSettings.contact_address as { display?: string } | undefined)?.display,
  };

  return { services, projects, stats, contactInfo };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { services, projects, stats, contactInfo } = await getData(locale);

  return (
    <>
      <HeroSection />
      <ServicesSection services={services} />
      <StatsSection stats={stats} />
      <ProjectsSection projects={projects} />
      <WhyUsSection />
      <ProcessSection />
      <ContactPreviewSection contactInfo={contactInfo} />
    </>
  );
}
