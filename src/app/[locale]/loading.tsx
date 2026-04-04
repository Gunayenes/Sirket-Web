import { HeroSkeleton, CardGridSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <>
      <HeroSkeleton />
      <section className="py-16 bg-gradient-to-r from-brand-600 to-accent-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="text-center animate-pulse">
                <div className="h-12 w-20 bg-white/20 rounded-lg mx-auto mb-2" />
                <div className="h-4 w-24 bg-white/10 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CardGridSkeleton count={6} />
    </>
  );
}
