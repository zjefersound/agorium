import {
  MdArrowUpward,
  MdCheckCircleOutline,
  MdOutlineReply,
} from "react-icons/md";
import { Comment } from "../../models/Comment";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { AuthorOverview } from "./AuthorOverview";
import Markdown from "react-markdown";
import { Text } from "../ui/Text";
import { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";

interface CommentCardProps {
  comment: Comment;
  accepted?: boolean;
  isPostAuthor?: boolean;
}
export function CommentCard({
  comment,
  accepted,
  isPostAuthor,
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
      <Markdown className="text-sm">{comment.content}</Markdown>
      <footer className="flex space-x-3">
        <Button size="sm" color={comment.voted ? "primary" : "secondary"}>
          <MdArrowUpward className="mr-2 size-5" /> {comment.totalUpvotes}
        </Button>
        <Button size="sm" color="secondary">
          <MdOutlineReply className="mr-2 size-5" /> Reply
        </Button>
        {!isPostAuthor && accepted && (
          <span className="text-xs leading-3 text-emerald-400 flex items-center">
            <MdCheckCircleOutline className="size-6 mr-2 shrink-0" />
            <span className="hidden min-[360px]:inline">
              Accepted by the author
            </span>
          </span>
        )}
        {!isAuthor && isPostAuthor && (
          <Button
            size="sm"
            color={accepted ? "success" : "secondary"}
            className="ml-auto"
          >
            <MdCheckCircleOutline className="mr-2 size-5" /> Accept answer
          </Button>
        )}
      </footer>
    </Card>
  );
}
