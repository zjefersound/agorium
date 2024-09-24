import { Content } from "../components/layout/Content";
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
import { ConnectedUserCard } from "../components/shared/ConnectedUserCard";
import { useAuth } from "../hooks/useAuth";

export function ProfileEdit() {
  const { user } = useAuth();
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

  const renderFormTitle = () => {
    switch (selectedTab) {
      case "profile":
        return "Edit Profile Information";
      case "avatar":
        return "Change Avatar";
      case "password":
        return "Update Password";
      default:
        return null;
    }
  };

  const renderFormDescripition = () => {
    switch (selectedTab) {
      case "profile":
        return "Update your personal information to keep your profile up-to-date.";
      case "avatar":
        return "Upload a new avatar to personalize your profile appearance.";
      case "password":
        return "Secure your account by updating your password regularly.";
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
            <h2 className="mb-4">{renderFormTitle()}</h2>
          </Heading>
          <Text className="mb-6">{renderFormDescripition()}</Text>
          {renderForm()}
        </Card>
      </Content.Main>
      <Content.Sidebar>
        <ConnectedUserCard id={user!.id} />
      </Content.Sidebar>
    </Content.Root>
  );
}
