import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Dahi Teknoloji | Kurumsal Web Sitesi, Mobil Uygulama & Özel Yazılım Geliştirme',
    template: '%s | Dahi Teknoloji — Yazılım & Dijital Çözümler',
  },
  description: 'Dahi Teknoloji ile kurumsal web sitesi, e-ticaret, mobil uygulama, CRM/ERP, yapay zeka otomasyon ve özel yazılım çözümleri geliştirin. Antalya merkezli yazılım şirketi olarak API geliştirme, veri analizi ve 7/24 teknik destek hizmetleri sunuyoruz.',
  keywords: [
    // Ana hizmetler
    'kurumsal web sitesi yapımı', 'e-ticaret sitesi geliştirme', 'mobil uygulama geliştirme',
    'özel yazılım geliştirme', 'CRM yazılımı', 'ERP çözümleri', 'yapay zeka otomasyon',
    'API geliştirme', 'backend geliştirme', 'veri analizi', 'iş zekası raporlama',
    'teknik destek hizmetleri', 'yazılım bakım hizmeti',
    // Teknolojiler
    'React', 'Next.js', 'React Native', 'Flutter', 'Node.js', 'TypeScript', 'Python',
    'PostgreSQL', 'GraphQL', 'REST API', 'microservices',
    // Yerel SEO
    'Antalya yazılım şirketi', 'Türkiye yazılım firması', 'web tasarım ajansı Antalya',
    'mobil uygulama firması', 'yazılım danışmanlık',
    // İngilizce
    'custom software development Turkey', 'web development company Antalya',
    'mobile app development', 'enterprise software solutions',
  ],
  authors: [{ name: 'Dahi Teknoloji', url: BASE_URL }],
  creator: 'Dahi Teknoloji',
  publisher: 'Dahi Teknoloji',
  formatDetection: { telephone: true, email: true },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Dahi Teknoloji',
    title: 'Dahi Teknoloji | Kurumsal Web, Mobil Uygulama & Özel Yazılım Çözümleri',
    description: 'E-ticaret, mobil uygulama, CRM/ERP, yapay zeka otomasyon ve özel yazılım geliştirme. Antalya merkezli profesyonel yazılım şirketi.',
    images: [{ url: `${BASE_URL}/logo.png`, width: 512, height: 512, alt: 'Dahi Teknoloji Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@dahiteknoloji',
    site: '@dahiteknoloji',
    title: 'Dahi Teknoloji | Yazılım & Dijital Çözümler',
    description: 'Kurumsal web, mobil uygulama, CRM/ERP, yapay zeka ve özel yazılım çözümleri.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${BASE_URL}/tr`,
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.variable}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18082300840"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-18082300840');`}
        </Script>
      </body>
    </html>
  );
}
