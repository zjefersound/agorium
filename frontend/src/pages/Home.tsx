import { Content } from "../components/layout/Content";
import { Card } from "../components/ui/Card";
import { NavigationCard } from "../components/shared/NavigationCard";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";

export function Home() {
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
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
      </Content.Main>
      <Content.Sidebar>
        <SimpleUserCard
          name="Joana Darc"
          rankingPosition={12}
          totalPosts={32}
          totalUpvotes={642123}
          username="@joanadarc"
          url=""
        />
        <TrendingPosts posts={mockedPosts} />
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
      </Content.Sidebar>
    </Content.Root>
  );
}
