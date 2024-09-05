import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
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
import { Empty } from "../components/ui/Empty";
import { Text } from "../components/ui/Text";

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
        <NavigationCard />
        <PopularItemCard
          title="Popular tags"
          path="/tags"
          items={[
            { id: 1, label: "#biology", totalPosts: 53 },
            { id: 7, label: "#math", totalPosts: 43 },
            { id: 8, label: "#science", totalPosts: 41 },
            { id: 9, label: "#englsih", totalPosts: 31 },
            { id: 10, label: "#history", totalPosts: 12 },
          ]}
        />
        <PopularItemCard
          title="Popular categories"
          path="/categories"
          items={[
            { id: 2, label: "Issue", totalPosts: 286 },
            { id: 3, label: "Discussion", totalPosts: 233 },
            { id: 4, label: "Feedback", totalPosts: 211 },
            { id: 5, label: "Debate", totalPosts: 173 },
            { id: 6, label: "Tutorials", totalPosts: 163 },
          ]}
        />
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
            <Empty>
              <p className="to-amber-100 font-bold mb-3 text-center">
                No posts were found
              </p>
              <Text asChild>
                <span className="text-center">
                  Try searching something different :)
                </span>
              </Text>
            </Empty>
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
