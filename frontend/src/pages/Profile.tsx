import { Content } from "../components/layout/Content";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { ProfileCard } from "../containers/profile/ProfileCard";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { useMemo } from "react";
import { PostList } from "../components/shared/PostList";
import { useAuth } from "../hooks/useAuth";
import { ConnectedUserCard } from "../components/shared/ConnectedUserCard";
import { ConnectedRankingCard } from "../components/shared/ConnectedRankingCard";

export function Profile() {
  const { user } = useAuth();

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
        <PostList filter={postsFilter} />
      </Content.Main>
      <Content.Sidebar>
        <ConnectedUserCard id={user!.id} />
        <ConnectedRankingCard />
        <TrendingPosts />
      </Content.Sidebar>
    </Content.Root>
  );
}
