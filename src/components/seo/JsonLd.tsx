export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': ['Organization', 'LocalBusiness'],
          '@id': `${BASE_URL}/#organization`,
          name: 'Dahi Teknoloji',
          legalName: 'Dahi Teknoloji',
          url: BASE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/logo.png`,
            width: 512,
            height: 512,
          },
          image: `${BASE_URL}/logo.png`,
          description: 'Kurumsal web sitesi, e-ticaret, mobil uygulama, CRM/ERP, yapay zeka otomasyon, API geliştirme, veri analizi ve teknik destek hizmetleri sunan Antalya merkezli profesyonel yazılım şirketi.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Muratpaşa',
            addressRegion: 'Antalya',
            addressCountry: 'TR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 36.8869,
            longitude: 30.7025,
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              availableLanguage: ['Turkish', 'English'],
            },
            {
              '@type': 'ContactPoint',
              contactType: 'sales',
              availableLanguage: ['Turkish', 'English'],
            },
          ],
          areaServed: [
            { '@type': 'Country', name: 'Turkey' },
            { '@type': 'Country', name: 'Germany' },
            { '@type': 'Country', name: 'United Kingdom' },
            { '@type': 'Country', name: 'Netherlands' },
          ],
          knowsAbout: [
            'Kurumsal Web Sitesi Geliştirme',
            'E-Ticaret Platformu Geliştirme',
            'Mobil Uygulama Geliştirme',
            'Özel Yazılım Geliştirme',
            'CRM Yazılımı',
            'ERP Çözümleri',
            'Yapay Zeka & Otomasyon',
            'API & Backend Geliştirme',
            'Veri Analizi & İş Zekası',
            'Teknik Destek & Bakım',
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Yazılım Hizmetleri',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kurumsal Web & E-Ticaret Çözümleri' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobil Uygulama Geliştirme' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Özel Yazılım & İş Yönetim Sistemleri' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM / ERP Çözümleri' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yapay Zeka & Otomasyon Sistemleri' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'API & Backend Geliştirme' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Veri Analizi & Raporlama' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Teknik Destek & Bakım Hizmetleri' } },
            ],
          },
          sameAs: [
            'https://linkedin.com/company/dahiteknoloji',
            'https://twitter.com/dahiteknoloji',
            'https://instagram.com/dahiteknoloji',
            'https://github.com/dahiteknoloji',
          ],
        }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        name: 'Dahi Teknoloji',
        url: BASE_URL,
        publisher: { '@id': `${BASE_URL}/#organization` },
        inLanguage: 'tr-TR',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE_URL}/tr/services`,
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  locale,
}: {
  name: string;
  description: string;
  locale: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        provider: {
          '@type': 'Organization',
          name: 'Dahi Teknoloji',
          url: BASE_URL,
        },
        areaServed: { '@type': 'Country', name: 'Turkey' },
        serviceType: name,
        inLanguage: 'tr-TR',
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
