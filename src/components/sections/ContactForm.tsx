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

type FormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const t = useTranslations('contact.form');
  const tv = useTranslations('contact.validation');
  const [success, setSuccess] = useState(false);

  const schema = useMemo(() => z.object({
    name:    z.string().min(2, tv('nameRequired')),
    email:   z.string().email(tv('emailInvalid')),
    phone:   z.string().optional(),
    subject: z.string().min(3, tv('subjectRequired')),
    message: z.string().min(10, tv('messageRequired')),
  }), [tv]);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
      }
    } catch {
      // Error handled below
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
          label={t('subject')}
          placeholder={t('subjectPlaceholder')}
          error={errors.subject?.message}
          {...register('subject')}
        />
      </div>
      <Textarea
        label={t('message')}
        placeholder={t('messagePlaceholder')}
        error={errors.message?.message}
        {...register('message')}
        className="min-h-[160px]"
      />
      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? t('sending') : t('send')}
      </Button>
    </form>
  );
}
