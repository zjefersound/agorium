import { Content } from "../components/layout/Content";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { SmallTabs } from "../components/ui/SmallTabs";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { ISelectOption } from "../models/ISelectOption";
import { useCallback, useEffect, useMemo } from "react";
import { useResource } from "../hooks/useResource";
import { PostList } from "../components/shared/PostList";

export function Tags() {
  const { id } = useParams();
  const tagId = id ?? "";
  const navigate = useNavigate();
  const { tagsResource } = useResource();
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

  const postsFilter = useMemo(() => {
    return { tagId };
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
