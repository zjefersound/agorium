import { Content } from "../components/layout/Content";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts, rankingCardItems } from "../examples/mocks/mocks";
import { RankingCard } from "../components/shared/RankingCard";
import { Card } from "../components/ui/Card";
import { ProfileCard } from "../containers/profile/ProfileCard";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { Tabs } from "../components/ui/Tabs";
import { useState } from "react";

export function Profile() {
  const [selectedTab, setSelectedTab] = useState("post");

  const handleTabChange = (newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Content.Root>
      <Content.Sidebar>
        <GlobalSidebar />
      </Content.Sidebar>
      <Content.Main>
        <ProfileCard />
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          options={[
            { label: "Posts", value: "posts" },
            { label: "Comments", value: "comments" },
            { label: "Upvotes", value: "upvotes" },
          ]}
          placement="left"
        />
        <Card>User info placeholder</Card>
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
        <RankingCard items={rankingCardItems} />
        <TrendingPosts
          posts={[mockedPosts[0], mockedPosts[1], mockedPosts[2]]}
        />
      </Content.Sidebar>
    </Content.Root>
  );
}
