import { Content } from "../components/layout/Content";
import { Card } from "../components/ui/Card";
import { NavigationCard } from "../components/shared/NavigationCard";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";

export function Home() {
  return (
    <Content.Root>
      <Content.Sidebar>
        <NavigationCard />
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
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
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
      </Content.Sidebar>
    </Content.Root>
  );
}
