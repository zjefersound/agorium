import { useEditPost } from "../hooks/useEditPost";
import { PostEditor } from "./PostEditor";

export function EditPostEditor() {
  const { initialContent, errors, handleChangeContent } = useEditPost();
  return (
    <PostEditor
      title="Edit post"
      backTo="/"
      value={initialContent}
      error={errors["content"]}
      onChange={handleChangeContent}
    />
  );
}
