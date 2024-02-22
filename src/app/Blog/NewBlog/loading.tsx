import LoadingCard from '@/components/Layout/Loading/LoadingCard/LoadingCard';
import LoadingHeader from '@/components/Layout/Loading/LoadingHeader/LoadingHeader';

export default function Loading() {
  return (
    <main>
      <LoadingHeader title="New Blog" />
      <div className="flex flex-col gap-2">
        <LoadingCard
          cardClassName="w-full h-96"
          cardHeaderSkeletonClassName="h-8"
          numberOfCardHeaderSkeletons={1}
          cardContentSkeletonClassName="h-4"
          numberOfCardContentSkeletons={3}
        />
      </div>
    </main>
  );
}
