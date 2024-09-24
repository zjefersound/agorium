import { Content } from "../components/layout/Content";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { HomeContent } from "../containers/HomeContent";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { ConnectedUserCard } from "../components/shared/ConnectedUserCard";
import { useAuth } from "../hooks/useAuth";
import { ConnectedRankingCard } from "../components/shared/ConnectedRankingCard";

export function Home() {
  const { user } = useAuth();
  return (
    <Content.Root>
      <Content.Sidebar>
        <GlobalSidebar />
      </Content.Sidebar>
      <Content.Main>
        <HomeContent />
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
