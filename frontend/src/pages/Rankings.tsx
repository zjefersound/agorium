import { Content } from "../components/layout/Content";
import { Card } from "../components/ui/Card";
import { GoBack } from "../components/ui/GoBack";
import { Heading } from "../components/ui/Heading";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { Podium } from "../components/shared/Podium";
import { rankingData } from "../examples/mocks/mocks";
import { PodiumList } from "../components/shared/PodiumList";
import { Tabs } from "../components/ui/Tabs";
import { useState } from "react";
import { ConnectedUserCard } from "../components/shared/ConnectedUserCard";
import { useAuth } from "../hooks/useAuth";

export function Rankings() {
  const { user } = useAuth();
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
        <ConnectedUserCard id={user!.id} />
      </Content.Sidebar>
    </Content.Root>
  );
}
