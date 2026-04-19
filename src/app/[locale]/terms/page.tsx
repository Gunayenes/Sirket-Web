import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Şartları | Dahi Teknoloji — Web Sitesi Kullanım Koşulları',
  description: 'Dahi Teknoloji web sitesi kullanım şartları, fikri mülkiyet hakları, sorumluluk sınırlamaları ve yasal koşullar hakkında bilgi.',
};

export default function TermsPage() {
  return (
    <article className="pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
          Kullanım Şartları
        </h1>
        <p className="text-sm text-gray-400 mb-10">Son güncelleme: 29 Mart 2026</p>

        <div className="prose prose-gray max-w-none prose-headings:font-display prose-headings:font-bold">
          <h2>1. Genel Koşullar</h2>
          <p>Bu web sitesini kullanarak aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. Dahi Teknoloji, bu şartları önceden haber vermeksizin değiştirme hakkını saklı tutar.</p>

          <h2>2. Fikri Mülkiyet</h2>
          <p>Bu web sitesindeki tüm içerik, tasarım, logo, grafik, metin ve yazılım Dahi Teknoloji&apos;nun fikri mülkiyetidir. İzinsiz kopyalanması, çoğaltılması veya dağıtılması yasaktır.</p>

          <h2>3. Hizmet Kullanımı</h2>
          <p>Web sitemizi yasal amaçlarla ve bu şartlara uygun olarak kullanmayı kabul edersiniz. Siteyi kötüye kullanma, güvenlik açıklarını istismar etme veya diğer kullanıcılara zarar verme girişimleri kesinlikle yasaktır.</p>

          <h2>4. İletişim Formları</h2>
          <p>İletişim ve teklif formları aracılığıyla gönderdiğiniz bilgiler, yalnızca talebinizi yanıtlamak amacıyla kullanılacaktır. Bilgileriniz üçüncü taraflarla paylaşılmaz.</p>

          <h2>5. Sorumluluk Sınırlaması</h2>
          <p>Dahi Teknoloji, web sitesindeki bilgilerin doğruluğu konusunda azami özeni gösterir ancak bilgilerin eksiksiz veya güncel olduğunu garanti etmez. Web sitesinin kullanımından doğabilecek doğrudan veya dolaylı zararlardan sorumlu tutulamaz.</p>

          <h2>6. Dış Bağlantılar</h2>
          <p>Web sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin içeriklerinden ve gizlilik uygulamalarından Dahi Teknoloji sorumlu değildir.</p>

          <h2>7. Uygulanacak Hukuk</h2>
          <p>Bu kullanım şartları Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda Antalya Mahkemeleri yetkilidir.</p>

          <h2>8. İletişim</h2>
          <p>Kullanım şartlarıyla ilgili sorularınız için <a href="mailto:legal@dahiteknoloji.com">legal@dahiteknoloji.com</a> adresinden bize ulaşabilirsiniz.</p>
        </div>
      </div>
    </article>
  );
}
