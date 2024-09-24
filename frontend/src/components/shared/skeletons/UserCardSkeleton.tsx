import { Card } from "../../ui/Card";
import { Skeleton } from "../../ui/Skeleton";

export function UserCardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </Card>
  );
}
