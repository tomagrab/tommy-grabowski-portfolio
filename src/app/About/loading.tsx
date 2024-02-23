import LoadingCard from '@/components/Layout/Loading/LoadingCard/LoadingCard';
import LoadingHeader from '@/components/Layout/Loading/LoadingHeader/LoadingHeader';

export default function Loading() {
  return (
    <main>
      <LoadingHeader title="About" />
      <div className="flex flex-col gap-4">
        <LoadingCard
          cardClassName="w-full h-96 bg-gray-200 rounded-md p-4 flex flex-col justify-between"
          cardHeaderSkeletonClassName="h-6 w-full rounded-md py-4"
          numberOfCardHeaderSkeletons={1}
          cardContentSkeletonClassName="h-4 w-full rounded-md"
          numberOfCardContentSkeletons={3}
        />
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <LoadingCard
            cardClassName="w-full h-96 bg-gray-200 rounded-md p-4 flex flex-col justify-between"
            cardHeaderSkeletonClassName="h-6 w-full rounded-md py-4"
            numberOfCardHeaderSkeletons={1}
            cardContentSkeletonClassName="h-4 w-full rounded-md"
            numberOfCardContentSkeletons={3}
          />
          <LoadingCard
            cardClassName="w-full h-96 bg-gray-200 rounded-md p-4 flex flex-col justify-between"
            cardHeaderSkeletonClassName="h-6 w-full rounded-md py-4"
            numberOfCardHeaderSkeletons={1}
            cardContentSkeletonClassName="h-4 w-full rounded-md"
            numberOfCardContentSkeletons={3}
          />
        </div>
      </div>
    </main>
  );
}
