import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Admin user
  const hashedPw = await bcrypt.hash('admin123456', 12);
  await prisma.user.upsert({
    where: { email: 'admin@techco.com' },
    update: {},
    create: {
      email: 'admin@techco.com',
      password: hashedPw,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Admin user created: admin@techco.com / admin123456');

  // Services
  const services = [
    {
      slug: 'web-development',
      icon: 'Code2',
      order: 1,
      translations: [
        { locale: 'tr', title: 'Web Geliştirme', description: 'Modern, hızlı ve ölçeklenebilir web uygulamaları geliştiriyoruz.', features: ['React/Next.js', 'TypeScript', 'RESTful API', 'Responsive Design'], ctaText: 'Hemen Başlayalım' },
        { locale: 'en', title: 'Web Development', description: 'We build modern, fast, and scalable web applications.', features: ['React/Next.js', 'TypeScript', 'RESTful API', 'Responsive Design'], ctaText: 'Get Started' },
      ],
    },
    {
      slug: 'mobile-apps',
      icon: 'Smartphone',
      order: 2,
      translations: [
        { locale: 'tr', title: 'Mobil Uygulama', description: 'iOS ve Android için yüksek performanslı mobil uygulamalar.', features: ['React Native', 'Flutter', 'App Store Deploy', 'Push Notifications'], ctaText: 'Teklif Al' },
        { locale: 'en', title: 'Mobile Apps', description: 'High-performance mobile applications for iOS and Android.', features: ['React Native', 'Flutter', 'App Store Deploy', 'Push Notifications'], ctaText: 'Get a Quote' },
      ],
    },
    {
      slug: 'ui-ux-design',
      icon: 'Palette',
      order: 3,
      translations: [
        { locale: 'tr', title: 'UI/UX Tasarım', description: 'Kullanıcı deneyimini ön planda tutan estetik arayüzler tasarlıyoruz.', features: ['Figma', 'Prototyping', 'User Research', 'Design Systems'], ctaText: 'Portföyü İncele' },
        { locale: 'en', title: 'UI/UX Design', description: 'We design aesthetic interfaces that prioritize user experience.', features: ['Figma', 'Prototyping', 'User Research', 'Design Systems'], ctaText: 'View Portfolio' },
      ],
    },
    {
      slug: 'cloud-solutions',
      icon: 'Cloud',
      order: 4,
      translations: [
        { locale: 'tr', title: 'Cloud Çözümleri', description: 'AWS, GCP ve Azure üzerinde ölçeklenebilir bulut mimarileri.', features: ['AWS/GCP/Azure', 'Kubernetes', 'CI/CD', 'Monitoring'], ctaText: 'Danışmanlık Al' },
        { locale: 'en', title: 'Cloud Solutions', description: 'Scalable cloud architectures on AWS, GCP, and Azure.', features: ['AWS/GCP/Azure', 'Kubernetes', 'CI/CD', 'Monitoring'], ctaText: 'Get Consulting' },
      ],
    },
    {
      slug: 'seo-marketing',
      icon: 'TrendingUp',
      order: 5,
      translations: [
        { locale: 'tr', title: 'SEO & Pazarlama', description: 'Organik trafiği artıran SEO stratejileri ve dijital pazarlama.', features: ['Technical SEO', 'Content Strategy', 'Analytics', 'Performance'], ctaText: 'Ücretsiz Analiz' },
        { locale: 'en', title: 'SEO & Marketing', description: 'SEO strategies and digital marketing that boost organic traffic.', features: ['Technical SEO', 'Content Strategy', 'Analytics', 'Performance'], ctaText: 'Free Analysis' },
      ],
    },
    {
      slug: 'consulting',
      icon: 'MessageSquare',
      order: 6,
      translations: [
        { locale: 'tr', title: 'Teknoloji Danışmanlığı', description: 'Dijital dönüşüm sürecinizde stratejik rehberlik sağlıyoruz.', features: ['Tech Strategy', 'Architecture Review', 'Team Augmentation', 'Digital Transformation'], ctaText: 'Görüşme Planla' },
        { locale: 'en', title: 'Tech Consulting', description: 'We provide strategic guidance during your digital transformation.', features: ['Tech Strategy', 'Architecture Review', 'Team Augmentation', 'Digital Transformation'], ctaText: 'Schedule a Call' },
      ],
    },
  ];

  for (const svc of services) {
    const { translations, ...data } = svc;
    await prisma.service.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        translations: { create: translations },
      },
    });
  }
  console.log('✅ Services seeded');

  // Project categories
  const cats = [
    { slug: 'web-app',  translations: [{ locale: 'tr', name: 'Web Uygulaması' }, { locale: 'en', name: 'Web App' }] },
    { slug: 'mobile',   translations: [{ locale: 'tr', name: 'Mobil Uygulama' }, { locale: 'en', name: 'Mobile' }] },
    { slug: 'ecommerce',translations: [{ locale: 'tr', name: 'E-Ticaret'       }, { locale: 'en', name: 'E-Commerce' }] },
    { slug: 'design',   translations: [{ locale: 'tr', name: 'Tasarım'         }, { locale: 'en', name: 'Design' }] },
  ];

  const catMap: Record<string, string> = {};
  for (const cat of cats) {
    const { translations, ...data } = cat;
    const c = await prisma.projectCategory.upsert({
      where: { slug: data.slug },
      update: {},
      create: { ...data, translations: { create: translations } },
    });
    catMap[cat.slug] = c.id;
  }
  console.log('✅ Project categories seeded');

  // Projects
  const projects = [
    {
      slug: 'fintech-dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
      isFeatured: true,
      order: 1,
      categorySlug: 'web-app',
      translations: [
        { locale: 'tr', title: 'FinTech Dashboard', description: 'Gerçek zamanlı finansal veriler için modern bir analitik paneli.' },
        { locale: 'en', title: 'FinTech Dashboard', description: 'A modern analytics panel for real-time financial data.' },
      ],
    },
    {
      slug: 'ecommerce-platform',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      isFeatured: true,
      order: 2,
      categorySlug: 'ecommerce',
      translations: [
        { locale: 'tr', title: 'E-Ticaret Platformu', description: '10.000+ ürünü yöneten ölçeklenebilir e-ticaret çözümü.' },
        { locale: 'en', title: 'E-Commerce Platform', description: 'Scalable e-commerce solution managing 10,000+ products.' },
      ],
    },
    {
      slug: 'health-app',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
      technologies: ['React Native', 'Firebase', 'HealthKit'],
      isFeatured: true,
      order: 3,
      categorySlug: 'mobile',
      translations: [
        { locale: 'tr', title: 'Sağlık Takip Uygulaması', description: 'Kişiselleştirilmiş sağlık önerileri sunan akıllı mobil uygulama.' },
        { locale: 'en', title: 'Health Tracking App', description: 'Smart mobile app offering personalized health recommendations.' },
      ],
    },
    {
      slug: 'brand-identity',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
      technologies: ['Figma', 'Adobe CC', 'Motion Design'],
      isFeatured: true,
      order: 4,
      categorySlug: 'design',
      translations: [
        { locale: 'tr', title: 'Kurumsal Kimlik', description: 'Tech startup için kapsamlı marka kimliği ve tasarım sistemi.' },
        { locale: 'en', title: 'Brand Identity', description: 'Comprehensive brand identity and design system for a tech startup.' },
      ],
    },
  ];

  for (const proj of projects) {
    const { translations, categorySlug, ...data } = proj;
    await prisma.project.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        categoryId: catMap[categorySlug],
        translations: { create: translations },
      },
    });
  }
  console.log('✅ Projects seeded');

  // Team members
  const team = [
    {
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      email: 'ali@techco.com',
      linkedin: 'https://linkedin.com',
      order: 1,
      translations: [
        { locale: 'tr', name: 'Ali Kaya', role: 'CEO & Kurucu', bio: 'Yazılım mühendisliği ve girişimcilik tutkusuyla TechCo\'yu kurdu.' },
        { locale: 'en', name: 'Ali Kaya', role: 'CEO & Founder', bio: 'Founded TechCo with a passion for software engineering and entrepreneurship.' },
      ],
    },
    {
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
      email: 'selin@techco.com',
      linkedin: 'https://linkedin.com',
      order: 2,
      translations: [
        { locale: 'tr', name: 'Selin Demir', role: 'CTO', bio: '10+ yıllık deneyimiyle teknik ekibi yönetiyor.' },
        { locale: 'en', name: 'Selin Demir', role: 'CTO', bio: 'Leads the technical team with 10+ years of experience.' },
      ],
    },
    {
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      email: 'mert@techco.com',
      order: 3,
      translations: [
        { locale: 'tr', name: 'Mert Yıldız', role: 'Lead Designer', bio: 'Kullanıcı deneyimini sanatla buluşturan tasarımcı.' },
        { locale: 'en', name: 'Mert Yıldız', role: 'Lead Designer', bio: 'Designer who merges user experience with art.' },
      ],
    },
    {
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      email: 'zeynep@techco.com',
      order: 4,
      translations: [
        { locale: 'tr', name: 'Zeynep Arslan', role: 'Full Stack Developer', bio: 'React ve Node.js uzmanı, performans odaklı developer.' },
        { locale: 'en', name: 'Zeynep Arslan', role: 'Full Stack Developer', bio: 'React and Node.js expert, performance-focused developer.' },
      ],
    },
  ];

  for (const member of team) {
    const { translations, ...data } = member;
    const existing = await prisma.teamMember.findFirst({ where: { email: data.email } });
    if (!existing) {
      await prisma.teamMember.create({
        data: { ...data, translations: { create: translations } },
      });
    }
  }
  console.log('✅ Team members seeded');

  // Blog category
  const blogCat = await prisma.blogCategory.upsert({
    where: { slug: 'technology' },
    update: {},
    create: {
      slug: 'technology',
      translations: {
        create: [
          { locale: 'tr', name: 'Teknoloji' },
          { locale: 'en', name: 'Technology' },
        ],
      },
    },
  });

  // Blog posts
  const posts = [
    {
      slug: 'nextjs-15-whats-new',
      coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      tags: ['Next.js', 'React', 'JavaScript'],
      isPublished: true,
      publishedAt: new Date('2024-11-01'),
      categoryId: blogCat.id,
      translations: [
        { locale: 'tr', title: "Next.js 15'teki Yenilikler", excerpt: 'Next.js 15 ile gelen yeni özellikler ve performans iyileştirmeleri.', content: '<p>Next.js 15, React 19 desteği ve yeni ön belleğe alma stratejileriyle önemli güncellemeler getiriyor...</p>', metaTitle: "Next.js 15'te Ne Var?", metaDesc: 'Next.js 15 yeniliklerini keşfedin.' },
        { locale: 'en', title: "What's New in Next.js 15", excerpt: 'New features and performance improvements coming with Next.js 15.', content: '<p>Next.js 15 brings significant updates with React 19 support and new caching strategies...</p>', metaTitle: "What's New in Next.js 15?", metaDesc: "Discover Next.js 15's new features." },
      ],
    },
    {
      slug: 'tailwind-css-v4-preview',
      coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
      tags: ['CSS', 'Tailwind', 'Design'],
      isPublished: true,
      publishedAt: new Date('2024-10-15'),
      categoryId: blogCat.id,
      translations: [
        { locale: 'tr', title: 'Tailwind CSS v4 Önizleme', excerpt: 'Tailwind CSS v4 ile CSS-first yapılandırma ve yeni özellikler.', content: '<p>Tailwind CSS v4 tamamen yeniden tasarlanmış bir mimari ile geliyor...</p>', metaTitle: 'Tailwind CSS v4', metaDesc: 'Tailwind CSS v4 hakkında her şey.' },
        { locale: 'en', title: 'Tailwind CSS v4 Preview', excerpt: 'CSS-first configuration and new features with Tailwind CSS v4.', content: '<p>Tailwind CSS v4 comes with a completely redesigned architecture...</p>', metaTitle: 'Tailwind CSS v4', metaDesc: 'Everything about Tailwind CSS v4.' },
      ],
    },
    {
      slug: 'prisma-orm-best-practices',
      coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
      tags: ['Prisma', 'Database', 'ORM'],
      isPublished: true,
      publishedAt: new Date('2024-09-20'),
      categoryId: blogCat.id,
      translations: [
        { locale: 'tr', title: 'Prisma ORM En İyi Uygulamalar', excerpt: 'Prisma ile veritabanı yönetiminde en iyi pratikler ve ipuçları.', content: '<p>Prisma modern TypeScript projeleri için güçlü bir ORM çözümüdür...</p>', metaTitle: 'Prisma ORM Best Practices', metaDesc: 'Prisma ile veritabanı yönetimi.' },
        { locale: 'en', title: 'Prisma ORM Best Practices', excerpt: 'Best practices and tips for database management with Prisma.', content: '<p>Prisma is a powerful ORM solution for modern TypeScript projects...</p>', metaTitle: 'Prisma ORM Best Practices', metaDesc: 'Database management with Prisma.' },
      ],
    },
  ];

  for (const post of posts) {
    const { translations, ...data } = post;
    await prisma.blogPost.upsert({
      where: { slug: data.slug },
      update: {},
      create: { ...data, translations: { create: translations } },
    });
  }
  console.log('✅ Blog posts seeded');

  // ─── Site Settings ─────────────────────────────────────────────────────────
  const siteSettings = [
    // Contact
    { key: 'contact_address', value: { display: 'Levent, İstanbul, Türkiye' }, group: 'contact' },
    { key: 'contact_phone', value: { display: '+90 212 123 45 67', href: 'tel:+902121234567' }, group: 'contact' },
    { key: 'contact_email', value: { display: 'hello@techco.com', href: 'mailto:hello@techco.com' }, group: 'contact' },
    { key: 'contact_hours', value: { display: 'Mon–Fri 09:00–18:00' }, group: 'contact' },
    { key: 'contact_map_url', value: { url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.7!2d29.01!3d41.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzQ4LjAiTiAyOcKwMDAnMzYuMCJF!5e0!3m2!1sen!2str!4v1' }, group: 'contact' },
    // Social
    { key: 'social_linkedin', value: { url: 'https://linkedin.com/company/techco' }, group: 'social' },
    { key: 'social_twitter', value: { url: 'https://twitter.com/techco' }, group: 'social' },
    { key: 'social_instagram', value: { url: 'https://instagram.com/techco' }, group: 'social' },
    { key: 'social_github', value: { url: 'https://github.com/techco' }, group: 'social' },
    // Branding
    { key: 'company_name', value: { name: 'TechCo', logoText: 'T' }, group: 'branding' },
    { key: 'whatsapp', value: { phone: '+905001234567', messageTr: 'Merhaba, bilgi almak istiyorum.', messageEn: 'Hello, I need more information.' }, group: 'branding' },
    // Stats
    { key: 'stats_projects', value: { value: 150, suffix: '+' }, group: 'stats' },
    { key: 'stats_clients', value: { value: 80, suffix: '+' }, group: 'stats' },
    { key: 'stats_years', value: { value: 6, suffix: '+' }, group: 'stats' },
    { key: 'stats_team', value: { value: 12, suffix: '' }, group: 'stats' },
  ];

  for (const setting of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value as object, group: setting.group },
      create: setting as { key: string; value: object; group: string },
    });
  }
  console.log('✅ Site settings seeded');

  // ─── Page Content ──────────────────────────────────────────────────────────

  const pageContents = [
    {
      page: 'about',
      section: 'story',
      contentType: 'RICH_TEXT' as const,
      order: 1,
      metadata: {
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        statValue: '150+',
      },
      translations: [
        {
          locale: 'tr',
          title: 'Hikayemiz',
          subtitle: '2018\'den Bu Yana',
          body: '2018 yılında kurulan TechCo, karmaşık teknoloji ile güzel kullanıcı deneyimi arasındaki boşluğu doldurmaya kararlı küçük bir mühendis ve tasarımcı ekibi olarak başladı.\n\nYıllar içinde, 12 ülkedeki 80\'den fazla müşterinin dijital hedeflerine ulaşmasına yardımcı olan tam hizmet dijital ajansa dönüştük — erken aşama startup\'lardan kurumsal Fortune 500 şirketlerine kadar.\n\nYaklaşımımız basit: derinlemesine anla, düşünceli tasarla, mükemmel inşa et ve durmaksızın geliştir.',
        },
        {
          locale: 'en',
          title: 'Our Story',
          subtitle: 'Since 2018',
          body: 'Founded in 2018, TechCo began as a small team of passionate engineers and designers determined to bridge the gap between complex technology and beautiful user experience.\n\nOver the years, we\'ve grown into a full-service digital agency, helping over 80 clients across 12 countries achieve their digital goals — from early-stage startups to enterprise Fortune 500 companies.\n\nOur approach is simple: understand deeply, design thoughtfully, build excellently, and iterate relentlessly.',
        },
      ],
    },
    {
      page: 'about',
      section: 'mission',
      contentType: 'RICH_TEXT' as const,
      order: 2,
      metadata: Prisma.DbNull,
      translations: [
        {
          locale: 'tr',
          title: 'Misyonumuz',
          body: 'İşletmeleri büyümeyi hızlandıran, müşteri deneyimlerini geliştiren ve kalıcı rekabet avantajları yaratan dönüştürücü dijital çözümlerle güçlendirmek.',
        },
        {
          locale: 'en',
          title: 'Our Mission',
          body: 'To empower businesses with transformative digital solutions that drive growth, enhance customer experiences, and create lasting competitive advantages.',
        },
      ],
    },
    {
      page: 'about',
      section: 'vision',
      contentType: 'RICH_TEXT' as const,
      order: 3,
      metadata: Prisma.DbNull,
      translations: [
        {
          locale: 'tr',
          title: 'Vizyonumuz',
          body: 'Dünya çapında hırslı şirketler için olağanüstü kalite, yenilikçilik ve uzun vadeli etkisiyle tanınan en güvenilir teknoloji ortağı olmak.',
        },
        {
          locale: 'en',
          title: 'Our Vision',
          body: 'To be the most trusted technology partner for ambitious companies worldwide, known for exceptional quality, innovation, and long-term impact.',
        },
      ],
    },
    {
      page: 'about',
      section: 'values',
      contentType: 'VALUES_LIST' as const,
      order: 4,
      metadata: {
        items: [
          { icon: 'Lightbulb' },
          { icon: 'Target' },
          { icon: 'Heart' },
          { icon: 'Zap' },
          { icon: 'Users' },
          { icon: 'Award' },
        ],
      },
      translations: [
        {
          locale: 'tr',
          title: 'Değerlerimiz',
          body: JSON.stringify([
            { title: 'İnovasyon', desc: 'En yeni teknolojiyi ve yaratıcı çözümleri benimsiyoruz.' },
            { title: 'Mükemmellik', desc: 'En yüksek kalitede işten başka bir şey sunmuyoruz.' },
            { title: 'Tutku', desc: 'Yaptığımız işi seviyoruz ve bu her projemize yansıyor.' },
            { title: 'Çeviklik', desc: 'Hızlı hareket eder ve değişimlere sorunsuzca uyum sağlarız.' },
            { title: 'İş Birliği', desc: 'Müşterilerimizle gerçek ortaklar olarak çalışıyoruz.' },
            { title: 'Dürüstlük', desc: 'Yaptığımız her şeyde şeffaflık ve dürüstlük.' },
          ]),
        },
        {
          locale: 'en',
          title: 'Our Values',
          body: JSON.stringify([
            { title: 'Innovation', desc: 'We embrace cutting-edge technology and creative solutions.' },
            { title: 'Excellence', desc: 'We deliver nothing short of the highest quality work.' },
            { title: 'Passion', desc: 'We love what we do, and it shows in every project.' },
            { title: 'Agility', desc: 'We move fast and adapt to changes seamlessly.' },
            { title: 'Collaboration', desc: 'We work as true partners with our clients.' },
            { title: 'Integrity', desc: 'Transparency and honesty in everything we do.' },
          ]),
        },
      ],
    },
  ];

  for (const pc of pageContents) {
    const { translations, ...data } = pc;
    await prisma.pageContent.upsert({
      where: { page_section: { page: data.page, section: data.section } },
      update: { metadata: data.metadata ?? Prisma.DbNull, order: data.order },
      create: {
        ...data,
        translations: { create: translations },
      },
    });
  }
  console.log('✅ Page content seeded');

  console.log('🎉 Database seeding complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
