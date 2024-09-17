import { Content } from "../components/layout/Content";
import { NewPostProvider } from "../containers/NewOrEditPost/contexts/NewPostContext";
import { NewPostDetailsCard } from "../containers/NewOrEditPost/components/NewPostDetailsCard";
import { NewPostEditor } from "../containers/NewOrEditPost/components/NewPostEditor";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";

export function NewPost() {
  return (
    <NewPostProvider>
      <Content.Root>
        <Content.Sidebar>
          <GlobalSidebar />
        </Content.Sidebar>
        <Content.Main>
          <NewPostEditor />
        </Content.Main>
        <Content.Sidebar>
          <NewPostDetailsCard />
        </Content.Sidebar>
      </Content.Root>
    </NewPostProvider>
  );
}
