import { memo, useMemo } from "react";
import { NavigationCard } from "./NavigationCard";
import { PopularItemCard } from "./PopularItemCard";
import { useResource } from "../../hooks/useResource";

const popularTags = [
  { id: 1, label: "#biology", totalPosts: 53 },
  { id: 7, label: "#math", totalPosts: 43 },
  { id: 8, label: "#science", totalPosts: 41 },
  { id: 9, label: "#englsih", totalPosts: 31 },
  { id: 10, label: "#history", totalPosts: 12 },
];

function GlobalSidebar() {
  const { popularCategoriesResource } = useResource();
  const popularCategories = useMemo(
    () =>
      (popularCategoriesResource.data ?? []).map((p) => ({
        id: p.category.id,
        label: p.category.name,
        totalPosts: p.totalPosts,
      })),
    [popularCategoriesResource.data],
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
