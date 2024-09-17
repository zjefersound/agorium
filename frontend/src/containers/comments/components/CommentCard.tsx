import {
  MdArrowUpward,
  MdCheckCircleOutline,
  MdOutlineReply,
} from "react-icons/md";
import { Card } from "../../../components/ui/Card";
import { MarkdownPreview } from "../../../components/ui/MarkdownPreview";
import { Text } from "../../../components/ui/Text";
import { AuthorOverview } from "../../../components/shared/AuthorOverview";
import { useComments } from "../hooks/useComments";
import { Comment } from "../../../models/Comment";
import { useAuth } from "../../../hooks/useAuth";
import { CommentActionsDropdown } from "./CommentActionsDropdown";
import { memo, useCallback, useMemo } from "react";
import { Button } from "../../../components/ui/Button";
import { ChildCommentCard } from "./ChildCommentCard";

interface CommentCardProps {
  comment: Comment;
  favorite?: boolean;
  isPostAuthor?: boolean;
  onReply: (comment: Comment) => void;
}
function CommentCard({
  comment,
  favorite,
  isPostAuthor,
  onReply,
}: CommentCardProps) {
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
    <div>
      <Card className="space-y-2">
        <div className="flex justify-between">
          <AuthorOverview
            date={comment.createdAt}
            name={comment.user!.fullName}
            username={comment.user!.username}
            avatar={comment.user!.avatar}
          />
          {isAuthor && (
            <CommentActionsDropdown
              onDelete={handleDeleteComment}
              onEdit={handleEditComment}
            />
          )}
        </div>
        <MarkdownPreview>{comment.content}</MarkdownPreview>
        <footer className="flex items-center space-x-3">
          <Button size="sm" color={comment.voted ? "primary" : "secondary"}>
            <MdArrowUpward className="mr-2 size-5" /> {comment.totalUpvotes}
          </Button>
          <Button size="sm" color="secondary" onClick={() => onReply(comment)}>
            <MdOutlineReply className="mr-2 size-5" /> Reply
          </Button>
          {!isPostAuthor && favorite && (
            <span className="text-xs leading-3 text-emerald-400 flex items-center">
              <MdCheckCircleOutline className="size-6 mr-2 shrink-0" />
              <span className="hidden min-[360px]:inline">
                Favorite from the author
              </span>
            </span>
          )}
          {!isAuthor && isPostAuthor && (
            <Button
              size="sm"
              color={favorite ? "success" : "secondary"}
              className="ml-auto"
            >
              <MdCheckCircleOutline className="mr-2 size-5" /> Accept answer
            </Button>
          )}
          <Text>{comment.children.length} replies</Text>
        </footer>
      </Card>
      {Boolean(comment.children.length) && (
        <div className="ml-3 ">
          {comment.children.map((childComment) => (
            <ChildCommentCard
              key={childComment.id}
              parentComment={comment}
              comment={childComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
const MemoizedCommentCard = memo(CommentCard);
export { MemoizedCommentCard as CommentCard };
