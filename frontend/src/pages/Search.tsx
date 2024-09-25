import { Content } from "../components/layout/Content";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { PostList } from "../components/shared/PostList";

export function Search() {
  const [searchParams] = useSearchParams();
  const term = searchParams.get("text");
  const filter = useMemo(() => (term?.trim() ? { term } : {}), [term]);
  return (
    <Content.Root>
      <Content.Sidebar>
        <GlobalSidebar />
      </Content.Sidebar>
      <Content.Main>
        <div className="flex flex-col space-y-6">
          {term && (
            <div>
              Showing results for "<strong>{term}</strong>"
            </div>
          )}
          <PostList filter={filter} />
        </div>
      </Content.Main>
      <Content.Sidebar>
        <TrendingPosts />
      </Content.Sidebar>
    </Content.Root>
  );
}
