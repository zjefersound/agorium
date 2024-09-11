import { TextEditor } from "../../components/form/TextEditor";
import { FieldError } from "../../components/form/FieldError";
import {
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { MdOutlineClose, MdOutlineModeComment } from "react-icons/md";
import { Text } from "../ui/Text";
import { Comment } from "../../models/Comment";
import { Loading } from "../ui/Loading";

interface CommentEditorProps {
  comment?: Comment | null;
  onRemoveComment: () => void;
  onSubmit: (content: string) => Promise<void>;
}
function CommentEditor({
  comment,
  onRemoveComment,
  onSubmit,
}: CommentEditorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const valueRef = useRef("");
  const [open, setOpen] = useState(false);
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const value = valueRef.current;
      if (!value.trim()) {
        setError("Comment is required");
        return;
      }
      setLoading(true);
      onSubmit(value)
        .then(() => {
          valueRef.current = "";
          setOpen(false);
          onRemoveComment();
        })
        .finally(() => setLoading(false));
    },
    [onSubmit, onRemoveComment],
  );
  useEffect(() => {
    if (comment) setOpen(true);
  }, [comment]);
  if (!open)
    return (
      <button className="w-full" onClick={() => setOpen(true)}>
        <Card className="text-left">
          <Text>Add a comment</Text>
        </Card>
      </button>
    );
  return (
    <form onSubmit={handleSubmit}>
      {comment && (
        <div className="bg-agorium-700 rounded-t-md pt-1 px-2 pb-5 -mb-4 flex justify-between items-center">
          <Text>Replying to @{comment.user?.username}</Text>
          <button onClick={onRemoveComment} type="button">
            <MdOutlineClose />
          </button>
        </div>
      )}
      <Card className="flex flex-col" tabIndex={0}>
        <div className="transition-[.3s] -mx-4 -mt-4 md:-mx-6 md:-mt-6 max-h-[280px] overflow-auto">
          <TextEditor
            markdown=""
            placeholder="Type your comment..."
            onChange={(value) => {
              valueRef.current = value;
            }}
          />
        </div>
        <FieldError message={error} />

        <div className="flex items-center ">
          <Button
            className="ml-auto"
            type="button"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button className="ml-3" type="submit" disabled={loading}>
            {loading && <Loading size="sm" className="mr-2" />}
            <MdOutlineModeComment className="size-6 mr-2" />
            Comment
          </Button>
        </div>
      </Card>
    </form>
  );
}
const MemoizedCommentEditor = memo(CommentEditor);
export { MemoizedCommentEditor as CommentEditor };
