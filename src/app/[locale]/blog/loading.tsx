import { HeroSkeleton, Skeleton } from '@/components/ui/Skeleton';

export default function BlogLoading() {
  return (
    <>
      <HeroSkeleton />
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              {/* Featured post skeleton */}
              <div className="animate-pulse mb-12">
                <Skeleton className="aspect-[2/1] rounded-3xl mb-6" />
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-7 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              {/* Grid skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="animate-pulse">
                    <Skeleton className="aspect-[16/9] rounded-2xl mb-4" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
            <aside className="lg:w-72 shrink-0">
              <Skeleton className="h-48 rounded-2xl" />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
