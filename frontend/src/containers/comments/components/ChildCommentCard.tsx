import { memo, useCallback, useMemo } from "react";

import { Card } from "../../../components/ui/Card";
import { MarkdownPreview } from "../../../components/ui/MarkdownPreview";
import { Text } from "../../../components/ui/Text";
import { AuthorOverview } from "../../../components/shared/AuthorOverview";
import { CommentActionsDropdown } from "./CommentActionsDropdown";
import { useComments } from "../hooks/useComments";
import { Comment } from "../../../models/Comment";
import { useAuth } from "../../../hooks/useAuth";

function ChildCommentCard({ comment }: { comment: Comment }) {
  const { user } = useAuth();
  const { deleteComment, setCommentToUpdate } = useComments();
  const isAuthor = useMemo(
    () => user!.id === comment.user!.id,
    [user, comment],
  );

  const handleEditComment = useCallback(() => {
    setCommentToUpdate(comment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  const handleDeleteComment = useCallback(() => {
    deleteComment(comment.id);
  }, [comment.id, deleteComment]);

  return (
    <Card key={comment.id} className="mt-3 space-y-2">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Text>
            Replying to{" "}
            <span className="font-semibold">@{comment.user!.username}</span>{" "}
          </Text>
          <AuthorOverview
            date={comment.createdAt}
            name={comment.user!.fullName}
            username={comment.user!.username}
            avatar={comment.user!.avatar}
          />
        </div>
        {isAuthor && (
          <CommentActionsDropdown
            onDelete={handleDeleteComment}
            onEdit={handleEditComment}
          />
        )}
      </div>

      <MarkdownPreview>{comment.content}</MarkdownPreview>
    </Card>
  );
}

const MemoizedChildCommentCard = memo(ChildCommentCard);
export { MemoizedChildCommentCard as ChildCommentCard };
