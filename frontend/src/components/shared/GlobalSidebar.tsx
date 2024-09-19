import { memo, useMemo } from "react";
import { NavigationCard } from "./NavigationCard";
import { PopularItemCard } from "./PopularItemCard";
import { useResource } from "../../hooks/useResource";

function GlobalSidebar() {
  const { popularCategoriesResource, popularTagsResource } = useResource();
  const popularCategories = useMemo(
    () =>
      (popularCategoriesResource.data ?? []).map((p) => ({
        id: p.category.id,
        label: p.category.name,
        totalPosts: p.totalPosts,
      })),
    [popularCategoriesResource.data],
  );
  const popularTags = useMemo(
    () =>
      (popularTagsResource.data ?? []).map((p) => ({
        id: p.tag.id,
        label: p.tag.name,
        totalPosts: p.totalPosts,
      })),
    [popularTagsResource.data],
  );
  return (
    <>
      <NavigationCard />
      <PopularItemCard title="Popular tags" path="/tags" items={popularTags} />
      <PopularItemCard
        title="Popular categories"
        path="/categories"
        items={popularCategories}
      />
    </>
  );
}
const MemoizedGlobalSidebar = memo(GlobalSidebar);
export { MemoizedGlobalSidebar as GlobalSidebar };
