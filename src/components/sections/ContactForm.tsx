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

const SERVICES = [
  { key: 'web-ecommerce', label: 'Kurumsal Web & E-Ticaret' },
  { key: 'mobile-apps', label: 'Mobil Uygulama' },
  { key: 'custom-software', label: 'Özel Yazılım' },
  { key: 'crm-erp', label: 'CRM / ERP' },
  { key: 'ai-automation', label: 'Yapay Zeka & Otomasyon' },
  { key: 'api-backend', label: 'API & Backend' },
  { key: 'data-analytics', label: 'Veri Analizi' },
  { key: 'support', label: 'Teknik Destek & Bakım' },
];

type FormData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  services: string[];
  message: string;
};

export function ContactForm() {
  const t = useTranslations('contact.form');
  const tv = useTranslations('contact.validation');
  const [success, setSuccess] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const schema = useMemo(() => z.object({
    name:     z.string().min(2, tv('nameRequired')),
    email:    z.string().email(tv('emailInvalid')),
    phone:    z.string().optional(),
    company:  z.string().optional(),
    budget:   z.string().optional(),
    services: z.array(z.string()),
    message:  z.string().min(10, tv('messageRequired')),
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
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        reset();
        setSelectedServices([]);
      }
    } catch {
      // handled by UI
    }
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
      {/* Kişi Bilgileri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label={t('name')}
          placeholder={t('namePlaceholder')}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label={t('email')}
          type="email"
          placeholder={t('emailPlaceholder')}
          error={errors.email?.message}
          {...register('email')}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label={t('phone')}
          type="tel"
          placeholder={t('phonePlaceholder')}
          {...register('phone')}
        />
        <Input
          label={t('company')}
          placeholder={t('companyPlaceholder')}
          {...register('company')}
        />
      </div>

      {/* Hizmet Seçimi */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{t('services')}</label>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleService(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                selectedServices.includes(key)
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300 hover:text-brand-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Bütçe */}
      <Input
        label={t('budget')}
        placeholder={t('budgetPlaceholder')}
        {...register('budget')}
      />

      {/* Mesaj */}
      <Textarea
        label={t('message')}
        placeholder={t('messagePlaceholder')}
        error={errors.message?.message}
        {...register('message')}
        className="min-h-[140px]"
      />

      <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
        {isSubmitting ? t('sending') : t('send')}
      </Button>
    </form>
  );
}
