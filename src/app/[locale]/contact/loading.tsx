import { HeroSkeleton, Skeleton } from '@/components/ui/Skeleton';

export default function ContactLoading() {
  return (
    <>
      <HeroSkeleton />
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-pulse">
            <div className="space-y-6">
              <Skeleton className="h-8 w-32" />
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-16 mb-2" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                </div>
              ))}
              <Skeleton className="aspect-[4/3] rounded-2xl mt-8" />
            </div>
            <div className="lg:col-span-2 space-y-12">
              <Skeleton className="h-[400px] rounded-2xl" />
              <Skeleton className="h-[500px] rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
