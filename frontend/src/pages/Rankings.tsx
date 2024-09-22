import { Content } from "../components/layout/Content";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { Card } from "../components/ui/Card";
import { GoBack } from "../components/ui/GoBack";
import { Heading } from "../components/ui/Heading";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { Podium } from "../components/shared/Podium";
import { rankingData } from "../examples/mocks/mocks";
import { PodiumList } from "../components/shared/PodiumList";
import { Tabs } from "../components/ui/Tabs";
import { useState } from "react";

export function Rankings() {
  const [selectedTab, setSelectedTab] = useState("month");

  const handleTabChange = (newValue: string) => {
    setSelectedTab(newValue);
  };

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
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          options={[
            { label: "Month", value: "month" },
            { label: "Year", value: "year" },
            { label: "All time", value: "all time" },
          ]}
        />
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
