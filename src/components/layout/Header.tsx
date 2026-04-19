'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icons';

interface ServiceLink {
  slug: string;
  title: string;
  icon: string;
}

const NAV_ITEMS = [
  { key: 'home',     href: '/'         as const },
  { key: 'services', href: '/services' as const, hasDropdown: true },
  { key: 'about',    href: '/about'    as const },
  { key: 'projects', href: '/projects' as const },
  { key: 'contact',  href: '/contact'  as const },
] as const;

export function Header({ services = [] }: { services?: ServiceLink[] }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); setOpenDropdown(null); }, [pathname]);

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white',
        scrolled ? 'shadow-md border-b border-gray-100' : 'shadow-sm'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Dahi Teknoloji" width={300} height={110} className="h-16 w-auto" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);

              if ('hasDropdown' in item && item.hasDropdown && services.length > 0) {
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.key)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 inline-flex items-center gap-1',
                        active
                          ? 'text-purple-600 bg-purple-50'
                          : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                      )}
                    >
                      {t(item.key as keyof ReturnType<typeof useTranslations<'nav'>>)}
                      <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', openDropdown === item.key && 'rotate-180')} />
                    </Link>

                    {/* Dropdown */}
                    {openDropdown === item.key && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 animate-fade-in"
                        onMouseEnter={() => handleDropdownEnter(item.key)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {services.map((svc) => {
                            const SvcIcon = getIcon(svc.icon);
                            return (
                              <Link
                                key={svc.slug}
                                href={`/services/${svc.slug}` as never}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
                              >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-fuchsia-100 flex items-center justify-center group-hover:from-purple-600 group-hover:to-fuchsia-600 transition-colors shrink-0">
                                  <SvcIcon className="h-5 w-5 text-purple-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                                    {svc.title}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Link
                            href="/services"
                            className="text-sm text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-1"
                          >
                            Tüm Hizmetleri Gör →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    active
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  )}
                >
                  {t(item.key as keyof ReturnType<typeof useTranslations<'nav'>>)}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild size="md">
              <Link href="/contact">{t('getQuote')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                  pathname === item.href
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {t(item.key as keyof ReturnType<typeof useTranslations<'nav'>>)}
              </Link>
            ))}

            {/* Mobile services list */}
            {services.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Hizmetlerimiz
                </div>
                {services.map((svc) => {
                  const SvcIcon = getIcon(svc.icon);
                  return (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}` as never}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-purple-50"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                        <SvcIcon className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-700">{svc.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="pt-3 border-t border-gray-100 mt-2">
              <Button asChild size="md" className="w-full">
                <Link href="/contact">{t('getQuote')}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
