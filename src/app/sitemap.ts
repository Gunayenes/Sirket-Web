import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const staticPages = [
    { path: '', priority: 1, freq: 'daily' as const },
    { path: '/services', priority: 0.9, freq: 'weekly' as const },
    { path: '/about', priority: 0.8, freq: 'monthly' as const },
    { path: '/projects', priority: 0.9, freq: 'weekly' as const },
    { path: '/contact', priority: 0.8, freq: 'monthly' as const },
    { path: '/faq', priority: 0.7, freq: 'monthly' as const },
    { path: '/privacy', priority: 0.3, freq: 'yearly' as const },
    { path: '/terms', priority: 0.3, freq: 'yearly' as const },
  ];

  for (const page of staticPages) {
    entries.push({
      url: `${BASE_URL}/tr${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.freq,
      priority: page.priority,
    });
  }

  return entries;
}
