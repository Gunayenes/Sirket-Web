'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

const SERVICE_KEYS = [
  'web-development', 'mobile-apps', 'ui-ux-design',
  'cloud-solutions', 'seo-marketing', 'consulting',
];

type FormData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  deadline?: string;
  services: string[];
  description: string;
};

export function QuoteForm() {
  const t = useTranslations('contact.quote');
  const tv = useTranslations('contact.validation');
  const [success, setSuccess] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Service labels from the services section translations
  const serviceLabels: Record<string, string> = {
    'web-development': 'Web Development',
    'mobile-apps': 'Mobile Apps',
    'ui-ux-design': 'UI/UX Design',
    'cloud-solutions': 'Cloud Solutions',
    'seo-marketing': 'SEO & Marketing',
    'consulting': 'Consulting',
  };

  const schema = useMemo(() => z.object({
    name:        z.string().min(2, tv('nameRequired')),
    email:       z.string().email(tv('emailInvalid')),
    phone:       z.string().optional(),
    company:     z.string().optional(),
    budget:      z.string().optional(),
    deadline:    z.string().optional(),
    services:    z.array(z.string()).min(1, tv('servicesRequired')),
    description: z.string().min(20, tv('descriptionRequired')),
    website:     z.string().optional(), // honeypot — server rejects non-empty values
  }), [tv]);

  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [] },
  });

  const toggleService = (service: string) => {
    const next = selectedServices.includes(service)
      ? selectedServices.filter(s => s !== service)
      : [...selectedServices, service];
    setSelectedServices(next);
    setValue('services', next);
  };

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) { setSuccess(true); reset(); setSelectedServices([]); }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{t('success')}</h3>
        <Button variant="ghost" onClick={() => setSuccess(false)}>{t('sendAnother')}</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot — hidden from humans, bots fill it and get rejected */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Website (leave blank)
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website' as never)} />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label={t('name')} placeholder={t('namePlaceholder')} error={errors.name?.message} {...register('name')} />
        <Input label={t('email')} type="email" placeholder={t('emailPlaceholder')} error={errors.email?.message} {...register('email')} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label={t('phone')} type="tel" {...register('phone')} />
        <Input label={t('company')} placeholder={t('companyPlaceholder')} {...register('company')} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label={t('budget')} placeholder={t('budgetPlaceholder')} {...register('budget')} />
        <Input label={t('deadline')} type="date" {...register('deadline')} />
      </div>

      {/* Services checkboxes */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{t('services')} *</label>
        <div className="flex flex-wrap gap-2">
          {SERVICE_KEYS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleService(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                selectedServices.includes(s)
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-brand-400'
              }`}
            >
              {serviceLabels[s] || s}
            </button>
          ))}
        </div>
        {errors.services && <p className="text-xs text-red-600">{errors.services.message}</p>}
      </div>

      <Textarea
        label={`${t('description')} *`}
        placeholder={t('descriptionPlaceholder')}
        error={errors.description?.message}
        {...register('description')}
        className="min-h-[140px]"
      />

      <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
        {t('send')}
      </Button>
    </form>
  );
}
