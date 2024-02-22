import LoadingCard from '@/components/Layout/Loading/LoadingCard/LoadingCard';
import LoadingHeader from '@/components/Layout/Loading/LoadingHeader/LoadingHeader';

export default function Loadiong() {
  return (
    <main>
      <LoadingHeader title="Blog" />
      <div className="flex flex-col gap-2">
        <LoadingCard
          cardClassName="w-full h-full"
          cardHeaderSkeletonClassName="h-8"
          numberOfCardHeaderSkeletons={1}
          cardContentSkeletonClassName="h-4"
          numberOfCardContentSkeletons={8}
        />
      </div>
    </main>
  );
}
