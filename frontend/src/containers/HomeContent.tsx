import { PostCard } from "../components/shared/PostCard";
import { MdOutlineCheckCircleOutline, MdOutlineWhatshot } from "react-icons/md";
import { RxArrowTopRight, RxClock } from "react-icons/rx";
import { SmallTabs } from "../components/ui/SmallTabs";
import { useResource } from "../hooks/useResource";
import { useEffect, useState } from "react";
import { Empty } from "../components/ui/Empty";
import { Text } from "../components/ui/Text";
import { Skeleton } from "../components/ui/Skeleton";
import { PostCardSkeleton } from "../components/shared/skeletons/PostCardSkeleton";
import { Button } from "../components/ui/Button";

export function HomeContent() {
  const { postsResource } = useResource();
  const [page, setPage] = useState(1);
  useEffect(() => {
    postsResource.fetchData({
      limit: 5,
      page,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (postsResource.loading && page === 1) {
    return (
      <div className="flex flex-col space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    );
  }
  if (!postsResource.loading && !postsResource.data.length)
    return (
      <Empty>
        <p className="to-amber-100 font-bold mb-3 text-center">
          No posts were found
        </p>
        <Text asChild>
          <span className="text-center">Start by creating yours!</span>
        </Text>
      </Empty>
    );

  return (
    <div className="flex flex-col space-y-6">
      <SmallTabs
        value="new"
        onChange={() => {}}
        options={[
          { Icon: RxClock, label: "New", value: "new" },
          { Icon: RxArrowTopRight, label: "Top", value: "top" },
          { Icon: MdOutlineWhatshot, label: "Hot", value: "hot" },
          {
            Icon: MdOutlineCheckCircleOutline,
            label: "Closed",
            value: "closed",
          },
        ]}
      />
      {postsResource.data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {page < postsResource.pagination.totalPages && (
        <Button
          onClick={() => setPage((p) => p + 1)}
          className="m-auto"
          color="secondary"
        >
          Load more
        </Button>
      )}
    </div>
  );
}
