import { Skeleton } from "../../ui/Skeleton";
import { PostCardSkeleton } from "./PostCardSkeleton";

export function PostCardsSkeleton() {
  return (
    <div className="flex flex-col space-y-6">
      <Skeleton className="h-8 w-[200px]" />
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
}
