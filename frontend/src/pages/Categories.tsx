import { Content } from "../components/layout/Content";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { SmallTabs } from "../components/ui/SmallTabs";
import { useNavigate, useParams } from "react-router-dom";
import { useResource } from "../hooks/useResource";
import { useCallback, useMemo } from "react";
import { ISelectOption } from "../models/ISelectOption";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { PostList } from "../components/shared/PostList";

export function Categories() {
  const { id } = useParams();
  const categoryId = id ?? "";
  const navigate = useNavigate();
  const { categoriesResource } = useResource();
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
  const postsFilter = useMemo(() => {
    return { categoryId };
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
          <PostList filter={postsFilter} />
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
