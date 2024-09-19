import { Content } from "../components/layout/Content";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { PostCard } from "../components/shared/PostCard";
import { SmallTabs } from "../components/ui/SmallTabs";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { ISelectOption } from "../models/ISelectOption";
import { useCallback, useEffect, useMemo } from "react";
import { useResource } from "../hooks/useResource";
import { PostsNotFound } from "../components/shared/fallbacks/PostsNotFound";

export function Tags() {
  const { id } = useParams();
  const tagId = id ?? "";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { tagsResource, postsResource } = useResource();
  const handleSelectTag = useCallback(
    (value: string) => navigate("/tags/" + value),
    [navigate],
  );
  const tagsOptions: ISelectOption[] = useMemo(
    () =>
      tagsResource.data.map((c) => ({
        label: c.name,
        value: String(c.id),
      })),
    [tagsResource.data],
  );
  useEffect(() => {
    tagsResource.fetchData({ limit: 100000 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filters = tagId ? { tagId } : {};
    postsResource.fetchData(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagId]);

  return (
    <Content.Root>
      <Content.Sidebar>
        <GlobalSidebar />
      </Content.Sidebar>
      <Content.Main>
        <div className="flex flex-col space-y-6">
          <SmallTabs
            value={tagId}
            onChange={handleSelectTag}
            options={tagsOptions}
          />
          <div className="flex justify-between items-center">
            <span>34 Posts</span>
            <ButtonGroup
              value={searchParams.get("order") ?? "relevance"}
              onChange={(value) =>
                navigate({
                  search: createSearchParams({
                    order: value,
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
            <PostsNotFound description="Try another tag!" />
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
