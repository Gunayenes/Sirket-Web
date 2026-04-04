import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('common');
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <span className="text-[180px] font-display font-black text-gray-100 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-brand-50 flex items-center justify-center">
              <Search className="h-10 w-10 text-brand-400" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">{t('notFound')}</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          {t('notFoundDesc')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href="/">
              <Home className="h-4 w-4" /> {t('backHome')}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">
              <ArrowLeft className="h-4 w-4" /> {t('contactUs')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
