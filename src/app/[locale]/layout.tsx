import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routing } from '@/i18n/routing';
import { prisma } from '@/lib/prisma';
import { getSiteSettings } from '@/lib/settings';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { PageTransition } from '@/components/layout/PageTransition';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { BackToTop } from '@/components/layout/BackToTop';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const getNavServices = unstable_cache(
  async (locale: string) =>
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: { translations: { where: { locale } } },
    }),
  ['nav-services'],
  { tags: ['services'], revalidate: 300 },
);

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'tr')) {
    notFound();
  }

  const [messages, contactSettings, socialSettings, brandingSettings, services] = await Promise.all([
    getMessages(),
    getSiteSettings('contact'),
    getSiteSettings('social'),
    getSiteSettings('branding'),
    getNavServices(locale),
  ]);

  const serviceLinks = services.map(s => ({
    slug: s.slug,
    title: s.translations[0]?.title || s.slug,
    icon: s.icon,
  }));

  const whatsapp = brandingSettings.whatsapp as { phone?: string; messageTr?: string } | undefined;
  const whatsappPhone = whatsapp?.phone || '+905001234567';
  const whatsappMessage = whatsapp?.messageTr || 'Merhaba, bilgi almak istiyorum.';

  const socialLinks = {
    linkedin: (socialSettings.social_linkedin as { url?: string })?.url || '#',
    twitter: (socialSettings.social_twitter as { url?: string })?.url || '#',
    instagram: (socialSettings.social_instagram as { url?: string })?.url || '#',
    github: (socialSettings.social_github as { url?: string })?.url || '#',
  };

  const contactInfo = {
    address: (contactSettings.contact_address as { display?: string })?.display || 'Muratpaşa, Antalya, Türkiye',
    phone: contactSettings.contact_phone as { display?: string; href?: string } || { display: '+90 212 123 45 67', href: 'tel:+902121234567' },
    email: contactSettings.contact_email as { display?: string; href?: string } || { display: 'hello@dahiteknoloji.com', href: 'mailto:hello@dahiteknoloji.com' },
  };

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ScrollProgress />
      <Header services={serviceLinks} />
      <main><PageTransition>{children}</PageTransition></main>
      <Footer socialLinks={socialLinks} contactInfo={contactInfo} />
      <WhatsAppButton phone={whatsappPhone} message={whatsappMessage} />
      <BackToTop />
      <CookieConsent />
      <Analytics />
      <SpeedInsights />
    </NextIntlClientProvider>
  );
}
