import { TextEditor } from "../../../components/form/TextEditor";
import { FieldError } from "../../../components/form/FieldError";
import { Heading } from "../../../components/ui/Heading";
import { GoBack } from "../../../components/ui/GoBack";
import { memo } from "react";

interface PostEditorProps {
  title: string;
  backTo: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}
function PostEditor({
  title,
  backTo,
  value,
  error,
  onChange,
}: PostEditorProps) {
  return (
    <div className="flex flex-col space-y-6 h-[calc(var(--content-height)-var(--main-content-padding-x)-var(--main-content-padding-x))]">
      <div className="flex items-center">
        <GoBack to={backTo} hideText />
        <Heading size="lg" asChild>
          <h2 className="text-amber-100 ml-3">{title}</h2>
        </Heading>
      </div>
      <FieldError message={error} />

      <div
        className="flex flex-col flex-1 overflow-auto bg-agorium-800 ring-1 ring-agorium-700 rounded-md"
      >
        <TextEditor
          markdown={value}
          placeholder="Ask a question, share your thoughts, bring interesting discussions..."
          onChange={onChange}
        />
      </div>
    </div>
  );
}
const MemoizedPostEditor = memo(PostEditor);
export { MemoizedPostEditor as PostEditor };
