import { memo, useCallback } from "react";
import { CommentCard } from "../components/shared/CommentCard";
import { CommentEditor } from "../components/shared/CommentEditor";
import { Empty } from "../components/ui/Empty";
import { Text } from "../components/ui/Text";
import { useCommentManager } from "../hooks/shared/useCommentManager";
import { Comment } from "../models/Comment";

interface PostCommentsProps {
  postId: number;
  comments: Comment[];
  isAuthor: boolean;
  favoriteCommentId?: number;
}
function PostComments({
  postId,
  comments,
  isAuthor,
  favoriteCommentId,
}: PostCommentsProps) {
  const { commentToReply, setCommentToReply, handleCreateComment } =
    useCommentManager(postId);
  const handleRemoveCommentToReply = useCallback(
    () => setCommentToReply(null),
    // eslint-disable-next-line
    [],
  );
  return (
    <>
      <span id="comments-count" className="block">
        {comments?.length || 0} comment(s)
      </span>
      <CommentEditor
        comment={commentToReply}
        onRemoveComment={handleRemoveCommentToReply}
        onSubmit={handleCreateComment}
      />
      {!comments?.length && (
        <Empty>
          <p className="to-amber-100 font-bold mb-3 text-center">
            No comments were found
          </p>
          <Text asChild>
            <span className="text-center">
              Be the first to share your thoughts
            </span>
          </Text>
        </Empty>
      )}
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          favorite={comment.id === favoriteCommentId}
          comment={comment}
          isPostAuthor={isAuthor}
          onReply={setCommentToReply}
        />
      ))}
    </>
  );
}

const MemoizedPostComments = memo(PostComments);
export { MemoizedPostComments as PostComments };
