import { useCallback } from "react";
import { Dialog } from "../../../components/ui/Dialog";
import { useComments } from "../hooks/useComments";
import { CommentForm } from "./CommentForm";

export function CommentEditModal() {
  const { commentToUpdate, setCommentToUpdate, updateComment } = useComments();
  const handleCloseModal = useCallback(() => {
    setCommentToUpdate(null);
  }, []);

  const handleSubmit = useCallback(
    async (content: string) => {
      updateComment(commentToUpdate!.id, content);
    },
    [commentToUpdate, updateComment],
  );

  return (
    <Dialog.Root
      open={Boolean(commentToUpdate)}
      onOpenChange={handleCloseModal}
    >
      <Dialog.Content
        title="Edit comment"
        description="Fix typos or change the content"
      >
        {commentToUpdate && (
          <CommentForm
            onSubmit={handleSubmit}
            onClear={handleCloseModal}
            initialValue={commentToUpdate.content}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
