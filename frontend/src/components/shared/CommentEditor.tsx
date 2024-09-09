import { TextEditor } from "../../components/form/TextEditor";
import { FieldError } from "../../components/form/FieldError";
import { memo } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { MdOutlineModeComment } from "react-icons/md";

interface CommentEditorProps {
  error?: string;
  value: string;
  onChange: (value: string) => void;
}
function CommentEditor({ value, error, onChange }: CommentEditorProps) {
  return (
    <Card className="flex flex-col p-3 group/comment" tabIndex={0}>
      <div className="transition-[.3s] -mx-3 h-[0px] group-focus-within/comment:h-[280px] overflow-auto">
        <TextEditor
          markdown={value}
          placeholder="Type your comment..."
          onChange={onChange}
        />
      </div>
      <FieldError message={error} />

      <div className="flex items-center">
        <span className="group-focus-within:/comment:hidden text-agorium-400">
          Your comment
        </span>
        <Button
          className="ml-auto group-focus-within/comment:hidden"
          color="secondary"
        >
          Cancel
        </Button>
        <Button className="ml-3">
          <MdOutlineModeComment className="size-6 mr-2" />
          Comment
        </Button>
      </div>
    </Card>
  );
}
const MemoizedCommentEditor = memo(CommentEditor);
export { MemoizedCommentEditor as CommentEditor };
