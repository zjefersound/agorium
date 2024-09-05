import { useNewPost } from "../hooks/useNewPost";
import { PostEditor } from "./PostEditor";

export function NewPostEditor() {
  const { initialContent, errors, handleChangeContent } = useNewPost();
  return (
    <PostEditor
      title="New post"
      backTo="/"
      value={initialContent}
      error={errors["content"]}
      onChange={handleChangeContent}
    />
  );
}
