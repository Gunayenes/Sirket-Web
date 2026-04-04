import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'TechCo gizlilik politikası ve kişisel verilerin korunması.',
};

export default function PrivacyPage() {
  return (
    <article className="pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
          Gizlilik Politikası
        </h1>
        <p className="text-sm text-gray-400 mb-10">Son güncelleme: 29 Mart 2026</p>

        <div className="prose prose-gray max-w-none prose-headings:font-display prose-headings:font-bold">
          <h2>1. Kişisel Verilerin Korunması</h2>
          <p>TechCo olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kişisel verilerinizin güvenliğini önemsiyoruz. Bu politika, kişisel verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu açıklamaktadır.</p>

          <h2>2. Toplanan Veriler</h2>
          <p>Web sitemizi ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda aşağıdaki verileri toplayabiliriz:</p>
          <ul>
            <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, e-posta adresi, telefon numarası</li>
            <li><strong>İletişim Bilgileri:</strong> İletişim formu ve teklif formu aracılığıyla gönderilen bilgiler</li>
            <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri, çerez verileri</li>
            <li><strong>Kullanım Verileri:</strong> Sayfa görüntüleme, tıklama verileri, ziyaret süresi</li>
          </ul>

          <h2>3. Verilerin İşlenme Amaçları</h2>
          <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
          <ul>
            <li>Hizmet taleplerinizin karşılanması ve iletişim</li>
            <li>Teklif hazırlanması ve proje yönetimi</li>
            <li>Web sitesi performansının iyileştirilmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          </ul>

          <h2>4. Çerezler (Cookies)</h2>
          <p>Web sitemizde deneyiminizi geliştirmek için çerezler kullanıyoruz. Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz. Zorunlu çerezler sitenin düzgün çalışması için gereklidir.</p>

          <h2>5. Veri Güvenliği</h2>
          <p>Kişisel verileriniz, endüstri standardı güvenlik önlemleriyle korunmaktadır. SSL/TLS şifreleme, güvenli sunucu altyapısı ve erişim kontrol mekanizmaları uygulanmaktadır.</p>

          <h2>6. Haklarınız</h2>
          <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Eksik veya yanlış işlenen verilerinizin düzeltilmesini isteme</li>
            <li>Verilerinizin silinmesini veya yok edilmesini isteme</li>
          </ul>

          <h2>7. İletişim</h2>
          <p>Gizlilik politikamızla ilgili sorularınız için <a href="mailto:privacy@techco.com">privacy@techco.com</a> adresinden bize ulaşabilirsiniz.</p>
        </div>
      </div>
    </article>
  );
}
