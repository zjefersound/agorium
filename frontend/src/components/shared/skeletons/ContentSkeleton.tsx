import { Content } from "../../layout/Content";
import { Card } from "../../ui/Card";
import { Skeleton } from "../../ui/Skeleton";
import { NavigationCard } from "../NavigationCard";
import { PostCardSkeleton } from "./PostCardSkeleton";

export function ContentSkeleton() {
  return (
    <Content.Root>
      <Content.Sidebar>
        <NavigationCard />
        <Card className="space-y-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[70%]" />
        </Card>
        <Card className="space-y-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[70%]" />
        </Card>
      </Content.Sidebar>
      <Content.Main>
        <Skeleton className="h-8 w-[200px]" />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </Content.Main>
      <Content.Sidebar>
        <Card className="space-y-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[70%]" />
        </Card>
      </Content.Sidebar>
    </Content.Root>
  );
}
