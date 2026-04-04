import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
    default: 'TechCo — Dijital Dönüşüm & Yazılım Çözümleri | Web, Mobil, Bulut',
    template: '%s | TechCo',
  },
  description: 'TechCo, web geliştirme, mobil uygulama, bulut çözümleri ve dijital dönüşüm hizmetleri sunan lider teknoloji şirketidir. Modern teknolojilerle işletmenizi geleceğe taşıyoruz.',
  keywords: [
    'web geliştirme', 'mobil uygulama', 'dijital dönüşüm', 'yazılım çözümleri',
    'React', 'Next.js', 'bulut hizmetleri', 'UI/UX tasarım', 'SEO optimizasyonu',
    'e-ticaret', 'kurumsal yazılım', 'İstanbul yazılım şirketi',
    'web development', 'software company', 'digital transformation',
  ],
  authors: [{ name: 'TechCo', url: BASE_URL }],
  creator: 'TechCo',
  publisher: 'TechCo',
  formatDetection: { telephone: true, email: true },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'TechCo',
    title: 'TechCo — Dijital Dönüşüm & Yazılım Çözümleri',
    description: 'Modern teknolojilerle web, mobil ve bulut çözümleri. 150+ tamamlanan proje, %98 müşteri memnuniyeti.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@techco',
    site: '@techco',
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
      <body>{children}</body>
    </html>
  );
}
