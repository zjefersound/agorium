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
import { useResource } from "../hooks/useResource";
import { useCallback, useEffect, useMemo } from "react";
import { ISelectOption } from "../models/ISelectOption";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { PostsNotFound } from "../components/shared/fallbacks/PostsNotFound";

export function Categories() {
  const { id } = useParams();
  const categoryId = id ?? "";
  const navigate = useNavigate();
  const { categoriesResource, postsResource } = useResource();
  const [searchParams] = useSearchParams();
  const handleSelectCategory = useCallback(
    (value: string) => navigate("/categories/" + value),
    [navigate],
  );
  const categoriesOptions: ISelectOption[] = useMemo(
    () =>
      categoriesResource.data.map((c) => ({
        label: c.name,
        value: String(c.id),
      })),
    [categoriesResource.data],
  );
  useEffect(() => {
    const filters = categoryId ? { categoryId } : {};
    postsResource.fetchData(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <Content.Root>
      <Content.Sidebar>
        <GlobalSidebar />
      </Content.Sidebar>
      <Content.Main>
        <div className="flex flex-col space-y-6">
          <SmallTabs
            value={categoryId}
            onChange={handleSelectCategory}
            options={categoriesOptions}
          />
          <div className="flex justify-between items-center">
            <span>{postsResource.pagination.total} Posts</span>
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
            <PostsNotFound description="Try another category!" />
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
