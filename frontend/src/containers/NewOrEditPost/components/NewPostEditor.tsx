import { GoBack } from "../../../components/ui/GoBack";
import { Heading } from "../../../components/ui/Heading";
import { TextEditor } from "../../../components/form/TextEditor";
import { FieldError } from "../../../components/form/FieldError";
import { useNewPost } from "../hooks/useNewPost";

export function NewPostEditor() {
  const { initialContent, errors, handleChangeContent } = useNewPost();
  return (
    <div className="flex flex-col space-y-6 h-[calc(var(--content-height)-var(--main-content-padding-x)-var(--main-content-padding-x))]">
      <div className="flex items-center">
        <GoBack to="/" hideText />
        <Heading size="lg" asChild>
          <h2 className="text-amber-100 ml-3">New post</h2>
        </Heading>
      </div>
      <TextEditor
        markdown={initialContent}
        placeholder="Ask a question, share your thoughts, bring interesting discussions..."
        className="flex flex-col flex-1"
        onChange={handleChangeContent}
      />
      <FieldError message={errors["content"]} />
    </div>
  );
}
