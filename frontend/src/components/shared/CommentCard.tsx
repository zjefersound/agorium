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

interface CommentCardProps {
  comment: Comment;
}
export function CommentCard({ comment }: CommentCardProps) {
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
      <Markdown>{comment.content}</Markdown>
      <footer className="flex space-x-3">
        <Button size="sm" color={comment.voted ? "primary" : "secondary"}>
          <MdArrowUpward className="mr-2 size-5" /> {comment.totalUpvotes}
        </Button>
        <Button size="sm" color="secondary">
          <MdOutlineReply className="mr-2 size-5" /> Reply
        </Button>
        <span className="text-sm text-emerald-400 flex items-center">
          <MdCheckCircleOutline className="size-6 mr-2" /> Accepted by the
          author
        </span>
      </footer>
    </Card>
  );
}
