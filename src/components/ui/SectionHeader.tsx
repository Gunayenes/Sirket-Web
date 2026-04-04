'use client';

import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  dark?: boolean;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  dark = false,
}: SectionHeaderProps) {
  const alignClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('flex flex-col gap-4 max-w-3xl', alignClass, align === 'center' && 'mx-auto', className)}
    >
      {badge && (
        <Badge variant="gradient" className="self-start">
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
          dark ? 'text-white' : 'text-gray-900',
          titleClassName
        )}
        dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br/>') }}
      />
      {subtitle && (
        <p className={cn('text-lg leading-relaxed', dark ? 'text-gray-300' : 'text-gray-600')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
