import { Content } from "../components/layout/Content";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts, rankingCardItems } from "../examples/mocks/mocks";
import { RankingCard } from "../components/shared/RankingCard";
import { ProfileCard } from "../containers/profile/ProfileCard";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { Tabs } from "../components/ui/Tabs";
import { useMemo, useState } from "react";
import { PostList } from "../components/shared/PostList";
import { useAuth } from "../hooks/useAuth";

export function Profile() {
  const [selectedTab, setSelectedTab] = useState("post");
  const { user } = useAuth();

  const handleTabChange = (newValue: string) => {
    setSelectedTab(newValue);
  };

  const postsFilter = useMemo(() => {
    return { userId: String(user!.id) };
  }, [user]);

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
        <PostList filter={postsFilter} />
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
