import { HeroSkeleton, Skeleton } from '@/components/ui/Skeleton';

export default function AboutLoading() {
  return (
    <>
      <HeroSkeleton />
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-pulse">
            <div>
              <Skeleton className="h-6 w-32 mb-6 rounded-full" />
              <Skeleton className="h-9 w-64 mb-6" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="aspect-[4/3] rounded-3xl" />
          </div>
        </div>
      </section>
    </>
  );
}
