import {
  MdArrowUpward,
  MdCheckCircleOutline,
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineMoreVert,
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
import { HoverDropdown } from "../ui/HoverDropdown";
import { AlertDialog } from "../ui/AlertDialog";
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
  const isAuthor = useMemo(
    () => user!.id === comment.user!.id,
    [user, comment],
  );
  const handleDeleteComment = () => {
    // do the thing
  };
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
          <HoverDropdown.Root>
            <HoverDropdown.Trigger>
              <div className="hover:bg-agorium-700 p-1 rounded-full">
                <MdOutlineMoreVert className="size-6" />
              </div>
            </HoverDropdown.Trigger>
            <HoverDropdown.Content className="top-10 w-28" placement="right">
              <HoverDropdown.Button>
                <MdOutlineEdit className="size-6 mr-2 shrink-0 text-amber-100" />
                Edit
              </HoverDropdown.Button>
              <AlertDialog
                confirmText="Delete comment"
                title="Are you sure you want to delete this comment?"
                description="You won't be able to undo this action"
                onConfirm={handleDeleteComment}
              >
                <HoverDropdown.Button className="text-red-400">
                  <MdDeleteOutline className="size-6 mr-2 shrink-0" />
                  Delete
                </HoverDropdown.Button>
              </AlertDialog>
            </HoverDropdown.Content>
          </HoverDropdown.Root>
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
            <ChildCommentCard key={childComment.id} comment={childComment} />
          ))}
        </div>
      )}
    </div>
  );
}
const MemoizedCommentCard = memo(CommentCard);
export { MemoizedCommentCard as CommentCard };
