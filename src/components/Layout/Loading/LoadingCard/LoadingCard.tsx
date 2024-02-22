import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton
          className="h-6 w-full rounded-md  py-4
        "
        />
        <Skeleton className="h-4 w-1/2 rounded-md " />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="mb-2 h-4 w-3/4 rounded-md" />
        <Skeleton className="mb-2 h-4 w-1/2 rounded-md" />
        <Skeleton className="mb-2 h-4 w-1/2 rounded-md" />
      </CardContent>
    </Card>
  );
}
