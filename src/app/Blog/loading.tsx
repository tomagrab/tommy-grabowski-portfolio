import LoadingCard from '@/components/Layout/Loading/LoadingCard/LoadingCard';
import LoadingHeader from '@/components/Layout/Loading/LoadingHeader/LoadingHeader';

export default function Loading() {
  return (
    <main>
      <LoadingHeader title="Blog" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <LoadingCard
            key={index}
            cardClassName="w-full"
            cardHeaderSkeletonClassName="h-8"
            numberOfCardHeaderSkeletons={1}
            cardContentSkeletonClassName="h-4"
            numberOfCardContentSkeletons={3}
          />
        ))}
      </div>
    </main>
  );
}
