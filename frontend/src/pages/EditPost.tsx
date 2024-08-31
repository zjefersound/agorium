import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { EditPostProvider } from "../containers/NewOrEditPost/contexts/EditPostContext";
import { EditPostDetailsCard } from "../containers/NewOrEditPost/components/EditPostDetailsCard";
import { EditPostEditor } from "../containers/NewOrEditPost/components/EditPostEditor";

export function EditPost() {
  return (
    <EditPostProvider>
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
          <EditPostEditor />
        </Content.Main>
        <Content.Sidebar>
          <EditPostDetailsCard />
        </Content.Sidebar>
      </Content.Root>
    </EditPostProvider>
  );
}
