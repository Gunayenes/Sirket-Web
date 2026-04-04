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
        '@type': 'Organization',
        name: 'TechCo',
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        description: 'Dijital dönüşüm, web geliştirme, mobil uygulama ve yazılım çözümleri sunan teknoloji şirketi.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'İstanbul',
          addressCountry: 'TR',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['Turkish', 'English'],
        },
        sameAs: [
          'https://linkedin.com/company/techco',
          'https://twitter.com/techco',
          'https://instagram.com/techco',
          'https://github.com/techco',
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
        name: 'TechCo',
        url: BASE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE_URL}/tr/blog?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

export function BlogPostJsonLd({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  coverImage,
  locale,
  category,
  tags,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  coverImage?: string | null;
  locale: string;
  category?: string;
  tags?: string[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        datePublished: publishedAt,
        dateModified: updatedAt,
        image: coverImage || `${BASE_URL}/og-default.png`,
        author: {
          '@type': 'Organization',
          name: 'TechCo',
        },
        publisher: {
          '@type': 'Organization',
          name: 'TechCo',
          logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/${locale}/blog/${slug}`,
        },
        ...(category && { articleSection: category }),
        ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
        inLanguage: 'tr-TR',
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
          name: 'TechCo',
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
