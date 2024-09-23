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
import { Tabs } from "../components/ui/Tabs";
import { useState } from "react";

export function ProfileEdit() {
  const [selectedTab, setSelectedTab] = useState("profile");

  const handleTabChange = (newValue: string) => {
    setSelectedTab(newValue);
  };

  const renderForm = () => {
    switch (selectedTab) {
      case "profile":
        return <UserInfoForm />;
      case "avatar":
        return <UserAvatarForm />;
      case "password":
        return <UserPasswordForm />;
      default:
        return null;
    }
  };

  return (
    <Content.Root>
      <Content.Sidebar>
        <GlobalSidebar />
      </Content.Sidebar>
      <Content.Main>
        <GoBack to="/profile" />
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          options={[
            { label: "Profile", value: "profile" },
            { label: "Avatar", value: "avatar" },
            { label: "Password", value: "password" },
          ]}
          placement="left"
        />
        <Card>
          <Heading size="xs" asChild>
            <h2 className="mb-4">
              {selectedTab === "profile"
                ? "Edit Profile Information"
                : selectedTab === "avatar"
                ? "Change Avatar"
                : "Update Password"}
            </h2>
          </Heading>
          <Text className="mb-6">
            {selectedTab === "profile"
              ? "Update your personal information to keep your profile up-to-date."
              : selectedTab === "avatar"
              ? "Upload a new avatar to personalize your profile appearance."
              : "Secure your account by updating your password regularly."}
          </Text>
          {renderForm()}
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
