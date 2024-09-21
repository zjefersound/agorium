import { memo, useCallback, useMemo } from "react";
import { Empty } from "../../components/ui/Empty";
import { Text } from "../../components/ui/Text";
import { useCommentCreation } from "./hooks/useCommentCreation";
import { useComments } from "./hooks/useComments";
import { CommentEditor } from "./components/CommentEditor";
import { CommentCard } from "./components/CommentCard";

interface PostCommentsProps {
  postId: string | number;
  isAuthor: boolean;
  favoriteCommentId?: number;
}
function PostComments({
  postId,
  isAuthor,
  favoriteCommentId,
}: PostCommentsProps) {
  const { comments, fetchComments } = useComments();
  const { commentToReply, setCommentToReply, handleCreateComment } =
    useCommentCreation(postId);
  const handleRemoveCommentToReply = useCallback(
    () => setCommentToReply(null),
    // eslint-disable-next-line
    [],
  );

  const handleSubmit = useCallback(
    async (content: string) => {
      await handleCreateComment(content).then(fetchComments);
    },
    [handleCreateComment, fetchComments],
  );

  const totalComments = useMemo(
    () =>
      comments.reduce(
        (total, comment) => total + 1 + comment.children.length,
        0,
      ),
    [comments],
  );

  return (
    <>
      <span id="comments-count" className="block">
        {totalComments} comment(s)
      </span>
      <CommentEditor
        comment={commentToReply}
        onRemoveComment={handleRemoveCommentToReply}
        onSubmit={handleSubmit}
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
