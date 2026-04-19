import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getPageSeo } from '@/lib/seo';
import { getPageSections } from '@/lib/page-content';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Target, Lightbulb, Sparkles, ArrowRight, CheckCircle2, Zap, Award, Heart, Users, Rocket } from 'lucide-react';
import { getIcon } from '@/lib/icons';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSeo('about', locale);
  if (seo) return seo;
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return {
    title: { absolute: 'Hakkımızda | Dahi Teknoloji — Antalya Merkezli Yazılım Şirketi' },
    description: 'Dahi Teknoloji, Antalya merkezli profesyonel yazılım şirketidir. Kurumsal web, mobil uygulama, CRM/ERP ve yapay zeka alanlarında uzman ekibimizle işletmenizin dijital dönüşümüne liderlik ediyoruz.',
    keywords: ['Dahi Teknoloji hakkında', 'Antalya yazılım şirketi', 'yazılım firması', 'dijital dönüşüm ortağı'],
    alternates: { canonical: `${BASE_URL}/${locale}/about` },
    openGraph: {
      title: 'Hakkımızda | Dahi Teknoloji',
      description: 'Antalya merkezli profesyonel yazılım şirketi. Dijital geleceği şekillendiriyoruz.',
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const sections = await getPageSections('about', locale);

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

  const stats = [
    { value: '8', label: 'Hizmet' },
    { value: '50+', label: 'Müşteri' },
    { value: '150+', label: 'Proje' },
    { value: '6+', label: 'Yıl Deneyim' },
  ];

  return (
    <>
      {/* HERO - Big bold headline */}
      <section className="relative pt-32 pb-32 overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/40 to-gray-950">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-25 bg-purple-600" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 bg-fuchsia-500" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm text-purple-300 text-sm font-medium px-5 py-2.5 rounded-full mb-8 border border-purple-500/20">
              <Sparkles className="h-4 w-4" />
              Hakkımızda
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-8 leading-[1.05]">
              Dijital geleceği <br />
              <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
                şekillendiriyoruz
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Yenilikçi çözümler ve müşteri odaklı yaklaşımımızla işletmelerin dijital dönüşümüne liderlik ediyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE STATEMENT */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-purple-100">
                <Rocket className="h-4 w-4" />
                Yıllarca Süregelen Tecrübe
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
                Sürdürülebilir başarıya <br />
                <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  birlikte ulaşalım
                </span>
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                {(storyTrans?.body || 'Dahi Teknoloji olarak, müşterilerimizin dijital hedeflerine ulaşmasında güvenilir bir ortak olmayı hedefliyoruz. Modern teknolojiler ve uzman ekibimizle her projede mükemmellik için çalışıyoruz.').split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Modern Teknoloji', 'Uzman Ekip', 'Müşteri Odaklı', '7/24 Destek'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">
                    <CheckCircle2 className="inline h-3.5 w-3.5 mr-1.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-purple-200/50">
                <Image
                  src={storyMeta?.image || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80'}
                  alt="Ekibimiz"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 max-w-[200px]">
                <div className="text-4xl font-display font-bold bg-gradient-to-br from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  150+
                </div>
                <div className="text-sm text-gray-500 mt-1 font-medium">
                  Tamamlanan Proje
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-fuchsia-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center text-white">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-purple-100 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                Misyon & Vizyon
              </h2>
              <p className="text-lg text-gray-500">
                Bizi yönlendiren temel değerler
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {missionTrans?.title || 'Misyonumuz'}
                </h3>
                <p className="text-gray-500 leading-relaxed">{missionTrans?.body}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-3xl p-10 text-white shadow-2xl shadow-purple-300/40">
                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {visionTrans?.title || 'Vizyonumuz'}
                </h3>
                <p className="text-purple-50 leading-relaxed">{visionTrans?.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      {valuesItems.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                  {valuesTrans?.title || 'Değerlerimiz'}
                </h2>
                <p className="text-lg text-gray-500">
                  Çalışma şeklimizi tanımlayan ilkeler
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {valuesItems.map((item, i) => {
                  const iconName = valuesMeta?.items?.[i]?.icon || 'Zap';
                  const IconComponent = getIcon(iconName);
                  return (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-7 border border-purple-100 hover:shadow-xl hover:shadow-purple-100 transition-all group"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-950 via-purple-950/40 to-gray-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-30 bg-purple-600" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-5 py-2.5 rounded-full mb-8 border border-white/20">
              <Heart className="h-4 w-4 text-purple-300" />
              Birlikte İlk Adımı Atalım
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Projenize <span className="bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">birlikte başlayalım</span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Dijital hedeflerinize ulaşmak için doğru ortakla çalışın. Ücretsiz danışmanlık için hemen iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="xl" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-2xl shadow-purple-600/30">
                <Link href="/contact">
                  Teklif Al <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="xl" className="bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm">
                <Link href="/services">Hizmetleri İncele</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
