import { memo, useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Card } from "../../../components/ui/Card";
import { Text } from "../../../components/ui/Text";
import { Comment } from "../../../models/Comment";
import { CommentForm } from "./CommentForm";

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
  const [open, setOpen] = useState(false);

  const handleClear = useCallback(() => {
    setOpen(false);
    onRemoveComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div>
          {comment && (
            <div className="bg-agorium-700 rounded-t-md pt-1 px-2 pb-5 -mb-4 flex justify-between items-center">
              <Text>Replying to @{comment.user?.username}</Text>
              <button onClick={onRemoveComment} type="button">
                <MdOutlineClose />
              </button>
            </div>
          )}
          <CommentForm onClear={handleClear} onSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
}
const MemoizedCommentEditor = memo(CommentEditor);
export { MemoizedCommentEditor as CommentEditor };
