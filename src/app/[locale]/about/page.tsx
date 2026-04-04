import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getPageSeo } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import { getPageSections } from '@/lib/page-content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TeamSection } from '@/components/sections/TeamSection';
import { CTASection } from '@/components/sections/CTASection';
import { Badge } from '@/components/ui/Badge';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const { Target, Lightbulb, Users, Award, CheckCircle2 } = LucideIcons;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSeo('about', locale);
  if (seo) return seo;
  const t = await getTranslations({ locale, namespace: 'about.hero' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const [teamMembers, sections] = await Promise.all([
    prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: { translations: { where: { locale } } },
    }),
    getPageSections('about', locale),
  ]);

  const storySection = sections.find((s) => s.section === 'story');
  const missionSection = sections.find((s) => s.section === 'mission');
  const visionSection = sections.find((s) => s.section === 'vision');
  const valuesSection = sections.find((s) => s.section === 'values');

  const storyTrans = storySection?.translations[0];
  const missionTrans = missionSection?.translations[0];
  const visionTrans = visionSection?.translations[0];
  const valuesTrans = valuesSection?.translations[0];

  const storyMeta = storySection?.metadata as { image?: string; statValue?: string } | null;
  const valuesMeta = valuesSection?.metadata as { items?: { icon: string }[] } | null;

  let valuesItems: { title: string; desc: string }[] = [];
  if (valuesTrans?.body) {
    try { valuesItems = JSON.parse(valuesTrans.body); } catch { /* ignore */ }
  }

  return (
    <>
      {/* Hero - Full width image */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-950/75" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="gradient" className="mb-6">{storyTrans?.subtitle || t('story.badge')}</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 -mt-12 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-2xl shadow-xl -mt-6 overflow-hidden">
            {[
              { value: storyMeta?.statValue || '150+', label: t('projectsDelivered') },
              { value: '80+', label: t('happyClients') },
              { value: '6+', label: t('yearsExperience') },
              { value: '%98', label: t('satisfaction') },
            ].map((stat, i) => (
              <div key={i} className="p-6 lg:p-8 text-center border-r border-b border-gray-100 last:border-r-0 lg:[&:nth-child(n+3)]:border-b-0">
                <div className="text-2xl lg:text-3xl font-bold text-brand-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {storyTrans?.title || t('story.title')}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
                {(storyTrans?.body || '').split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={storyMeta?.image || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80'}
                  alt={storyTrans?.title || 'Our team'}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Small accent photo */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-white hidden md:block">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&q=80"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('mission.title')} className="mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {missionTrans?.title || 'Misyon'}
              </h3>
              <p className="text-gray-600 leading-relaxed">{missionTrans?.body}</p>
            </div>
            <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-8 lg:p-10 text-white shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                <Lightbulb className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">
                {visionTrans?.title || 'Vizyon'}
              </h3>
              <p className="text-white/85 leading-relaxed">{visionTrans?.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={valuesTrans?.title || t('values.title')} className="mb-16" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {valuesItems.map((item, i) => {
              const iconName = valuesMeta?.items?.[i]?.icon || 'Zap';
              const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[iconName] || LucideIcons.Zap;
              return (
                <div key={i} className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center mb-5 transition-colors">
                    <IconComponent className="h-6 w-6 text-brand-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamSection members={teamMembers} />
      <CTASection />
    </>
  );
}
