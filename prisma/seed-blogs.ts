import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BLOG_POSTS = [
  {
    slug: 'nextjs-15-yeni-ozellikler-2024',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    tags: ['Next.js', 'React', 'Web Geliştirme', 'Frontend'],
    isFeatured: true,
    tr: {
      title: 'Next.js 15 ile Gelen Yenilikler: Performans ve Geliştirici Deneyimi',
      excerpt: 'Next.js 15, React Server Components, Turbopack ve gelişmiş önbellekleme mekanizmalarıyla web geliştirmede yeni bir çığır açıyor.',
      metaTitle: 'Next.js 15 Yenilikleri — Performans, Turbopack, RSC | TechCo Blog',
      metaDesc: 'Next.js 15 ile gelen yeni özellikler: React Server Components, Turbopack stabil, gelişmiş önbellekleme ve daha fazlası. Detaylı inceleme.',
      content: `<h2>Next.js 15 Neden Önemli?</h2><p>Next.js 15, React ekosistemindeki en büyük güncellemelerden birini temsil ediyor. Vercel ekibi, bu sürümle birlikte hem geliştirici deneyimini hem de son kullanıcı performansını önemli ölçüde iyileştirdi.</p><h2>Turbopack Artık Stabil</h2><p>Rust tabanlı bundler Turbopack, Next.js 15 ile birlikte stabil hale geldi. Webpack'e kıyasla 10 kata kadar daha hızlı derleme süreleri sunuyor. Büyük projelerde geliştirme sunucusu başlatma süreleri saniyeler seviyesine indi.</p><h3>Performans Karşılaştırması</h3><p>Test sonuçlarımıza göre orta ölçekli bir projede (500+ modül) Turbopack ile cold start süresi 1.2 saniyeye düşerken, Webpack ile bu süre 8-12 saniye arasında değişiyor.</p><h2>React Server Components (RSC)</h2><p>Server Components artık varsayılan olarak aktif. Bu sayede sunucu tarafında çalışan bileşenler, istemciye gönderilen JavaScript miktarını dramatik biçimde azaltıyor. Veri çekme işlemleri doğrudan bileşen içinde yapılabiliyor.</p><h2>Gelişmiş Önbellekleme</h2><p>Next.js 15, yeni bir önbellekleme stratejisi sunuyor. <code>staleTimes</code> konfigürasyonu ile statik ve dinamik içeriklerin önbellek sürelerini ayrı ayrı kontrol edebilirsiniz.</p><h2>Partial Prerendering</h2><p>Sayfanın statik kısımları build zamanında oluşturulurken, dinamik kısımlar istek anında streamed olarak sunuluyor. Bu hibrit yaklaşım, hem SEO hem de kullanıcı deneyimi açısından büyük avantaj sağlıyor.</p><h2>Sonuç</h2><p>Next.js 15, modern web geliştirme için vazgeçilmez araçlar sunuyor. Eğer hâlâ Next.js 13 veya 14 kullanıyorsanız, geçiş rehberimizi inceleyebilirsiniz.</p>`,
    },
    en: {
      title: 'What\'s New in Next.js 15: Performance and Developer Experience',
      excerpt: 'Next.js 15 opens a new chapter in web development with React Server Components, Turbopack, and improved caching mechanisms.',
      metaTitle: 'Next.js 15 Features — Performance, Turbopack, RSC | TechCo Blog',
      metaDesc: 'New features in Next.js 15: stable React Server Components, Turbopack, improved caching and more. Detailed review.',
      content: `<h2>Why Next.js 15 Matters</h2><p>Next.js 15 represents one of the biggest updates in the React ecosystem. The Vercel team has significantly improved both developer experience and end-user performance.</p><h2>Turbopack is Now Stable</h2><p>The Rust-based bundler Turbopack is now stable with Next.js 15. It offers up to 10x faster compilation times compared to Webpack.</p><h2>React Server Components</h2><p>Server Components are now active by default, dramatically reducing the JavaScript sent to the client.</p><h2>Conclusion</h2><p>Next.js 15 provides essential tools for modern web development.</p>`,
    },
  },
  {
    slug: 'yapay-zeka-web-gelistirme-2024',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    tags: ['Yapay Zeka', 'AI', 'Web Geliştirme', 'ChatGPT'],
    isFeatured: true,
    tr: {
      title: 'Yapay Zeka ile Web Geliştirme: AI Araçları ve En İyi Uygulamalar',
      excerpt: 'GitHub Copilot, ChatGPT ve diğer AI araçlarının web geliştirme süreçlerini nasıl dönüştürdüğünü keşfedin.',
      metaTitle: 'Yapay Zeka ile Web Geliştirme — AI Araçları Rehberi 2024 | TechCo',
      metaDesc: 'Web geliştirmede yapay zeka araçları: GitHub Copilot, ChatGPT, Claude, v0 ve daha fazlası. Verimlilik artırma rehberi.',
      content: `<h2>AI Devrimi Web Geliştirmede</h2><p>2024 yılı, yapay zekanın yazılım geliştirme süreçlerine tam anlamıyla entegre olduğu yıl oldu. Artık geliştiricilerin %78'i günlük iş akışlarında en az bir AI aracı kullanıyor.</p><h2>GitHub Copilot</h2><p>GitHub Copilot, kod tamamlama ve önerme konusunda en yaygın kullanılan AI aracı. Özellikle boilerplate kod yazımında zaman tasarrufu sağlıyor.</p><h2>Claude ve ChatGPT ile Kod İncelemesi</h2><p>AI destekli kod incelemesi, hataları erken aşamada yakalamak ve kod kalitesini artırmak için güçlü bir araç. Claude Code gibi araçlar doğrudan terminal üzerinden çalışarak geliştirme sürecini hızlandırıyor.</p><h2>v0 ile UI Geliştirme</h2><p>Vercel'in v0 aracı, doğal dil komutlarıyla React bileşenleri oluşturmanıza olanak tanıyor. Prototipleme sürecini saatlerden dakikalara indiriyor.</p><h2>AI Araçlarını Kullanırken Dikkat Edilmesi Gerekenler</h2><ul><li>Üretilen kodu mutlaka gözden geçirin</li><li>Güvenlik açıklarına karşı dikkatli olun</li><li>AI'yı asistan olarak kullanın, karar verici olarak değil</li><li>Özel ve hassas verileri AI araçlarıyla paylaşmaktan kaçının</li></ul><h2>Sonuç</h2><p>AI araçları web geliştirme verimliliğini önemli ölçüde artırıyor ancak bilinçli kullanım şart.</p>`,
    },
    en: {
      title: 'AI in Web Development: Tools and Best Practices for 2024',
      excerpt: 'Discover how GitHub Copilot, ChatGPT, and other AI tools are transforming web development processes.',
      metaTitle: 'AI in Web Development — Tools Guide 2024 | TechCo Blog',
      metaDesc: 'AI tools in web development: GitHub Copilot, ChatGPT, Claude, v0 and more. Productivity guide.',
      content: `<h2>The AI Revolution in Web Development</h2><p>2024 is the year AI fully integrated into software development workflows. Now 78% of developers use at least one AI tool daily.</p><h2>GitHub Copilot</h2><p>The most widely used AI tool for code completion and suggestions.</p><h2>Conclusion</h2><p>AI tools significantly boost web development productivity but conscious usage is essential.</p>`,
    },
  },
  {
    slug: 'react-server-components-rehberi',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80',
    tags: ['React', 'Server Components', 'Frontend', 'Performance'],
    tr: {
      title: 'React Server Components: Kapsamlı Başlangıç Rehberi',
      excerpt: 'React Server Components nedir, nasıl çalışır ve projelerinizde nasıl kullanırsınız? Adım adım rehber.',
      metaTitle: 'React Server Components Rehberi — RSC Nedir, Nasıl Kullanılır | TechCo',
      metaDesc: 'React Server Components (RSC) kapsamlı rehberi. Server ve Client Components farkı, veri çekme, performans optimizasyonu.',
      content: `<h2>Server Components Nedir?</h2><p>React Server Components (RSC), bileşenlerin sunucu tarafında render edilmesini sağlayan bir mimari yaklaşımdır. Client Components'tan farklı olarak, tarayıcıya JavaScript göndermezler.</p><h2>Server vs Client Components</h2><p>Server Components varsayılan olarak aktiftir. Client Components için 'use client' direktifini kullanmanız gerekir.</p><h2>Veri Çekme</h2><p>Server Components içinde doğrudan async/await kullanarak veri çekebilirsiniz. Bu, useEffect ve useState'e olan ihtiyacı ortadan kaldırır.</p><h2>Performans Avantajları</h2><p>RSC kullanarak JavaScript bundle boyutunu %40-60 oranında azaltabilirsiniz. Bu, özellikle mobil cihazlarda dramatik performans iyileştirmesi sağlar.</p>`,
    },
    en: {
      title: 'React Server Components: A Comprehensive Getting Started Guide',
      excerpt: 'What are React Server Components, how do they work, and how to use them in your projects?',
      metaTitle: 'React Server Components Guide — What is RSC | TechCo Blog',
      metaDesc: 'Comprehensive React Server Components (RSC) guide. Difference between Server and Client Components, data fetching, performance.',
      content: `<h2>What are Server Components?</h2><p>React Server Components (RSC) is an architectural approach that enables components to render on the server side. Unlike Client Components, they don't send JavaScript to the browser.</p><h2>Performance Benefits</h2><p>Using RSC, you can reduce JavaScript bundle size by 40-60%.</p>`,
    },
  },
  {
    slug: 'typescript-5-yenilikleri',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=80',
    tags: ['TypeScript', 'JavaScript', 'Web Geliştirme'],
    tr: {
      title: 'TypeScript 5: Tip Güvenliği ve Modern JavaScript Geliştirme',
      excerpt: 'TypeScript 5 ile gelen dekoratörler, const tip parametreleri ve performans iyileştirmelerini keşfedin.',
      metaTitle: 'TypeScript 5 Yenilikleri — Dekoratörler, Tip Güvenliği | TechCo',
      metaDesc: 'TypeScript 5 yeni özellikler: dekoratörler, const type parameters, enum iyileştirmeleri. Detaylı inceleme.',
      content: `<h2>TypeScript 5 Neler Getiriyor?</h2><p>TypeScript 5, JavaScript ekosistemindeki tip güvenliği standartlarını bir üst seviyeye taşıyor. Daha küçük paket boyutu, daha hızlı derleme ve güçlü yeni özellikler sunuyor.</p><h2>Dekoratörler</h2><p>TC39 Stage 3 dekoratörleri artık TypeScript 5'te destekleniyor. Sınıf metotlarını, erişimcileri ve alanları dekore edebilirsiniz.</p><h2>Const Tip Parametreleri</h2><p>Const type parameters, jenerik fonksiyonlarda daha kesin tip çıkarımı sağlıyor.</p><h2>Performans İyileştirmeleri</h2><p>TypeScript 5, paket boyutunu %37 küçülttü ve derleme sürelerini %10-25 oranında hızlandırdı.</p>`,
    },
    en: {
      title: 'TypeScript 5: Type Safety and Modern JavaScript Development',
      excerpt: 'Explore decorators, const type parameters, and performance improvements in TypeScript 5.',
      metaTitle: 'TypeScript 5 Features — Decorators, Type Safety | TechCo Blog',
      metaDesc: 'TypeScript 5 new features: decorators, const type parameters, enum improvements. Detailed review.',
      content: `<h2>What TypeScript 5 Brings</h2><p>TypeScript 5 takes type safety standards in the JavaScript ecosystem to the next level.</p><h2>Decorators</h2><p>TC39 Stage 3 decorators are now supported in TypeScript 5.</p>`,
    },
  },
  {
    slug: 'tailwind-css-4-gelecek',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    tags: ['Tailwind CSS', 'CSS', 'Frontend', 'UI Design'],
    tr: {
      title: 'Tailwind CSS 4.0: CSS Frameworklerinin Geleceği',
      excerpt: 'Tailwind CSS 4.0 ile gelen Oxide engine, CSS-first yapılandırma ve performans devrimiini keşfedin.',
      metaTitle: 'Tailwind CSS 4.0 İnceleme — Oxide Engine, Yeni Özellikler | TechCo',
      metaDesc: 'Tailwind CSS 4.0 yenilikleri: Oxide engine, CSS-first yapılandırma, container queries, 3D transforms.',
      content: `<h2>Tailwind CSS 4.0 Devrimi</h2><p>Tailwind CSS 4.0, tamamen yeniden yazılmış Oxide engine ile birlikte geliyor. Rust tabanlı bu motor, derleme sürelerini 10 kata kadar hızlandırıyor.</p><h2>CSS-First Yapılandırma</h2><p>Artık tailwind.config.js dosyasına ihtiyacınız yok. Tüm yapılandırmayı doğrudan CSS dosyanızda yapabilirsiniz.</p><h2>Container Queries Desteği</h2><p>@container sorguları artık varsayılan olarak destekleniyor.</p>`,
    },
    en: {
      title: 'Tailwind CSS 4.0: The Future of CSS Frameworks',
      excerpt: 'Discover the Oxide engine, CSS-first configuration, and performance revolution in Tailwind CSS 4.0.',
      metaTitle: 'Tailwind CSS 4.0 Review — Oxide Engine, New Features | TechCo Blog',
      metaDesc: 'Tailwind CSS 4.0 features: Oxide engine, CSS-first configuration, container queries.',
      content: `<h2>The Tailwind CSS 4.0 Revolution</h2><p>Tailwind CSS 4.0 comes with a completely rewritten Oxide engine, making compilation up to 10x faster.</p>`,
    },
  },
  {
    slug: 'bulut-mimarisi-aws-vs-azure-vs-gcp',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    tags: ['Cloud', 'AWS', 'Azure', 'GCP', 'DevOps'],
    tr: {
      title: 'Bulut Mimarisi Karşılaştırması: AWS vs Azure vs Google Cloud 2024',
      excerpt: 'İşletmeniz için en uygun bulut platformunu seçerken bilmeniz gereken her şey: fiyatlandırma, performans ve servisler.',
      metaTitle: 'AWS vs Azure vs GCP Karşılaştırma 2024 — Hangi Bulut Platformu? | TechCo',
      metaDesc: 'AWS, Azure ve Google Cloud Platform karşılaştırması 2024. Fiyatlandırma, servisler, performans, artılar ve eksiler.',
      content: `<h2>Bulut Platformu Seçimi</h2><p>Doğru bulut platformu seçimi, projenizin başarısını doğrudan etkiler. Her platformun güçlü ve zayıf yönleri var.</p><h2>AWS (Amazon Web Services)</h2><p>Pazar lideri AWS, en geniş servis yelpazesine sahip. 200+ servisi ile neredeyse her ihtiyacı karşılıyor.</p><h2>Microsoft Azure</h2><p>Enterprise dünyasında güçlü konumu, .NET ve Windows ekosistemiyle tam uyum, hibrit bulut çözümleri ile öne çıkıyor.</p><h2>Google Cloud Platform</h2><p>Veri analitiği, makine öğrenmesi ve Kubernetes konusunda lider. BigQuery ve TensorFlow entegrasyonu rakipsiz.</p><h2>Maliyet Karşılaştırması</h2><p>Küçük-orta ölçekli projeler için GCP genellikle daha uygun maliyetli. Enterprise projeler için Azure'un lisanslama avantajları var.</p>`,
    },
    en: {
      title: 'Cloud Architecture Comparison: AWS vs Azure vs Google Cloud 2024',
      excerpt: 'Everything you need to know when choosing the right cloud platform: pricing, performance, and services.',
      metaTitle: 'AWS vs Azure vs GCP Comparison 2024 — Which Cloud? | TechCo Blog',
      metaDesc: 'AWS, Azure and Google Cloud Platform comparison 2024. Pricing, services, performance, pros and cons.',
      content: `<h2>Choosing a Cloud Platform</h2><p>The right cloud platform choice directly impacts your project's success.</p><h2>AWS</h2><p>Market leader with 200+ services.</p><h2>Azure</h2><p>Strong in enterprise with .NET integration.</p><h2>GCP</h2><p>Leader in data analytics and ML.</p>`,
    },
  },
  {
    slug: 'siber-guvenlik-web-uygulamalari',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    tags: ['Siber Güvenlik', 'Web Security', 'OWASP', 'Güvenlik'],
    tr: {
      title: 'Web Uygulamalarında Siber Güvenlik: OWASP Top 10 ve Korunma Yöntemleri',
      excerpt: 'OWASP Top 10 güvenlik açıkları ve web uygulamalarınızı nasıl koruyacağınızı adım adım öğrenin.',
      metaTitle: 'Web Güvenliği Rehberi — OWASP Top 10, XSS, SQL Injection | TechCo',
      metaDesc: 'Web uygulaması güvenliği: OWASP Top 10, XSS koruması, SQL injection önleme, CSRF, güvenli kimlik doğrulama.',
      content: `<h2>Web Güvenliği Neden Önemli?</h2><p>Her 39 saniyede bir siber saldırı gerçekleşiyor. Web uygulamaları, saldırganların en çok hedef aldığı vektörlerden biri.</p><h2>OWASP Top 10</h2><p>OWASP, web uygulamalarındaki en kritik güvenlik risklerini her yıl güncelliyor.</p><h3>1. Injection Saldırıları</h3><p>SQL, NoSQL ve LDAP injection saldırılarından korunmak için parametreli sorgular ve ORM kullanın.</p><h3>2. Kırık Kimlik Doğrulama</h3><p>Güçlü şifre politikaları, MFA ve güvenli oturum yönetimi uygulayın.</p><h3>3. Cross-Site Scripting (XSS)</h3><p>Kullanıcı girdilerini her zaman sanitize edin ve Content Security Policy (CSP) başlıklarını kullanın.</p><h2>Güvenlik En İyi Uygulamaları</h2><ul><li>HTTPS zorunlu yapın</li><li>Güvenlik başlıklarını yapılandırın</li><li>Bağımlılıkları düzenli güncelleyin</li><li>Rate limiting uygulayın</li></ul>`,
    },
    en: {
      title: 'Cybersecurity in Web Applications: OWASP Top 10 and Protection Methods',
      excerpt: 'Learn about OWASP Top 10 security vulnerabilities and how to protect your web applications step by step.',
      metaTitle: 'Web Security Guide — OWASP Top 10, XSS, SQL Injection | TechCo Blog',
      metaDesc: 'Web application security: OWASP Top 10, XSS protection, SQL injection prevention, CSRF, secure authentication.',
      content: `<h2>Why Web Security Matters</h2><p>A cyberattack happens every 39 seconds. Web applications are one of the most targeted vectors.</p><h2>OWASP Top 10</h2><p>OWASP updates the most critical web security risks annually.</p>`,
    },
  },
  {
    slug: 'mobil-uygulama-react-native-vs-flutter',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
    tags: ['React Native', 'Flutter', 'Mobil', 'Cross-Platform'],
    tr: {
      title: 'React Native vs Flutter: 2024 Mobil Uygulama Geliştirme Karşılaştırması',
      excerpt: 'Mobil uygulama projeniz için React Native mi Flutter mı? Performans, ekosistem ve geliştirici deneyimi karşılaştırması.',
      metaTitle: 'React Native vs Flutter 2024 — Hangisi Daha İyi? | TechCo',
      metaDesc: 'React Native ve Flutter karşılaştırması 2024. Performans, ekosistem, öğrenme eğrisi, topluluk desteği.',
      content: `<h2>Cross-Platform Mobil Geliştirme</h2><p>Tek kod tabanıyla iOS ve Android uygulaması geliştirmek artık standart haline geldi.</p><h2>React Native</h2><p>Meta tarafından geliştirilen React Native, JavaScript/TypeScript bilgisiyle mobil uygulama geliştirmenizi sağlıyor.</p><h2>Flutter</h2><p>Google'ın Dart tabanlı framework'ü Flutter, kendi render motoruyla piksel-mükemmel UI'lar oluşturuyor.</p><h2>Hangisini Seçmeli?</h2><p>Web ekibiniz varsa React Native, performans önceliğinizse Flutter tercih edilebilir.</p>`,
    },
    en: {
      title: 'React Native vs Flutter: 2024 Mobile App Development Comparison',
      excerpt: 'React Native or Flutter for your mobile app project? Performance, ecosystem and developer experience comparison.',
      metaTitle: 'React Native vs Flutter 2024 — Which is Better? | TechCo Blog',
      metaDesc: 'React Native and Flutter comparison 2024. Performance, ecosystem, learning curve, community.',
      content: `<h2>Cross-Platform Mobile Development</h2><p>Building iOS and Android apps from a single codebase has become standard.</p><h2>React Native</h2><p>Developed by Meta, uses JavaScript/TypeScript.</p><h2>Flutter</h2><p>Google's Dart-based framework with its own render engine.</p>`,
    },
  },
  {
    slug: 'postgresql-vs-mongodb-veritabani-secimi',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&q=80',
    tags: ['PostgreSQL', 'MongoDB', 'Veritabanı', 'Backend'],
    tr: {
      title: 'PostgreSQL vs MongoDB: Doğru Veritabanını Seçme Rehberi',
      excerpt: 'İlişkisel mi NoSQL mi? Projeniz için en uygun veritabanını belirlerken göz önünde bulundurmanız gereken faktörler.',
      metaTitle: 'PostgreSQL vs MongoDB — Hangi Veritabanı? Seçim Rehberi | TechCo',
      metaDesc: 'PostgreSQL ve MongoDB karşılaştırması. SQL vs NoSQL, performans, ölçeklenebilirlik, kullanım senaryoları.',
      content: `<h2>SQL vs NoSQL Tartışması</h2><p>Veritabanı seçimi, uygulamanızın mimarisini ve ölçeklenebilirliğini doğrudan etkiler.</p><h2>PostgreSQL</h2><p>En gelişmiş açık kaynak ilişkisel veritabanı. ACID uyumlu, JSON desteği, gelişmiş indeksleme.</p><h2>MongoDB</h2><p>Doküman tabanlı NoSQL veritabanı. Esnek şema, yatay ölçeklenme, hızlı geliştirme.</p>`,
    },
    en: {
      title: 'PostgreSQL vs MongoDB: A Guide to Choosing the Right Database',
      excerpt: 'Relational or NoSQL? Factors to consider when determining the best database for your project.',
      metaTitle: 'PostgreSQL vs MongoDB — Which Database? Selection Guide | TechCo Blog',
      metaDesc: 'PostgreSQL and MongoDB comparison. SQL vs NoSQL, performance, scalability, use cases.',
      content: `<h2>The SQL vs NoSQL Debate</h2><p>Database choice directly affects your application's architecture and scalability.</p>`,
    },
  },
  {
    slug: 'docker-kubernetes-container-rehberi',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80',
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Container'],
    tr: {
      title: 'Docker ve Kubernetes ile Container Orkestrasyonu: Başlangıç Rehberi',
      excerpt: 'Konteyner teknolojileriyle uygulamalarınızı izole edin, ölçeklendirin ve yönetin.',
      metaTitle: 'Docker ve Kubernetes Rehberi — Container Orkestrasyonu | TechCo',
      metaDesc: 'Docker ve Kubernetes başlangıç rehberi. Container oluşturma, orchestration, deployment stratejileri.',
      content: `<h2>Container Neden Gerekli?</h2><p>Containerlar, uygulamanızı bağımlılıklarıyla birlikte paketleyerek "benim bilgisayarımda çalışıyor" sorununu ortadan kaldırır.</p><h2>Docker Temelleri</h2><p>Dockerfile yazımı, image oluşturma, container yönetimi ve Docker Compose ile multi-container uygulamalar.</p><h2>Kubernetes</h2><p>Üretim ortamında container yönetimi için endüstri standardı. Auto-scaling, self-healing ve rolling updates.</p>`,
    },
    en: {
      title: 'Container Orchestration with Docker and Kubernetes: Getting Started',
      excerpt: 'Isolate, scale and manage your applications with container technologies.',
      metaTitle: 'Docker and Kubernetes Guide — Container Orchestration | TechCo Blog',
      metaDesc: 'Docker and Kubernetes getting started guide. Container creation, orchestration, deployment strategies.',
      content: `<h2>Why Containers?</h2><p>Containers package your application with its dependencies, eliminating the "works on my machine" problem.</p>`,
    },
  },
  {
    slug: 'seo-optimizasyonu-2024-rehberi',
    coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80',
    tags: ['SEO', 'Dijital Pazarlama', 'Google', 'Web'],
    isFeatured: true,
    tr: {
      title: 'SEO Optimizasyonu 2024: Google Sıralamasını Yükseltmenin 15 Yolu',
      excerpt: 'Core Web Vitals, E-E-A-T, yapay zeka içerikleri ve teknik SEO ile Google sıralamalarınızı yükseltin.',
      metaTitle: 'SEO Rehberi 2024 — Google Sıralama Yükseltme Teknikleri | TechCo',
      metaDesc: 'SEO optimizasyonu 2024 rehberi: Core Web Vitals, E-E-A-T, teknik SEO, içerik stratejisi, backlink oluşturma.',
      content: `<h2>2024'te SEO Neden Farklı?</h2><p>Google'ın AI Overview özelliği ve yapay zeka ile üretilen içeriklerin artması, SEO stratejilerini köklü biçimde değiştirdi.</p><h2>Core Web Vitals</h2><p>LCP, FID ve CLS metriklerini optimize edin. Google, kullanıcı deneyimini doğrudan sıralama faktörü olarak kullanıyor.</p><h2>E-E-A-T (Experience, Expertise, Authoritativeness, Trust)</h2><p>İçeriklerinizde deneyim, uzmanlık, otoritelik ve güvenilirlik sinyalleri verin.</p><h2>Teknik SEO</h2><ul><li>Structured Data (JSON-LD) kullanın</li><li>Canonical URL'leri doğru ayarlayın</li><li>Hreflang etiketlerini çok dilli siteler için uygulayın</li><li>XML Sitemap'i güncel tutun</li><li>robots.txt'i optimize edin</li></ul><h2>İçerik Stratejisi</h2><p>Derinlemesine, özgün ve kullanıcı niyetine uygun içerikler üretin. AI ile üretilen yüzeysel içerikler artık Google tarafından cezalandırılıyor.</p>`,
    },
    en: {
      title: 'SEO Optimization 2024: 15 Ways to Boost Your Google Rankings',
      excerpt: 'Improve your Google rankings with Core Web Vitals, E-E-A-T, AI content strategies and technical SEO.',
      metaTitle: 'SEO Guide 2024 — Google Ranking Techniques | TechCo Blog',
      metaDesc: 'SEO optimization guide 2024: Core Web Vitals, E-E-A-T, technical SEO, content strategy, backlink building.',
      content: `<h2>Why SEO is Different in 2024</h2><p>Google's AI Overview and the rise of AI-generated content have fundamentally changed SEO strategies.</p><h2>Core Web Vitals</h2><p>Optimize LCP, FID, and CLS metrics.</p>`,
    },
  },
  {
    slug: 'progressive-web-apps-pwa-rehberi',
    coverImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80',
    tags: ['PWA', 'Web', 'Mobil', 'Service Worker'],
    tr: {
      title: 'Progressive Web Apps (PWA): Native Uygulama Deneyimi Web ile',
      excerpt: 'PWA ile offline çalışabilen, push bildirim gönderen ve ana ekrana eklenebilen web uygulamaları geliştirin.',
      metaTitle: 'PWA Rehberi — Progressive Web App Geliştirme | TechCo',
      metaDesc: 'Progressive Web Apps (PWA) geliştirme rehberi. Service Worker, manifest, offline destek, push notifications.',
      content: `<h2>PWA Nedir?</h2><p>Progressive Web Apps, web teknolojileri ile native uygulama deneyimi sunan modern yaklaşımdır.</p><h2>Service Workers</h2><p>Arka planda çalışan script'ler ile offline destek, önbellekleme ve push bildirimleri mümkün.</p><h2>Web App Manifest</h2><p>Uygulamanızın ana ekrana nasıl ekleneceğini ve tam ekran modunda nasıl çalışacağını tanımlar.</p>`,
    },
    en: {
      title: 'Progressive Web Apps (PWA): Native App Experience with the Web',
      excerpt: 'Build web apps that work offline, send push notifications, and can be added to the home screen with PWA.',
      metaTitle: 'PWA Guide — Progressive Web App Development | TechCo Blog',
      metaDesc: 'Progressive Web Apps (PWA) development guide. Service Worker, manifest, offline support, push notifications.',
      content: `<h2>What is PWA?</h2><p>Progressive Web Apps are a modern approach that provides native app experience using web technologies.</p>`,
    },
  },
  {
    slug: 'graphql-vs-rest-api-karsilastirma',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    tags: ['GraphQL', 'REST', 'API', 'Backend'],
    tr: {
      title: 'GraphQL vs REST API: Hangisi Projeniz İçin Daha Uygun?',
      excerpt: 'İki popüler API mimarisini performans, esneklik ve kullanım kolaylığı açısından karşılaştırıyoruz.',
      metaTitle: 'GraphQL vs REST API Karşılaştırma — Hangisi Daha İyi? | TechCo',
      metaDesc: 'GraphQL ve REST API karşılaştırması. Over-fetching, under-fetching, performans, caching, şema tasarımı.',
      content: `<h2>API Mimarisi Seçimi</h2><p>Doğru API mimarisi seçmek, uygulamanızın performansını ve geliştirme hızını doğrudan etkiler.</p><h2>REST API</h2><p>Kaynak tabanlı, HTTP metotlarını kullanan geleneksel yaklaşım. Basit, anlaşılır ve geniş araç desteği.</p><h2>GraphQL</h2><p>Facebook tarafından geliştirilen sorgu dili. İstemci ihtiyaç duyduğu veriyi tam olarak isteyebilir.</p>`,
    },
    en: {
      title: 'GraphQL vs REST API: Which is Better for Your Project?',
      excerpt: 'We compare two popular API architectures in terms of performance, flexibility, and ease of use.',
      metaTitle: 'GraphQL vs REST API Comparison — Which is Better? | TechCo Blog',
      metaDesc: 'GraphQL and REST API comparison. Over-fetching, under-fetching, performance, caching, schema design.',
      content: `<h2>Choosing API Architecture</h2><p>The right API architecture choice directly impacts your application's performance and development speed.</p>`,
    },
  },
  {
    slug: 'ui-ux-tasarim-trendleri-2024',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    tags: ['UI/UX', 'Tasarım', 'Design', 'Figma'],
    tr: {
      title: 'UI/UX Tasarım Trendleri 2024: Kullanıcı Deneyiminin Geleceği',
      excerpt: 'Bento grid, glassmorphism, mikro animasyonlar ve AI destekli tasarım araçları ile 2024 trendleri.',
      metaTitle: 'UI/UX Tasarım Trendleri 2024 — Modern Web Tasarım | TechCo',
      metaDesc: 'UI/UX tasarım trendleri 2024: Bento grid, glassmorphism, 3D elementler, mikro animasyonlar, dark mode.',
      content: `<h2>2024 Tasarım Trendleri</h2><p>Kullanıcı deneyimi tasarımı her geçen yıl daha sofistike hale geliyor.</p><h2>Bento Grid Layout</h2><p>Apple'ın popülerleştirdiği Bento grid, bilgiyi modüler kutucuklarda sunuyor.</p><h2>3D ve Mikro Animasyonlar</h2><p>CSS 3D transforms ve Framer Motion gibi kütüphanelerle etkileşimli deneyimler.</p><h2>AI Destekli Tasarım</h2><p>Figma AI, Galileo AI ve diğer araçlarla tasarım süreci hızlanıyor.</p>`,
    },
    en: {
      title: 'UI/UX Design Trends 2024: The Future of User Experience',
      excerpt: 'Bento grid, glassmorphism, micro-animations and AI-powered design tools: 2024 trends.',
      metaTitle: 'UI/UX Design Trends 2024 — Modern Web Design | TechCo Blog',
      metaDesc: 'UI/UX design trends 2024: Bento grid, glassmorphism, 3D elements, micro-animations, dark mode.',
      content: `<h2>2024 Design Trends</h2><p>User experience design becomes more sophisticated each year.</p>`,
    },
  },
  {
    slug: 'prisma-orm-nextjs-veritabani',
    coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80',
    tags: ['Prisma', 'ORM', 'Next.js', 'Veritabanı'],
    tr: {
      title: 'Prisma ORM ile Next.js Veritabanı Yönetimi: Tam Rehber',
      excerpt: 'Prisma ORM kullanarak Next.js uygulamalarında tip-güvenli veritabanı işlemleri nasıl yapılır?',
      metaTitle: 'Prisma ORM + Next.js Rehberi — Veritabanı Yönetimi | TechCo',
      metaDesc: 'Prisma ORM ve Next.js ile veritabanı yönetimi. Schema tasarımı, migration, seeding, CRUD işlemleri.',
      content: `<h2>Prisma ORM Nedir?</h2><p>Prisma, Node.js ve TypeScript için modern bir ORM. Tip-güvenli sorgular, otomatik migration ve görsel veritabanı yönetimi sunuyor.</p><h2>Schema Tasarımı</h2><p>Prisma Schema Language (PSL) ile modellerinizi deklaratif olarak tanımlayın.</p><h2>Next.js Entegrasyonu</h2><p>Server Components ile doğrudan Prisma sorguları çalıştırabilirsiniz.</p>`,
    },
    en: {
      title: 'Database Management with Prisma ORM in Next.js: Complete Guide',
      excerpt: 'How to perform type-safe database operations in Next.js applications using Prisma ORM.',
      metaTitle: 'Prisma ORM + Next.js Guide — Database Management | TechCo Blog',
      metaDesc: 'Database management with Prisma ORM and Next.js. Schema design, migration, seeding, CRUD operations.',
      content: `<h2>What is Prisma ORM?</h2><p>Prisma is a modern ORM for Node.js and TypeScript. It offers type-safe queries, automatic migrations, and visual database management.</p>`,
    },
  },
  {
    slug: 'web-performans-optimizasyonu',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    tags: ['Performans', 'Web Vitals', 'Optimizasyon', 'Lighthouse'],
    tr: {
      title: 'Web Performans Optimizasyonu: Lighthouse 100 Puan Almak İçin Rehber',
      excerpt: 'Lazy loading, code splitting, image optimization ve CDN stratejileriyle web sitenizi hızlandırın.',
      metaTitle: 'Web Performans Optimizasyonu — Lighthouse 100 Puan Rehberi | TechCo',
      metaDesc: 'Web performans optimizasyonu: Lazy loading, code splitting, image optimization, CDN, Core Web Vitals.',
      content: `<h2>Performans Neden Önemli?</h2><p>Google araştırmasına göre sayfa yüklenme süresi 1 saniyeden 3 saniyeye çıktığında, hemen çıkma oranı %32 artıyor.</p><h2>Image Optimization</h2><p>Next.js Image bileşeni ile WebP/AVIF formatında, responsive ve lazy loaded görseller sunun.</p><h2>Code Splitting</h2><p>Dynamic imports ile sadece ihtiyaç duyulan JavaScript'i yükleyin.</p>`,
    },
    en: {
      title: 'Web Performance Optimization: Guide to Lighthouse Score 100',
      excerpt: 'Speed up your website with lazy loading, code splitting, image optimization and CDN strategies.',
      metaTitle: 'Web Performance Optimization — Lighthouse 100 Guide | TechCo Blog',
      metaDesc: 'Web performance optimization: Lazy loading, code splitting, image optimization, CDN, Core Web Vitals.',
      content: `<h2>Why Performance Matters</h2><p>According to Google, when page load time goes from 1 to 3 seconds, bounce rate increases by 32%.</p>`,
    },
  },
  {
    slug: 'microservices-mimarisi-rehberi',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    tags: ['Microservices', 'Mimari', 'Backend', 'API'],
    tr: {
      title: 'Microservices Mimarisi: Monolitten Mikro Servislere Geçiş',
      excerpt: 'Microservices mimarisinin avantajları, zorlukları ve başarılı bir geçiş stratejisi nasıl oluşturulur?',
      metaTitle: 'Microservices Mimarisi Rehberi — Monolitten Geçiş | TechCo',
      metaDesc: 'Microservices mimarisi rehberi. Monolitten geçiş, servis iletişimi, event-driven architecture.',
      content: `<h2>Neden Microservices?</h2><p>Bağımsız dağıtım, teknoloji çeşitliliği ve ölçeklenebilirlik.</p><h2>Ne Zaman Microservices?</h2><p>Her proje microservices gerektirmez. Küçük ekipler için monolit genellikle daha uygun.</p>`,
    },
    en: {
      title: 'Microservices Architecture: Transitioning from Monolith to Microservices',
      excerpt: 'Advantages and challenges of microservices architecture, and how to create a successful transition strategy.',
      metaTitle: 'Microservices Architecture Guide — Monolith Transition | TechCo Blog',
      metaDesc: 'Microservices architecture guide. Monolith transition, service communication, event-driven architecture.',
      content: `<h2>Why Microservices?</h2><p>Independent deployment, technology diversity, and scalability.</p>`,
    },
  },
  {
    slug: 'git-versiyon-kontrol-ileri-seviye',
    coverImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&q=80',
    tags: ['Git', 'Version Control', 'GitHub', 'DevOps'],
    tr: {
      title: 'Git İleri Seviye: Rebase, Cherry-Pick ve Branch Stratejileri',
      excerpt: 'Git rebase, cherry-pick, bisect ve profesyonel branch stratejileri ile versiyon kontrolünüzü üst seviyeye taşıyın.',
      metaTitle: 'Git İleri Seviye Rehberi — Rebase, Branch Stratejileri | TechCo',
      metaDesc: 'Git ileri seviye: interactive rebase, cherry-pick, bisect, Git Flow, trunk-based development.',
      content: `<h2>Git Rebase vs Merge</h2><p>Rebase, temiz bir commit geçmişi sağlar. Ancak paylaşılan branch'lerde dikkatli kullanılmalıdır.</p><h2>Branch Stratejileri</h2><p>Git Flow, GitHub Flow ve Trunk-based Development karşılaştırması.</p>`,
    },
    en: {
      title: 'Advanced Git: Rebase, Cherry-Pick and Branch Strategies',
      excerpt: 'Take your version control to the next level with Git rebase, cherry-pick, bisect and professional branch strategies.',
      metaTitle: 'Advanced Git Guide — Rebase, Branch Strategies | TechCo Blog',
      metaDesc: 'Advanced Git: interactive rebase, cherry-pick, bisect, Git Flow, trunk-based development.',
      content: `<h2>Git Rebase vs Merge</h2><p>Rebase provides a clean commit history. However, it should be used carefully on shared branches.</p>`,
    },
  },
  {
    slug: 'e-ticaret-web-sitesi-gelistirme',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    tags: ['E-Ticaret', 'Shopify', 'WooCommerce', 'Web'],
    tr: {
      title: 'E-Ticaret Web Sitesi Geliştirme: Platform Seçiminden Lansana',
      excerpt: 'Shopify, WooCommerce veya özel çözüm? E-ticaret sitenizi kurarken bilmeniz gereken her şey.',
      metaTitle: 'E-Ticaret Web Sitesi Rehberi — Platform Seçimi, SEO | TechCo',
      metaDesc: 'E-ticaret web sitesi geliştirme rehberi. Shopify, WooCommerce, özel çözüm karşılaştırması, ödeme entegrasyonu.',
      content: `<h2>Platform Seçimi</h2><p>Her platformun güçlü yönleri ve sınırlamaları var. İhtiyaçlarınıza göre seçim yapın.</p><h2>Ödeme Entegrasyonu</h2><p>Stripe, iyzico ve PayTR gibi ödeme altyapılarını entegre edin.</p><h2>E-Ticaret SEO</h2><p>Ürün sayfaları, kategori sayfaları ve blog içerikleri ile organik trafik çekin.</p>`,
    },
    en: {
      title: 'E-Commerce Website Development: From Platform Selection to Launch',
      excerpt: 'Shopify, WooCommerce or custom solution? Everything you need to know when building your e-commerce site.',
      metaTitle: 'E-Commerce Website Guide — Platform Selection, SEO | TechCo Blog',
      metaDesc: 'E-commerce website development guide. Shopify, WooCommerce, custom solution comparison, payment integration.',
      content: `<h2>Platform Selection</h2><p>Each platform has its strengths and limitations. Choose based on your needs.</p>`,
    },
  },
  {
    slug: 'agile-scrum-yazilim-gelistirme',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    tags: ['Agile', 'Scrum', 'Proje Yönetimi', 'Yazılım'],
    tr: {
      title: 'Agile ve Scrum ile Yazılım Geliştirme: Verimli Proje Yönetimi',
      excerpt: 'Sprint planlama, daily standup, retrospektif ve Kanban ile yazılım projelerinizi daha verimli yönetin.',
      metaTitle: 'Agile ve Scrum Rehberi — Yazılım Proje Yönetimi | TechCo',
      metaDesc: 'Agile ve Scrum yazılım geliştirme rehberi. Sprint planlama, user story, retrospektif, Kanban.',
      content: `<h2>Agile Neden Önemli?</h2><p>Waterfall yaklaşımın aksine, Agile metodoloji değişime hızlı adapte olmayı sağlar.</p><h2>Scrum Framework</h2><p>Sprint bazlı çalışma, roller (Product Owner, Scrum Master, Development Team) ve seremoniler.</p>`,
    },
    en: {
      title: 'Software Development with Agile and Scrum: Efficient Project Management',
      excerpt: 'Manage your software projects more efficiently with sprint planning, daily standups, retrospectives and Kanban.',
      metaTitle: 'Agile and Scrum Guide — Software Project Management | TechCo Blog',
      metaDesc: 'Agile and Scrum software development guide. Sprint planning, user stories, retrospectives, Kanban.',
      content: `<h2>Why Agile Matters</h2><p>Unlike the Waterfall approach, Agile methodology enables quick adaptation to change.</p>`,
    },
  },
];

async function main() {
  console.log('🌱 Seeding 20 blog posts...');

  // Get or create a category
  let category = await prisma.blogCategory.findFirst({ where: { slug: 'teknoloji' } });
  if (!category) {
    category = await prisma.blogCategory.create({
      data: {
        slug: 'teknoloji',
        translations: {
          create: [
            { locale: 'tr', name: 'Teknoloji' },
            { locale: 'en', name: 'Technology' },
          ],
        },
      },
    });
    console.log('  ✅ Technology category created');
  }

  let count = 0;
  for (const post of BLOG_POSTS) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log(`  ⏭️  Skipping ${post.slug} (exists)`);
      continue;
    }

    const publishedAt = new Date();
    publishedAt.setDate(publishedAt.getDate() - (BLOG_POSTS.length - count) * 3); // Spread over time

    await prisma.blogPost.create({
      data: {
        slug: post.slug,
        coverImage: post.coverImage,
        tags: post.tags,
        isFeatured: post.isFeatured || false,
        isPublished: true,
        publishedAt,
        categoryId: category.id,
        translations: {
          create: [
            {
              locale: 'tr',
              title: post.tr.title,
              excerpt: post.tr.excerpt,
              content: post.tr.content,
              metaTitle: post.tr.metaTitle,
              metaDesc: post.tr.metaDesc,
            },
            {
              locale: 'en',
              title: post.en.title,
              excerpt: post.en.excerpt,
              content: post.en.content,
              metaTitle: post.en.metaTitle,
              metaDesc: post.en.metaDesc,
            },
          ],
        },
      },
    });
    count++;
    console.log(`  ✅ ${count}/20 — ${post.slug}`);
  }

  console.log(`\n🎉 ${count} new blog posts seeded!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
