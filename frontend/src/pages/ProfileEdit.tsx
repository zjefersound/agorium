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
import { UserPasswordForm } from "../containers/profile/UserPasswordForm";
import { Text } from "../components/ui/Text";

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
            <h2 className="mb-4">Edit Profile Information</h2>
          </Heading>
          <Text className="mb-6">
            Update your personal information to keep your profile up-to-date.
          </Text>
          <UserInfoForm />
        </Card>

        <Card>
          <Heading size="xs" asChild>
            <h2 className="mb-4">Change Avatar</h2>
          </Heading>
          <Text className="mb-6">
            Upload a new avatar to personalize your profile appearance.
          </Text>
          <UserAvatarForm />
        </Card>

        <Card>
          <Heading size="xs" asChild>
            <h2 className="mb-4">Update Password</h2>
          </Heading>
          <Text className="mb-6">
            Secure your account by updating your password regularly.
          </Text>
          <UserPasswordForm />
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
