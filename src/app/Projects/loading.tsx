import '@/app/Projects/loading.scss';
import LoadingCard from '@/components/Layout/Loading/LoadingCard/LoadingCard';
import LoadingHeader from '@/components/Layout/Loading/LoadingHeader/LoadingHeader';

export default function Loading() {
  return (
    <main>
      <LoadingHeader title="Projects" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {/* Create array of 9 loading cards */}
        {Array.from({ length: 9 }).map((_, index) => (
          <LoadingCard
            key={index}
            cardHeaderSkeletonClassName="h-6 w-full rounded-md py-4"
            numberOfCardHeaderSkeletons={1}
            cardContentSkeletonClassName="h-4 w-full rounded-md"
            numberOfCardContentSkeletons={3}
          />
        ))}
      </div>
    </main>
  );
}
