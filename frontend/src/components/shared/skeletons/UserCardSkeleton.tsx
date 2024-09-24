import { Card } from "../../ui/Card";
import { Skeleton } from "../../ui/Skeleton";

export function UserCardSkeleton() {
  return (
    <Card className="flex flex-col space-y-4 items-center">
      <Skeleton className="aspect-square w-[200px] rounded-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </Card>
  );
}
