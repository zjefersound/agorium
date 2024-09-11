import {
  MdArrowUpward,
  MdCheckCircleOutline,
  MdOutlineReply,
} from "react-icons/md";
import { Comment } from "../../models/Comment";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { AuthorOverview } from "./AuthorOverview";
import { Text } from "../ui/Text";
import { memo, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { MarkdownPreview } from "../ui/MarkdownPreview";

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
  const isAuthor = useMemo(
    () => user!.id === comment.user!.id,
    [user, comment],
  );
  return (
    <Card className="space-y-4">
      <AuthorOverview
        date={comment.createdAt}
        name={comment.user!.fullName}
        username={comment.user!.username}
        avatar={comment.user!.avatar}
      />
      {comment.parentComment && (
        <div>
          <Text>
            Replying to{" "}
            <span className="font-semibold">
              @{comment.parentComment.user!.username}
            </span>{" "}
          </Text>
        </div>
      )}
      <MarkdownPreview>{comment.content}</MarkdownPreview>
      <footer className="flex space-x-3">
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
      </footer>
    </Card>
  );
}
const MemoizedCommentCard = memo(CommentCard);
export { MemoizedCommentCard as CommentCard };
