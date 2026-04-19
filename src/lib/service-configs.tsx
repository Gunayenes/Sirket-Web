import Image from 'next/image';
import {
  Globe, Smartphone, Code2, Database, Bot, Server, BarChart3, Wrench,
  ShoppingBag, Apple, Cpu, BarChart, Network, Zap, Cloud, Headphones,
  TrendingUp, Lock, Activity, Users, MessageSquare, FileBarChart, GitBranch, RefreshCw,
} from 'lucide-react';
import type { ReactNode } from 'react';

export interface ServiceConfig {
  // Hero
  heroGradient: string;
  heroOrbColor: string;
  heroImage?: string;
  iconBg: string;
  textGradient: string;
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  // Visual section
  visualTitle: string;
  visualSubtitle: string;
  visual: ReactNode;
  // Service-specific stats
  stats: { icon: typeof Globe; value: string; label: string }[];
  // Tech stack tags
  techStack: string[];
  // Feature image
  featureImage: string;
}

// ─── 1. Kurumsal Web & E-Ticaret ─────────────────────────────────────
const webEcommerce: ServiceConfig = {
  heroGradient: 'from-blue-950 via-indigo-900 to-purple-950',
  heroOrbColor: 'bg-blue-500',
  heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80',
  iconBg: 'from-blue-500 to-indigo-600',
  textGradient: 'from-blue-400 via-cyan-300 to-indigo-400',
  badgeColor: 'text-blue-300',
  badgeBg: 'bg-blue-500/10',
  badgeBorder: 'border-blue-500/20',
  visualTitle: 'Modern Web Deneyimi',
  visualSubtitle: 'Görseli güzel, performansı yüksek web siteleri',
  visual: (
    <div className="relative max-w-4xl mx-auto">
      <div className="rounded-2xl bg-gray-900 p-3 shadow-2xl shadow-blue-500/30">
        <div className="flex items-center gap-2 px-3 py-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="ml-3 flex-1 h-6 bg-gray-800 rounded text-xs text-gray-400 px-3 flex items-center">
            https://markaniz.com
          </div>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80"
            alt="Modern e-ticaret sitesi"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-transparent to-indigo-600/40" />
        </div>
      </div>
    </div>
  ),
  stats: [
    { icon: TrendingUp, value: '+%180', label: 'Dönüşüm Oranı' },
    { icon: Zap, value: '<2sn', label: 'Sayfa Hızı' },
    { icon: Globe, value: '100/100', label: 'SEO Skoru' },
    { icon: Users, value: '7/24', label: 'Erişilebilirlik' },
  ],
  techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Stripe', 'PostgreSQL'],
  featureImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
};

// ─── 2. Mobil Uygulama ────────────────────────────────────────────────
const mobileApps: ServiceConfig = {
  heroGradient: 'from-emerald-950 via-teal-900 to-cyan-950',
  heroOrbColor: 'bg-emerald-500',
  heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80',
  iconBg: 'from-emerald-500 to-teal-600',
  textGradient: 'from-emerald-400 via-teal-300 to-cyan-400',
  badgeColor: 'text-emerald-300',
  badgeBg: 'bg-emerald-500/10',
  badgeBorder: 'border-emerald-500/20',
  visualTitle: 'iOS & Android Uygulamalar',
  visualSubtitle: 'Tek kod tabanı, iki platform',
  visual: (
    <div className="flex justify-center items-end gap-4 lg:gap-6">
      {[
        {
          rotate: '-12deg',
          src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
          big: false,
        },
        {
          rotate: '0deg',
          src: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&q=80',
          big: true,
        },
        {
          rotate: '12deg',
          src: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80',
          big: false,
        },
      ].map((phone, i) => (
        <div
          key={i}
          className={`relative ${phone.big ? 'w-44 h-[22rem] lg:w-52 lg:h-[26rem]' : 'w-36 h-72 lg:w-44 lg:h-[22rem]'} rounded-[2rem] bg-gray-900 p-2 shadow-2xl shadow-emerald-500/30`}
          style={{ transform: `rotate(${phone.rotate})` }}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-b-xl z-20" />
          <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden">
            <Image src={phone.src} alt="Mobil uygulama" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/30 to-cyan-600/30" />
          </div>
        </div>
      ))}
    </div>
  ),
  stats: [
    { icon: Apple, value: 'iOS', label: 'App Store' },
    { icon: Smartphone, value: 'Android', label: 'Google Play' },
    { icon: Zap, value: '60fps', label: 'Akıcı Performans' },
    { icon: Users, value: 'Native', label: 'Hissi Tasarım' },
  ],
  techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Push Notifications'],
  featureImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=1200&q=80',
};

// ─── 3. Özel Yazılım ──────────────────────────────────────────────────
const customSoftware: ServiceConfig = {
  heroGradient: 'from-violet-950 via-purple-900 to-fuchsia-950',
  heroOrbColor: 'bg-violet-500',
  heroImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1600&q=80',
  iconBg: 'from-violet-500 to-purple-600',
  textGradient: 'from-violet-400 via-purple-300 to-fuchsia-400',
  badgeColor: 'text-violet-300',
  badgeBg: 'bg-violet-500/10',
  badgeBorder: 'border-violet-500/20',
  visualTitle: 'İhtiyacınıza Özel Geliştirme',
  visualSubtitle: 'İş süreçlerinizi otomatikleştirin',
  visual: (
    <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Code editor */}
      <div className="rounded-2xl bg-gray-900 p-6 shadow-2xl shadow-violet-500/30 font-mono text-sm text-left">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
          <Code2 className="h-5 w-5 text-violet-400" />
          <span className="text-gray-400">project-management.ts</span>
        </div>
        <div className="space-y-2">
          <div><span className="text-pink-400">export</span> <span className="text-blue-400">async function</span> <span className="text-yellow-400">processOrder</span><span className="text-gray-300">() {`{`}</span></div>
          <div className="pl-4"><span className="text-gray-500">// İş kuralı: Stok kontrolü</span></div>
          <div className="pl-4"><span className="text-blue-400">const</span> <span className="text-cyan-300">stock</span> <span className="text-pink-400">=</span> <span className="text-blue-400">await</span> <span className="text-yellow-400">checkInventory</span><span className="text-gray-300">();</span></div>
          <div className="pl-4"><span className="text-blue-400">if</span> <span className="text-gray-300">(stock {`>`} 0) {`{`}</span></div>
          <div className="pl-8"><span className="text-blue-400">return</span> <span className="text-yellow-400">createOrder</span><span className="text-gray-300">();</span></div>
          <div className="pl-4 text-gray-300">{`}`}</div>
          <div className="text-gray-300">{`}`}</div>
        </div>
      </div>
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/30 aspect-video lg:aspect-auto">
        <Image
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
          alt="Yazılım geliştirme"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/50 via-transparent to-purple-900/50" />
      </div>
    </div>
  ),
  stats: [
    { icon: Cpu, value: '%100', label: 'Size Özel' },
    { icon: GitBranch, value: '∞', label: 'Modül Sayısı' },
    { icon: RefreshCw, value: 'Agile', label: 'Geliştirme' },
    { icon: Lock, value: 'Özel', label: 'Lisans' },
  ],
  techStack: ['Node.js', 'Python', 'C#', 'Java', 'Microservices', 'Docker'],
  featureImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
};

// ─── 4. CRM / ERP ─────────────────────────────────────────────────────
const crmErp: ServiceConfig = {
  heroGradient: 'from-cyan-950 via-blue-900 to-indigo-950',
  heroOrbColor: 'bg-cyan-500',
  heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
  iconBg: 'from-cyan-500 to-blue-600',
  textGradient: 'from-cyan-400 via-blue-300 to-indigo-400',
  badgeColor: 'text-cyan-300',
  badgeBg: 'bg-cyan-500/10',
  badgeBorder: 'border-cyan-500/20',
  visualTitle: 'Tek Panelden Yönetim',
  visualSubtitle: 'Müşteri, satış ve kaynak takibi',
  visual: (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 max-w-6xl mx-auto items-center">
      {/* Image side */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/30 aspect-square">
        <Image
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
          alt="İş yönetimi"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/40 to-blue-600/40" />
      </div>
      {/* Dashboard mockup */}
      <div className="rounded-2xl bg-gray-900 p-6 shadow-2xl shadow-cyan-500/30">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Toplam Satış', value: '₺248K', icon: TrendingUp, color: 'cyan' },
            { label: 'Aktif Müşteri', value: '1,284', icon: Users, color: 'blue' },
            { label: 'Açık Sipariş', value: '47', icon: Activity, color: 'indigo' },
          ].map((card, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-3 border border-gray-700">
              <card.icon className={`h-4 w-4 mb-2 text-${card.color}-400`} />
              <div className="text-[10px] text-gray-400 mb-0.5">{card.label}</div>
              <div className="text-base font-bold text-white">{card.value}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="text-xs text-gray-400 mb-3">Aylık Performans</div>
          <div className="flex items-end gap-1.5 h-20">
            {[40, 65, 50, 80, 70, 95, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-cyan-600 to-blue-400 opacity-80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  stats: [
    { icon: Users, value: 'CRM', label: 'Müşteri Yönetimi' },
    { icon: Database, value: 'ERP', label: 'Kaynak Planlaması' },
    { icon: BarChart, value: '360°', label: 'Raporlama' },
    { icon: Network, value: 'Cloud', label: 'Erişim' },
  ],
  techStack: ['SAP', 'Microsoft Dynamics', 'Salesforce', 'Custom CRM', 'API', 'Analytics'],
  featureImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
};

// ─── 5. Yapay Zeka & Otomasyon ────────────────────────────────────────
const aiAutomation: ServiceConfig = {
  heroGradient: 'from-pink-950 via-fuchsia-900 to-purple-950',
  heroOrbColor: 'bg-fuchsia-500',
  heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80',
  iconBg: 'from-pink-500 to-fuchsia-600',
  textGradient: 'from-pink-400 via-fuchsia-300 to-purple-400',
  badgeColor: 'text-fuchsia-300',
  badgeBg: 'bg-fuchsia-500/10',
  badgeBorder: 'border-fuchsia-500/20',
  visualTitle: 'Yapay Zeka Destekli Çözümler',
  visualSubtitle: 'Süreçlerinizi akıllı sistemlerle hızlandırın',
  visual: (
    <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* AI image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-fuchsia-500/30 aspect-square">
        <Image
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
          alt="Yapay zeka"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/50 via-transparent to-fuchsia-900/50" />
      </div>
      {/* Neural network visualization */}
      <div className="relative bg-gray-900 rounded-2xl p-8 shadow-2xl shadow-fuchsia-500/30 flex items-center justify-center">
        <div className="relative w-full h-72">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 shadow-lg shadow-pink-500/50" />
            ))}
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-600 to-fuchsia-600 shadow-2xl shadow-pink-500/60 flex items-center justify-center">
              <Bot className="h-12 w-12 text-white" />
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 shadow-lg shadow-fuchsia-500/50" />
            ))}
          </div>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 288" preserveAspectRatio="none">
            {[40, 100, 160, 220].map((y, i) => (
              <g key={i}>
                <line x1="40" y1={y} x2="200" y2="144" stroke="#ec4899" strokeWidth="1" opacity="0.5" />
                <line x1="200" y1="144" x2="360" y2={y} stroke="#a855f7" strokeWidth="1" opacity="0.5" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  ),
  stats: [
    { icon: Bot, value: 'GPT', label: 'Chatbot' },
    { icon: Cpu, value: 'ML', label: 'Makine Öğrenmesi' },
    { icon: MessageSquare, value: 'NLP', label: 'Doğal Dil' },
    { icon: Zap, value: '%70', label: 'Verimlilik Artışı' },
  ],
  techStack: ['OpenAI', 'TensorFlow', 'PyTorch', 'LangChain', 'Vector DB', 'Python'],
  featureImage: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=1200&q=80',
};

// ─── 6. API & Backend ─────────────────────────────────────────────────
const apiBackend: ServiceConfig = {
  heroGradient: 'from-orange-950 via-amber-900 to-yellow-950',
  heroOrbColor: 'bg-orange-500',
  heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80',
  iconBg: 'from-orange-500 to-amber-600',
  textGradient: 'from-orange-400 via-amber-300 to-yellow-400',
  badgeColor: 'text-orange-300',
  badgeBg: 'bg-orange-500/10',
  badgeBorder: 'border-orange-500/20',
  visualTitle: 'Güçlü Backend Altyapısı',
  visualSubtitle: 'Ölçeklenebilir API ve mikroservisler',
  visual: (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 max-w-5xl mx-auto">
      {/* API mockup */}
      <div className="rounded-2xl bg-gray-900 p-6 shadow-2xl shadow-orange-500/30 font-mono text-sm text-left">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
          <Server className="h-5 w-5 text-orange-400" />
          <span className="text-gray-400">REST API · GraphQL</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded text-xs bg-emerald-900 text-emerald-300 font-bold">GET</span>
            <span className="text-gray-300">/api/v1/users</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded text-xs bg-blue-900 text-blue-300 font-bold">POST</span>
            <span className="text-gray-300">/api/v1/orders</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded text-xs bg-amber-900 text-amber-300 font-bold">PUT</span>
            <span className="text-gray-300">/api/v1/products/{`{id}`}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded text-xs bg-red-900 text-red-300 font-bold">DELETE</span>
            <span className="text-gray-300">/api/v1/sessions/{`{id}`}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 text-xs text-gray-500">
            ✓ JWT · ✓ Rate Limiting · ✓ Caching · ✓ Docs
          </div>
        </div>
      </div>
      {/* Server image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/30">
        <Image
          src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80"
          alt="Sunucu altyapısı"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/60 via-transparent to-amber-900/60" />
      </div>
    </div>
  ),
  stats: [
    { icon: Server, value: 'REST', label: 'API Standardı' },
    { icon: Network, value: 'GraphQL', label: 'Esnek Sorgu' },
    { icon: Zap, value: '<100ms', label: 'Yanıt Süresi' },
    { icon: Lock, value: 'JWT', label: 'Güvenlik' },
  ],
  techStack: ['Node.js', 'Express', 'Fastify', 'PostgreSQL', 'Redis', 'Kubernetes'],
  featureImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
};

// ─── 7. Veri Analizi & Raporlama ──────────────────────────────────────
const dataAnalytics: ServiceConfig = {
  heroGradient: 'from-emerald-950 via-green-900 to-teal-950',
  heroOrbColor: 'bg-green-500',
  heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
  iconBg: 'from-green-500 to-emerald-600',
  textGradient: 'from-green-400 via-emerald-300 to-teal-400',
  badgeColor: 'text-green-300',
  badgeBg: 'bg-green-500/10',
  badgeBorder: 'border-green-500/20',
  visualTitle: 'Veri Odaklı Karar Verme',
  visualSubtitle: 'Verilerinizi anlamlı içgörülere dönüştürün',
  visual: (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 max-w-6xl mx-auto items-center">
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-green-500/30 aspect-square">
        <Image
          src="https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80"
          alt="Veri analizi"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 via-transparent to-emerald-900/40" />
      </div>
      {/* Dashboard */}
      <div className="rounded-2xl bg-gray-900 p-6 shadow-2xl shadow-green-500/30">
        <div className="flex items-end gap-2 h-40 mb-4">
          {[60, 80, 45, 90, 70, 95, 75, 100, 65, 85, 90, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-green-600 to-emerald-400"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Toplam Gelir', value: '₺1.2M', change: '+24%' },
            { label: 'Müşteri', value: '8,492', change: '+12%' },
            { label: 'Ortalama', value: '₺485', change: '+8%' },
          ].map((m, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="text-[10px] text-gray-400">{m.label}</div>
              <div className="text-base font-bold text-white">{m.value}</div>
              <div className="text-xs text-emerald-400">{m.change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  stats: [
    { icon: BarChart3, value: 'BI', label: 'İş Zekası' },
    { icon: FileBarChart, value: 'Real-Time', label: 'Anlık Veri' },
    { icon: Activity, value: '∞', label: 'Veri Kaynağı' },
    { icon: TrendingUp, value: '%100', label: 'Özelleştirme' },
  ],
  techStack: ['Power BI', 'Tableau', 'Looker', 'Python', 'BigQuery', 'Snowflake'],
  featureImage: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80',
};

// ─── 8. Teknik Destek & Bakım ─────────────────────────────────────────
const supportMaintenance: ServiceConfig = {
  heroGradient: 'from-rose-950 via-red-900 to-orange-950',
  heroOrbColor: 'bg-rose-500',
  heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80',
  iconBg: 'from-rose-500 to-red-600',
  textGradient: 'from-rose-400 via-red-300 to-orange-400',
  badgeColor: 'text-rose-300',
  badgeBg: 'bg-rose-500/10',
  badgeBorder: 'border-rose-500/20',
  visualTitle: 'Kesintisiz Destek',
  visualSubtitle: '7/24 yanınızdayız',
  visual: (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-6 max-w-5xl mx-auto items-center">
      {/* Support image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-rose-500/30 aspect-square">
        <Image
          src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80"
          alt="Teknik destek"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/40 via-transparent to-red-900/40" />
      </div>
      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Headphones, title: '7/24 Destek', desc: 'Her zaman ulaşılabilir', color: 'rose' },
          { icon: Wrench, title: 'Bakım', desc: 'Düzenli güncellemeler', color: 'red' },
          { icon: Activity, title: '%99.9 Uptime', desc: 'Kesintisiz çalışma', color: 'orange' },
          { icon: Cloud, title: 'Sunucu', desc: 'Performans izleme', color: 'amber' },
        ].map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br from-${card.color}-500 to-${card.color}-600 rounded-2xl p-5 text-white shadow-xl shadow-${card.color}-500/30`}
          >
            <card.icon className="h-8 w-8 mb-3" />
            <div className="text-base font-bold mb-1">{card.title}</div>
            <div className="text-xs opacity-90">{card.desc}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  stats: [
    { icon: Headphones, value: '7/24', label: 'Destek' },
    { icon: Activity, value: '%99.9', label: 'Uptime' },
    { icon: Zap, value: '<15dk', label: 'Yanıt Süresi' },
    { icon: Wrench, value: 'Aylık', label: 'Bakım' },
  ],
  techStack: ['Ticket System', 'Monitoring', 'Backup', 'Security Patches', 'CDN', 'Logs'],
  featureImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
};

export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  'web-ecommerce': webEcommerce,
  'mobile-apps': mobileApps,
  'custom-software': customSoftware,
  'crm-erp': crmErp,
  'ai-automation': aiAutomation,
  'api-backend': apiBackend,
  'data-analytics': dataAnalytics,
  'support-maintenance': supportMaintenance,
};

export function getServiceConfig(slug: string): ServiceConfig {
  return SERVICE_CONFIGS[slug] || customSoftware;
}
