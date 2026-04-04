import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPageSeo } from '@/lib/seo';
import { getSiteSettings } from '@/lib/settings';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContactForm } from '@/components/sections/ContactForm';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSeo('contact', locale);
  if (seo) return seo;
  const t = await getTranslations({ locale, namespace: 'contact.hero' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const contactSettings = await getSiteSettings('contact');

  const address = contactSettings.contact_address as { display: string } | undefined;
  const phone = contactSettings.contact_phone as { display: string; href: string } | undefined;
  const email = contactSettings.contact_email as { display: string; href: string } | undefined;
  const hours = contactSettings.contact_hours as { display: string } | undefined;
  const mapUrl = contactSettings.contact_map_url as { url: string } | undefined;

  const CONTACT_INFO = [
    { icon: MapPin, label: 'address' as const, value: address?.display || 'Levent, İstanbul, Türkiye', href: undefined },
    { icon: Phone, label: 'phone' as const, value: phone?.display || '+90 212 123 45 67', href: phone?.href || 'tel:+902121234567' },
    { icon: Mail, label: 'email' as const, value: email?.display || 'hello@techco.com', href: email?.href || 'mailto:hello@techco.com' },
    { icon: Clock, label: 'hours' as const, value: hours?.display || 'Mon–Fri 09:00–18:00', href: undefined },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-brand-50 to-accent-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('hero.title')} subtitle={t('hero.subtitle')} />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{t('info.address')}</h2>
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
                      {t(`info.${label}` as Parameters<typeof t>[0])}
                    </div>
                    {href ? (
                      <a href={href} className="text-gray-900 hover:text-brand-600 transition-colors font-medium">
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-900 font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mt-8">
                <iframe
                  src={mapUrl?.url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.7!2d29.01!3d41.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzQ4LjAiTiAyOcKwMDAnMzYuMCJF!5e0!3m2!1sen!2str!4v1'}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Office location"
                />
              </div>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2 space-y-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('form.title')}</h2>
                <ContactForm />
              </div>

              {/* Quote Form */}
              <div className="bg-gradient-to-br from-brand-50 to-accent-50 rounded-2xl p-8 border border-brand-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('quote.title')}</h2>
                <p className="text-gray-600 mb-6 text-sm">{t('quote.subtitle')}</p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
