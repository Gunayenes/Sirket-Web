import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-lg bg-gray-200', className)} />
  );
}

export function HeroSkeleton() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-brand-50 to-accent-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto max-w-full" />
      </div>
    </section>
  );
}

export function CardGridSkeleton({ count = 6, aspect = 'aspect-[16/9]' }: { count?: number; aspect?: string }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <Skeleton className={`${aspect} rounded-2xl mb-4`} />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
