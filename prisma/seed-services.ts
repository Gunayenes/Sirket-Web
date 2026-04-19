import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete old services
  await prisma.serviceTranslation.deleteMany({});
  await prisma.service.deleteMany({});
  console.log('Old services deleted');

  const services = [
    { slug: 'web-ecommerce', icon: 'Globe', order: 1, translations: [
      { locale: 'tr', title: 'Kurumsal Web & E-Ticaret Çözümleri', description: 'Markanızı dijitale taşıyan kurumsal web siteleri ve yüksek performanslı e-ticaret platformları geliştiriyoruz.', features: ['Kurumsal Web Sitesi', 'E-Ticaret Platformu', 'SEO Uyumlu Altyapı', 'Responsive Tasarım'], ctaText: 'Teklif Al' },
      { locale: 'en', title: 'Corporate Web & E-Commerce Solutions', description: 'We build corporate websites and high-performance e-commerce platforms.', features: ['Corporate Website', 'E-Commerce Platform', 'SEO-Friendly Infrastructure', 'Responsive Design'], ctaText: 'Get a Quote' },
    ]},
    { slug: 'mobile-apps', icon: 'Smartphone', order: 2, translations: [
      { locale: 'tr', title: 'Mobil Uygulama Geliştirme', description: 'iOS ve Android için kullanıcı dostu, yüksek performanslı mobil uygulamalar geliştiriyoruz.', features: ['React Native', 'Flutter', 'iOS & Android', 'Push Notifications'], ctaText: 'Teklif Al' },
      { locale: 'en', title: 'Mobile App Development', description: 'We develop user-friendly, high-performance mobile apps for iOS and Android.', features: ['React Native', 'Flutter', 'iOS & Android', 'Push Notifications'], ctaText: 'Get a Quote' },
    ]},
    { slug: 'custom-software', icon: 'Code2', order: 3, translations: [
      { locale: 'tr', title: 'Özel Yazılım & İş Yönetim Sistemleri', description: 'İş süreçlerinize özel yazılım çözümleri ve iş yönetim sistemleri geliştiriyoruz.', features: ['İş Süreç Otomasyonu', 'Özel Panel & Dashboard', 'Stok & Sipariş Yönetimi', 'Entegrasyon Çözümleri'], ctaText: 'Hemen Başlayalım' },
      { locale: 'en', title: 'Custom Software & Business Management', description: 'We develop custom software solutions and business management systems tailored to your workflows.', features: ['Business Process Automation', 'Custom Dashboards', 'Inventory & Order Management', 'Integration Solutions'], ctaText: 'Get Started' },
    ]},
    { slug: 'crm-erp', icon: 'Database', order: 4, translations: [
      { locale: 'tr', title: 'CRM / ERP Çözümleri', description: 'Müşteri ilişkileri ve kurumsal kaynak planlaması için kapsamlı CRM/ERP sistemleri kuruyoruz.', features: ['Müşteri Yönetimi', 'Satış Takibi', 'Kaynak Planlaması', 'Raporlama & Analitik'], ctaText: 'Demo Talep Et' },
      { locale: 'en', title: 'CRM / ERP Solutions', description: 'We implement comprehensive CRM/ERP systems for customer relationship and enterprise resource planning.', features: ['Customer Management', 'Sales Tracking', 'Resource Planning', 'Reporting & Analytics'], ctaText: 'Request a Demo' },
    ]},
    { slug: 'ai-automation', icon: 'Bot', order: 5, translations: [
      { locale: 'tr', title: 'Yapay Zeka & Otomasyon Sistemleri', description: 'Yapay zeka destekli otomasyon çözümleriyle iş süreçlerinizi hızlandırın ve verimliliğinizi artırın.', features: ['Chatbot & Asistan', 'Süreç Otomasyonu', 'Makine Öğrenmesi', 'Doğal Dil İşleme'], ctaText: 'Keşfet' },
      { locale: 'en', title: 'AI & Automation Systems', description: 'Accelerate your business processes and boost efficiency with AI-powered automation solutions.', features: ['Chatbot & Assistant', 'Process Automation', 'Machine Learning', 'Natural Language Processing'], ctaText: 'Explore' },
    ]},
    { slug: 'api-backend', icon: 'Server', order: 6, translations: [
      { locale: 'tr', title: 'API & Backend Geliştirme', description: 'Güvenli, ölçeklenebilir ve yüksek performanslı API ve backend altyapıları geliştiriyoruz.', features: ['RESTful & GraphQL API', 'Microservices', 'Node.js & Python', 'Cloud Deploy'], ctaText: 'Teklif Al' },
      { locale: 'en', title: 'API & Backend Development', description: 'We build secure, scalable, and high-performance API and backend infrastructures.', features: ['RESTful & GraphQL API', 'Microservices', 'Node.js & Python', 'Cloud Deploy'], ctaText: 'Get a Quote' },
    ]},
    { slug: 'data-analytics', icon: 'BarChart3', order: 7, translations: [
      { locale: 'tr', title: 'Veri Analizi & Raporlama', description: 'Verilerinizi anlamlı içgörülere dönüştüren analiz ve raporlama sistemleri kuruyoruz.', features: ['Veri Görselleştirme', 'İş Zekası (BI)', 'Özel Raporlar', 'Gerçek Zamanlı Dashboard'], ctaText: 'İncele' },
      { locale: 'en', title: 'Data Analytics & Reporting', description: 'We build analytics and reporting systems that turn your data into meaningful insights.', features: ['Data Visualization', 'Business Intelligence', 'Custom Reports', 'Real-Time Dashboards'], ctaText: 'Learn More' },
    ]},
    { slug: 'support-maintenance', icon: 'Wrench', order: 8, translations: [
      { locale: 'tr', title: 'Teknik Destek & Bakım Hizmetleri', description: 'Projelerinizin kesintisiz çalışmasını sağlayan teknik destek, bakım ve güncelleme hizmetleri sunuyoruz.', features: ['7/24 Teknik Destek', 'Güvenlik Güncellemeleri', 'Performans Optimizasyonu', 'Sunucu Yönetimi'], ctaText: 'Destek Al' },
      { locale: 'en', title: 'Technical Support & Maintenance', description: 'We provide technical support, maintenance, and update services to keep your projects running smoothly.', features: ['24/7 Technical Support', 'Security Updates', 'Performance Optimization', 'Server Management'], ctaText: 'Get Support' },
    ]},
  ];

  for (const svc of services) {
    const { translations, ...data } = svc;
    await prisma.service.create({
      data: { ...data, translations: { create: translations } },
    });
  }
  console.log('8 new services created');
  await prisma.$disconnect();
}

main().catch(console.error);
