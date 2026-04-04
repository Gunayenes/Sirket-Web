import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Github } from 'lucide-react';

interface FooterProps {
  socialLinks: {
    linkedin: string;
    twitter: string;
    instagram: string;
    github: string;
  };
  contactInfo: {
    address: string;
    phone: { display?: string; href?: string };
    email: { display?: string; href?: string };
  };
}

export function Footer({ socialLinks, contactInfo }: FooterProps) {
  const t = useTranslations();

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-display font-bold text-xl text-white">TechCo</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">{t('footer.tagline')}</p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: socialLinks.linkedin },
                { icon: Twitter, href: socialLinks.twitter },
                { icon: Instagram, href: socialLinks.instagram },
                { icon: Github, href: socialLinks.github },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-600 hover:text-white transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t('nav.services')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">{t('nav.services')}</Link></li>
              <li><Link href="/projects" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">{t('nav.projects')}</Link></li>
              <li><Link href="/blog" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">{t('nav.blog')}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">{t('faq.title')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t('nav.contact')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-brand-400 shrink-0" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-400 shrink-0" />
                <a href={contactInfo.phone.href} className="hover:text-white transition-colors">
                  {contactInfo.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brand-400 shrink-0" />
                <a href={contactInfo.email.href} className="hover:text-white transition-colors">
                  {contactInfo.email.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} TechCo. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
