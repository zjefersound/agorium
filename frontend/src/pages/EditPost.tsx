import { Content } from "../components/layout/Content";
import { EditPostProvider } from "../containers/NewOrEditPost/contexts/EditPostContext";
import { EditPostDetailsCard } from "../containers/NewOrEditPost/components/EditPostDetailsCard";
import { EditPostEditor } from "../containers/NewOrEditPost/components/EditPostEditor";
import { DeletePostCard } from "../containers/NewOrEditPost/components/DeletePostCard";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";

export function EditPost() {
  return (
    <EditPostProvider>
      <Content.Root>
        <Content.Sidebar>
          <GlobalSidebar />
        </Content.Sidebar>
        <Content.Main>
          <EditPostEditor />
        </Content.Main>
        <Content.Sidebar>
          <EditPostDetailsCard />
          <DeletePostCard />
        </Content.Sidebar>
      </Content.Root>
    </EditPostProvider>
  );
}
