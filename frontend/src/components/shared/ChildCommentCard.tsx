import { memo, useCallback, useMemo } from "react";
import { useComments } from "../../containers/comments/hooks/useComments";
import { useAuth } from "../../hooks/useAuth";
import { Comment } from "../../models/Comment";
import { Card } from "../ui/Card";
import { MarkdownPreview } from "../ui/MarkdownPreview";
import { Text } from "../ui/Text";
import { AuthorOverview } from "./AuthorOverview";
import { CommentActionsDropdown } from "./CommentActionsDropdown";

function ChildCommentCard({ comment }: { comment: Comment }) {
  const { user } = useAuth();
  const { deleteComment } = useComments();
  const isAuthor = useMemo(
    () => user!.id === comment.user!.id,
    [user, comment],
  );

  const handleEditComment = useCallback(() => {
    // do the thing
  }, []);

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
