import { Content } from "../components/layout/Content";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { PostCard } from "../components/shared/PostCard";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useResource } from "../hooks/useResource";
import { useEffect } from "react";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { PostsNotFound } from "../components/shared/fallbacks/PostsNotFound";

export function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { postsResource } = useResource();
  const term = searchParams.get("text");
  useEffect(() => {
    if (!term) return;
    postsResource.fetchData({ term });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);
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
          <div className="flex justify-between items-center">
            <span>{postsResource.pagination.total} Posts</span>
            <ButtonGroup
              value={searchParams.get("order") ?? "relevance"}
              onChange={(value) =>
                navigate({
                  search: createSearchParams({
                    order: value,
                    text: term ?? "",
                  }).toString(),
                })
              }
              options={[
                { label: "Relevance", value: "relevance" },
                { label: "Newest", value: "newest" },
              ]}
            />
          </div>
          {postsResource.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {!postsResource.loading && !postsResource.data.length && (
            <PostsNotFound description="Try searching something different :)" />
          )}
        </div>
      </Content.Main>
      <Content.Sidebar>
        <TrendingPosts
          posts={[mockedPosts[0], mockedPosts[1], mockedPosts[2]]}
        />
      </Content.Sidebar>
    </Content.Root>
  );
}
