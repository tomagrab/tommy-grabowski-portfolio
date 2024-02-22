import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type LoadingCardProps = {
  cardClassName?: string;
  cardHeaderSkeletonClassName?: string;
  numberOfCardHeaderSkeletons?: number;
  cardContentSkeletonClassName?: string;
  numberOfCardContentSkeletons?: number;
};

export default function LoadingCard({
  cardClassName,
  cardHeaderSkeletonClassName,
  numberOfCardHeaderSkeletons,
  cardContentSkeletonClassName,
  numberOfCardContentSkeletons,
}: LoadingCardProps) {
  return (
    <Card className={cardClassName}>
      <CardHeader>
        {
          // Create array of card header skeletons
          Array.from({ length: numberOfCardHeaderSkeletons ?? 1 }).map(
            (_, index) => (
              <Skeleton
                key={index}
                className={`${cardHeaderSkeletonClassName}`}
              />
            ),
          )
        }
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {
          // Create array of card content skeletons
          Array.from({ length: numberOfCardContentSkeletons ?? 3 }).map(
            (_, index) => (
              <Skeleton
                key={index}
                className={`${cardContentSkeletonClassName}`}
              />
            ),
          )
        }
      </CardContent>
    </Card>
  );
}
