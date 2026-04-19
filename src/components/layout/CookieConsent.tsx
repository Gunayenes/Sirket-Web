'use client';

import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function CookieConsent() {
  const t = useTranslations('cookie');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 animate-fade-up">
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {t('message')}{' '}
              <Link href="/privacy" className="text-brand-600 hover:underline font-medium">
                {t('learnMore')}
              </Link>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors"
              >
                {t('accept')}
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {t('decline')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
