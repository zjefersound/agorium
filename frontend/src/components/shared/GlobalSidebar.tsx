import { memo } from "react";
import { NavigationCard } from "./NavigationCard";
import { PopularItemCard } from "./PopularItemCard";

const popularTags = [
  { id: 1, label: "#biology", totalPosts: 53 },
  { id: 7, label: "#math", totalPosts: 43 },
  { id: 8, label: "#science", totalPosts: 41 },
  { id: 9, label: "#englsih", totalPosts: 31 },
  { id: 10, label: "#history", totalPosts: 12 },
];

const popularCategories = [
  { id: 2, label: "Issue", totalPosts: 286 },
  { id: 3, label: "Discussion", totalPosts: 233 },
  { id: 4, label: "Feedback", totalPosts: 211 },
  { id: 5, label: "Debate", totalPosts: 173 },
  { id: 6, label: "Tutorials", totalPosts: 163 },
];

function GlobalSidebar() {
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
