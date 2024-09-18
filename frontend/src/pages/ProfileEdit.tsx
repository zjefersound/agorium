import { Content } from "../components/layout/Content";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts, rankingCardItems } from "../examples/mocks/mocks";
import { RankingCard } from "../components/shared/RankingCard";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { UserInfoForm } from "../containers/profile/UserInfoForm";
import { Card } from "../components/ui/Card";
import { Heading } from "../components/ui/Heading";
import { GoBack } from "../components/ui/GoBack";
import { UserAvatarForm } from "../containers/profile/UserAvatarForm";

export function ProfileEdit() {
  return (
    <Content.Root>
      <Content.Sidebar>
        <GlobalSidebar />
      </Content.Sidebar>
      <Content.Main>
        <GoBack to="/profile" />
        <Card>
          <Heading size="xs" asChild>
            <h2 className="mb-6">Editing profile</h2>
          </Heading>
          <UserInfoForm />
        </Card>
        <Card>
          <Heading size="xs" asChild>
            <h2 className="mb-6">Editing avatar</h2>
          </Heading>
          <UserAvatarForm />
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
        <RankingCard items={rankingCardItems} />
        <TrendingPosts
          posts={[mockedPosts[0], mockedPosts[1], mockedPosts[2]]}
        />
      </Content.Sidebar>
    </Content.Root>
  );
}
