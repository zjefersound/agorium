import {
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdOutlineClose, MdOutlineModeComment } from "react-icons/md";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Text } from "../../../components/ui/Text";
import { Loading } from "../../../components/ui/Loading";
import { Comment } from "../../../models/Comment";
import { TextEditor } from "../../../components/form/TextEditor";
import { FieldError } from "../../../components/form/FieldError";

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
  const commentElementRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const valueRef = useRef("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClear = useCallback(() => {
    setOpen(false);
    setError("");
    onRemoveComment();
    valueRef.current = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        .then(handleClear)
        .finally(() => setLoading(false));
    },
    [onSubmit, handleClear],
  );

  useEffect(() => {
    if (comment) {
      setOpen(true);
      if (commentElementRef.current)
        commentElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comment]);

  return (
    <div ref={commentElementRef} className="scroll-mt-6" id="comment-editor">
      {!open && (
        <button className="w-full" onClick={() => setOpen(true)}>
          <Card className="text-left">
            <Text>Add a comment</Text>
          </Card>
        </button>
      )}
      {open && (
        <form onSubmit={handleSubmit}>
          {comment && (
            <div className="bg-agorium-700 rounded-t-md pt-1 px-2 pb-5 -mb-4 flex justify-between items-center">
              <Text>Replying to @{comment.user?.username}</Text>
              <button onClick={onRemoveComment} type="button">
                <MdOutlineClose />
              </button>
            </div>
          )}
          <div className="flex flex-col bg-agorium-800 border-[1px] border-agorium-700 rounded-md">
            <div className="transition-[.3s] max-h-[280px] overflow-auto">
              <TextEditor
                markdown=""
                placeholder="Type your comment..."
                onChange={(value) => {
                  valueRef.current = value;
                }}
              />
            </div>
            <div className="flex items-center p-3">
              <FieldError message={error} />
              <Button
                className="ml-auto"
                type="button"
                color="secondary"
                onClick={handleClear}
              >
                Cancel
              </Button>
              <Button className="ml-3" type="submit" disabled={loading}>
                {loading && <Loading size="sm" className="mr-2" />}
                <MdOutlineModeComment className="size-6 mr-2" />
                Comment
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
const MemoizedCommentEditor = memo(CommentEditor);
export { MemoizedCommentEditor as CommentEditor };
