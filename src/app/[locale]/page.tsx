import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getPageSeo } from '@/lib/seo';
import { getSiteSettings } from '@/lib/settings';
import { HeroSection }    from '@/components/sections/HeroSection';
import { StatsSection }   from '@/components/sections/StatsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ProcessSection }  from '@/components/sections/ProcessSection';
import { TeamSection }     from '@/components/sections/TeamSection';
import { BlogSection }     from '@/components/sections/BlogSection';
import { CTASection }      from '@/components/sections/CTASection';
import { WhyUsSection }    from '@/components/sections/WhyUsSection';
import { ContactPreviewSection } from '@/components/sections/ContactPreviewSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSeo('home', locale);
  if (seo) return seo;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: 'TechCo — Digital Transformation Partner',
    description: t('hero.subtitle'),
  };
}

async function getData(locale: string) {
  const [services, projects, teamMembers, blogPosts, statsSettings, contactSettings] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 6,
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
    prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      take: 4,
      include: { translations: { where: { locale } } },
    }),
    prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      include: {
        translations: { where: { locale } },
        category: { include: { translations: { where: { locale } } } },
      },
    }),
    getSiteSettings('stats'),
    getSiteSettings('contact'),
  ]);

  // Build stats from settings
  const statsKeys = ['stats_projects', 'stats_clients', 'stats_years', 'stats_team'];
  const statsLabels = ['projects', 'clients', 'years', 'team'];
  const stats = statsKeys.map((key, i) => {
    const val = statsSettings[key] as { value?: number; suffix?: string } | undefined;
    return {
      value: val?.value || [150, 80, 6, 12][i],
      suffix: val?.suffix ?? ['+', '+', '+', ''][i],
      key: statsLabels[i],
    };
  });

  const contactInfo = {
    email: contactSettings.contact_email as { display?: string; href?: string } | undefined,
    phone: contactSettings.contact_phone as { display?: string; href?: string } | undefined,
    address: (contactSettings.contact_address as { display?: string } | undefined)?.display,
  };

  return { services, projects, teamMembers, blogPosts, stats, contactInfo };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { services, projects, teamMembers, blogPosts, stats, contactInfo } = await getData(locale);

  return (
    <>
      <HeroSection />
      <StatsSection stats={stats} />
      <ServicesSection services={services} />
      <WhyUsSection />
      <ProjectsSection projects={projects} />
      <ProcessSection />
      <TeamSection members={teamMembers} />
      <BlogSection posts={blogPosts} locale={locale} />
      <CTASection />
      <ContactPreviewSection contactInfo={contactInfo} />
    </>
  );
}
