import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Admin user
  const hashedPw = await bcrypt.hash('admin123456', 12);
  await prisma.user.upsert({
    where: { email: 'admin@dahiteknoloji.com' },
    update: {},
    create: {
      email: 'admin@dahiteknoloji.com',
      password: hashedPw,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Admin user created: admin@dahiteknoloji.com / admin123456');

  // Services
  const services = [
    {
      slug: 'web-ecommerce',
      icon: 'Globe',
      order: 1,
      translations: [
        { locale: 'tr', title: 'Kurumsal Web & E-Ticaret Çözümleri', description: 'Markanızı dijitale taşıyan kurumsal web siteleri ve yüksek performanslı e-ticaret platformları geliştiriyoruz.', features: ['Kurumsal Web Sitesi', 'E-Ticaret Platformu', 'SEO Uyumlu Altyapı', 'Responsive Tasarım'], ctaText: 'Teklif Al' },
        { locale: 'en', title: 'Corporate Web & E-Commerce Solutions', description: 'We build corporate websites and high-performance e-commerce platforms that bring your brand to the digital world.', features: ['Corporate Website', 'E-Commerce Platform', 'SEO-Friendly Infrastructure', 'Responsive Design'], ctaText: 'Get a Quote' },
      ],
    },
    {
      slug: 'mobile-apps',
      icon: 'Smartphone',
      order: 2,
      translations: [
        { locale: 'tr', title: 'Mobil Uygulama Geliştirme', description: 'iOS ve Android için kullanıcı dostu, yüksek performanslı mobil uygulamalar geliştiriyoruz.', features: ['React Native', 'Flutter', 'iOS & Android', 'Push Notifications'], ctaText: 'Teklif Al' },
        { locale: 'en', title: 'Mobile App Development', description: 'We develop user-friendly, high-performance mobile apps for iOS and Android.', features: ['React Native', 'Flutter', 'iOS & Android', 'Push Notifications'], ctaText: 'Get a Quote' },
      ],
    },
    {
      slug: 'custom-software',
      icon: 'Code2',
      order: 3,
      translations: [
        { locale: 'tr', title: 'Özel Yazılım & İş Yönetim Sistemleri', description: 'İş süreçlerinize özel yazılım çözümleri ve iş yönetim sistemleri geliştiriyoruz.', features: ['İş Süreç Otomasyonu', 'Özel Panel & Dashboard', 'Stok & Sipariş Yönetimi', 'Entegrasyon Çözümleri'], ctaText: 'Hemen Başlayalım' },
        { locale: 'en', title: 'Custom Software & Business Management', description: 'We develop custom software solutions and business management systems tailored to your workflows.', features: ['Business Process Automation', 'Custom Dashboards', 'Inventory & Order Management', 'Integration Solutions'], ctaText: 'Get Started' },
      ],
    },
    {
      slug: 'crm-erp',
      icon: 'Database',
      order: 4,
      translations: [
        { locale: 'tr', title: 'CRM / ERP Çözümleri', description: 'Müşteri ilişkileri ve kurumsal kaynak planlaması için kapsamlı CRM/ERP sistemleri kuruyoruz.', features: ['Müşteri Yönetimi', 'Satış Takibi', 'Kaynak Planlaması', 'Raporlama & Analitik'], ctaText: 'Demo Talep Et' },
        { locale: 'en', title: 'CRM / ERP Solutions', description: 'We implement comprehensive CRM/ERP systems for customer relationship and enterprise resource planning.', features: ['Customer Management', 'Sales Tracking', 'Resource Planning', 'Reporting & Analytics'], ctaText: 'Request a Demo' },
      ],
    },
    {
      slug: 'ai-automation',
      icon: 'Bot',
      order: 5,
      translations: [
        { locale: 'tr', title: 'Yapay Zeka & Otomasyon Sistemleri', description: 'Yapay zeka destekli otomasyon çözümleriyle iş süreçlerinizi hızlandırın ve verimliliğinizi artırın.', features: ['Chatbot & Asistan', 'Süreç Otomasyonu', 'Makine Öğrenmesi', 'Doğal Dil İşleme'], ctaText: 'Keşfet' },
        { locale: 'en', title: 'AI & Automation Systems', description: 'Accelerate your business processes and boost efficiency with AI-powered automation solutions.', features: ['Chatbot & Assistant', 'Process Automation', 'Machine Learning', 'Natural Language Processing'], ctaText: 'Explore' },
      ],
    },
    {
      slug: 'api-backend',
      icon: 'Server',
      order: 6,
      translations: [
        { locale: 'tr', title: 'API & Backend Geliştirme', description: 'Güvenli, ölçeklenebilir ve yüksek performanslı API ve backend altyapıları geliştiriyoruz.', features: ['RESTful & GraphQL API', 'Microservices', 'Node.js & Python', 'Cloud Deploy'], ctaText: 'Teklif Al' },
        { locale: 'en', title: 'API & Backend Development', description: 'We build secure, scalable, and high-performance API and backend infrastructures.', features: ['RESTful & GraphQL API', 'Microservices', 'Node.js & Python', 'Cloud Deploy'], ctaText: 'Get a Quote' },
      ],
    },
    {
      slug: 'data-analytics',
      icon: 'BarChart3',
      order: 7,
      translations: [
        { locale: 'tr', title: 'Veri Analizi & Raporlama', description: 'Verilerinizi anlamlı içgörülere dönüştüren analiz ve raporlama sistemleri kuruyoruz.', features: ['Veri Görselleştirme', 'İş Zekası (BI)', 'Özel Raporlar', 'Gerçek Zamanlı Dashboard'], ctaText: 'İncele' },
        { locale: 'en', title: 'Data Analytics & Reporting', description: 'We build analytics and reporting systems that turn your data into meaningful insights.', features: ['Data Visualization', 'Business Intelligence', 'Custom Reports', 'Real-Time Dashboards'], ctaText: 'Learn More' },
      ],
    },
    {
      slug: 'support-maintenance',
      icon: 'Wrench',
      order: 8,
      translations: [
        { locale: 'tr', title: 'Teknik Destek & Bakım Hizmetleri', description: 'Projelerinizin kesintisiz çalışmasını sağlayan teknik destek, bakım ve güncelleme hizmetleri sunuyoruz.', features: ['7/24 Teknik Destek', 'Güvenlik Güncellemeleri', 'Performans Optimizasyonu', 'Sunucu Yönetimi'], ctaText: 'Destek Al' },
        { locale: 'en', title: 'Technical Support & Maintenance', description: 'We provide technical support, maintenance, and update services to keep your projects running smoothly.', features: ['24/7 Technical Support', 'Security Updates', 'Performance Optimization', 'Server Management'], ctaText: 'Get Support' },
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

  // ─── Site Settings ─────────────────────────────────────────────────────────
  const siteSettings = [
    // Contact
    { key: 'contact_address', value: { display: 'Muratpaşa, Antalya, Türkiye' }, group: 'contact' },
    { key: 'contact_phone', value: { display: '+90 542 746 01 97', href: 'tel:+905427460197' }, group: 'contact' },
    { key: 'contact_email', value: { display: 'info@dahiteknoloji.com', href: 'mailto:info@dahiteknoloji.com' }, group: 'contact' },
    { key: 'contact_hours', value: { display: 'Mon–Fri 09:00–18:00' }, group: 'contact' },
    { key: 'contact_map_url', value: { url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25603.8!2d30.6834!3d36.8869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39aaeddadadc1%3A0x95c69047e3f4b6e4!2sMuratpa%C5%9Fa%2C%20Antalya!5e0!3m2!1str!2str!4v1' }, group: 'contact' },
    // Social
    { key: 'social_linkedin', value: { url: 'https://linkedin.com/company/dahiteknoloji' }, group: 'social' },
    { key: 'social_twitter', value: { url: 'https://twitter.com/dahiteknoloji' }, group: 'social' },
    { key: 'social_instagram', value: { url: 'https://instagram.com/dahiteknoloji' }, group: 'social' },
    { key: 'social_github', value: { url: 'https://github.com/dahiteknoloji' }, group: 'social' },
    // Branding
    { key: 'company_name', value: { name: 'Dahi Teknoloji', logoText: 'D' }, group: 'branding' },
    { key: 'whatsapp', value: { phone: '+905427460197', messageTr: 'Merhaba, bilgi almak istiyorum.', messageEn: 'Hello, I need more information.' }, group: 'branding' },
    // Stats
    { key: 'stats_projects', value: { value: 150, suffix: '+' }, group: 'stats' },
    { key: 'stats_clients', value: { value: 80, suffix: '+' }, group: 'stats' },
    { key: 'stats_years', value: { value: 6, suffix: '+' }, group: 'stats' },
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
          body: '2018 yılında kurulan Dahi Teknoloji, karmaşık teknoloji ile güzel kullanıcı deneyimi arasındaki boşluğu doldurmaya kararlı küçük bir mühendis ve tasarımcı ekibi olarak başladı.\n\nYıllar içinde, 12 ülkedeki 80\'den fazla müşterinin dijital hedeflerine ulaşmasına yardımcı olan tam hizmet dijital ajansa dönüştük — erken aşama startup\'lardan kurumsal Fortune 500 şirketlerine kadar.\n\nYaklaşımımız basit: derinlemesine anla, düşünceli tasarla, mükemmel inşa et ve durmaksızın geliştir.',
        },
        {
          locale: 'en',
          title: 'Our Story',
          subtitle: 'Since 2018',
          body: 'Founded in 2018, Dahi Teknoloji began as a small team of passionate engineers and designers determined to bridge the gap between complex technology and beautiful user experience.\n\nOver the years, we\'ve grown into a full-service digital agency, helping over 80 clients across 12 countries achieve their digital goals — from early-stage startups to enterprise Fortune 500 companies.\n\nOur approach is simple: understand deeply, design thoughtfully, build excellently, and iterate relentlessly.',
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
