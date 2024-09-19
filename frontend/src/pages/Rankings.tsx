import { Content } from "../components/layout/Content";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { Card } from "../components/ui/Card";
import { GoBack } from "../components/ui/GoBack";
import { Heading } from "../components/ui/Heading";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { Podium } from "../components/shared/Podium";
import { rankingData } from "../examples/mocks/mocks";
import { PodiumList } from "../components/shared/PodiumList";

export function Rankings() {
  return (
    <Content.Root>
      <Content.Sidebar>
        <GlobalSidebar />
      </Content.Sidebar>
      <Content.Main>
        <div className="flex items-center">
          <GoBack to={"/"} hideText />
          <Heading size="lg" asChild>
            <h2 className="text-amber-100 ml-3">{"Rankings"}</h2>
          </Heading>
        </div>
        <Card className="flex flex-col items-center">
          <Podium items={rankingData} />
          <PodiumList items={rankingData} />
        </Card>
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
      </Content.Sidebar>
    </Content.Root>
  );
}
