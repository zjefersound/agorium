import { Content } from "../components/layout/Content";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { ProfileCard } from "../containers/profile/ProfileCard";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { Tabs } from "../components/ui/Tabs";
import { useMemo, useState } from "react";
import { PostList } from "../components/shared/PostList";
import { useAuth } from "../hooks/useAuth";
import { ConnectedUserCard } from "../components/shared/ConnectedUserCard";
import { ConnectedRankingCard } from "../components/shared/ConnectedRankingCard";

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
        <ConnectedUserCard id={user!.id} />
        <ConnectedRankingCard />
        <TrendingPosts
          posts={[mockedPosts[0], mockedPosts[1], mockedPosts[2]]}
        />
      </Content.Sidebar>
    </Content.Root>
  );
}
