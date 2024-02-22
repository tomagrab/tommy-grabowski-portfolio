import '@/app/Projects/loading.scss';
import LoadingCard from '@/components/Layout/Loading/LoadingCard/LoadingCard';
import LoadingHeader from '@/components/Layout/Loading/LoadingHeader/LoadingHeader';

export default function Loading() {
  return (
    <main>
      <LoadingHeader title="Login" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded">
        <LoadingCard
          cardClassName="w-96 h-96 bg-gray-200 rounded-md p-4 flex flex-col justify-between"
          cardHeaderSkeletonClassName="h-6 w-full rounded-md py-4"
          numberOfCardHeaderSkeletons={1}
          cardContentSkeletonClassName="h-4 w-full rounded-md"
          numberOfCardContentSkeletons={3}
        />
      </div>
    </main>
  );
}
