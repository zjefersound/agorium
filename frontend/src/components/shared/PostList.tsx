import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { PostsNotFound } from "./fallbacks/PostsNotFound";
import { PostCard } from "./PostCard";
import { PostCardsSkeleton } from "./skeletons/PostCardsSkeleton";
import { Button } from "../ui/Button";
import { useResource } from "../../hooks/useResource";
import { IPostSearchableOptions } from "../../services/postService";
import { ButtonGroup } from "../ui/ButtonGroup";
import { useSearchParams } from "react-router-dom";
import { DEFAULT_POST_SORT_OPTIONS } from "../../constants/post";
import { GrAscend, GrDescend } from "react-icons/gr";

interface PostListProps {
  hideDefaultFilters?: boolean;
  filter?: IPostSearchableOptions;
}

function PostList({ filter = {}, hideDefaultFilters }: PostListProps) {
  const { postsResource } = useResource();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const sortType = searchParams.get("sortBy") ?? "createdAt";
  const sortOrder = searchParams.get("sortOrder") ?? "desc";
  const handleSelectSortType = useCallback(
    (sortBy: string) => {
      const currentParams = Object.fromEntries(searchParams.entries());
      setSearchParams({ ...currentParams, sortBy });
    },
    [searchParams, setSearchParams],
  );

  const toggleSortOrder = useCallback(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";

    setSearchParams({
      ...currentParams,
      sortOrder: newSortOrder,
    });
  }, [searchParams, setSearchParams, sortOrder]);

  const params: IPostSearchableOptions = useMemo(() => {
    const returnParams: IPostSearchableOptions = {
      limit: 5,
      page,
      sortBy: "createdAt",
      sortOrder: "desc",
    };
    if (sortOrder === "asc" || sortOrder === "desc")
      returnParams.sortOrder = sortOrder;
    if (sortType) returnParams.sortBy = sortType;
    if (filter.categoryId?.trim()) returnParams.categoryId = filter.categoryId;
    if (filter.tagId?.trim()) returnParams.tagId = filter.tagId;
    if (filter.term?.trim()) returnParams.term = filter.term;
    if (filter.sortBy) returnParams.sortBy = filter.sortBy;
    if (filter.sortOrder) returnParams.sortBy = filter.sortOrder;

    return returnParams;
  }, [
    page,
    filter.categoryId,
    filter.tagId,
    filter.term,
    filter.sortBy,
    filter.sortOrder,
    sortType,
    sortOrder,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    filter.categoryId,
    filter.tagId,
    filter.term,
    filter.sortBy,
    filter.sortOrder,
    sortType,
    sortOrder,
  ]);

  useEffect(() => {
    postsResource.fetchData(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (postsResource.loading && page === 1) return <PostCardsSkeleton />;

  if (!postsResource.loading && !postsResource.data.length)
    return <PostsNotFound description="We couldn't find any posts here!" />;

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-end items-center gap-3">
        <span className="mr-auto">{postsResource.pagination.total} Posts</span>
        {!hideDefaultFilters && (
          <ButtonGroup
            value={sortType}
            onChange={handleSelectSortType}
            options={DEFAULT_POST_SORT_OPTIONS}
          />
        )}
        <button
          title={sortOrder === "asc" ? "Ascending" : "Descending"}
          onClick={toggleSortOrder}
          className="hover:bg-agorium-700 p-2 rounded-md text-agorium-400"
        >
          {sortOrder === "asc" ? (
            <GrAscend className="size-6" />
          ) : (
            <GrDescend className="size-6" />
          )}
        </button>
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
