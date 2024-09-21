import { SmallTabs } from "../components/ui/SmallTabs";
import { PostList } from "../components/shared/PostList";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { HOME_POST_SORT_OPTIONS } from "../constants/post";

export function HomeContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOrder = searchParams.get("sortBy") || "createdAt";
  const handleSelectOrder = useCallback(
    (sortBy: string) => {
      setSearchParams({ sortBy });
    },
    [setSearchParams],
  );
  return (
    <div className="flex flex-col space-y-6">
      <SmallTabs
        value={selectedOrder}
        onChange={handleSelectOrder}
        options={HOME_POST_SORT_OPTIONS}
      />
      <PostList hideDefaultFilters />
    </div>
  );
}
