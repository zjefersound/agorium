import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { PostsNotFound } from "./fallbacks/PostsNotFound";
import { PostCard } from "./PostCard";
import { PostCardsSkeleton } from "./skeletons/PostCardsSkeleton";
import { Button } from "../ui/Button";
import { useResource } from "../../hooks/useResource";
import { IPostSearchableOptions } from "../../services/postService";
import { ButtonGroup } from "../ui/ButtonGroup";
import { useSearchParams } from "react-router-dom";

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Newest", value: "newest" },
];

function PostList({ filter = {} }: { filter?: IPostSearchableOptions }) {
  const { postsResource } = useResource();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const sortType = searchParams.get("order") ?? "newest";
  const handleSelectSortType = useCallback(
    (value: string) => setSearchParams((prev) => ({ ...prev, order: value })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const params: IPostSearchableOptions = useMemo(() => {
    const returnParams: IPostSearchableOptions = {
      limit: 5,
      page,
      sortBy: "createdAt",
      sortOrder: "desc",
    };
    if (filter.categoryId?.trim()) returnParams.categoryId = filter.categoryId;
    if (filter.tagId?.trim()) returnParams.tagId = filter.tagId;

    return returnParams;
  }, [page, filter.categoryId, filter.tagId]);

  useEffect(() => {
    setPage(1);
  }, [filter.categoryId, filter.tagId]);

  useEffect(() => {
    postsResource.fetchData(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (postsResource.loading && page === 1) return <PostCardsSkeleton />;

  if (!postsResource.loading && !postsResource.data.length)
    return <PostsNotFound description="We couldn't find any posts here!" />;

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <span>{postsResource.pagination.total} Posts</span>
        <ButtonGroup
          value={sortType}
          onChange={handleSelectSortType}
          options={sortOptions}
        />
      </div>
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

const MemoizedPostList = memo(PostList);
export { MemoizedPostList as PostList };
