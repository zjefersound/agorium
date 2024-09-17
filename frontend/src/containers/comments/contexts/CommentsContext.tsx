import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { commentService } from "../../../services/commentService";
import { Comment } from "../../../models/Comment";
import { PostCommentsSkeleton } from "../../../components/shared/skeletons/PostCommentsSkeleton";
import { PostComments } from "../PostComments";
import { Post } from "../../../models/Post";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import { AxiosError } from "axios";
import { IApiErrorResponse } from "../../../models/IApiErrorResponse";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";

interface CommentsProviderProps {
  post: Post;
}

export interface CommentsContextType {
  comments: Comment[];
  fetchComments: () => void;
  deleteComment: (commentId: string | number) => Promise<void>;
  updateComment: (commentId: string | number, content: string) => Promise<void>;
}

export const CommentsContext = createContext<CommentsContextType>(
  {} as CommentsContextType,
);

export const CommentsProvider = ({ post }: CommentsProviderProps) => {
  const { user } = useAuth();
  const { launchToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const isAuthor = useMemo(() => user!.id === post.user.id, [user, post]);

  const fetchComments = useCallback(() => {
    setLoading(true);
    commentService
      .getAll(post.id)
      .then((res) => setComments(res.data))
      .finally(() => setLoading(false));
  }, [post.id]);

  const deleteComment = useCallback(
    (commentId: string | number) => {
      return commentService
        .delete(post.id, commentId)
        .then(fetchComments)
        .catch((error: AxiosError<IApiErrorResponse>) => {
          launchToast({
            color: "danger",
            title: "Failed to delete your comment",
            description: getApiErrorMessage(error),
          });
        });
    },
    // eslint-disable-next-line
    [post.id, fetchComments],
  );

  const updateComment = useCallback(
    (commentId: string | number, content: string) => {
      return commentService
        .update(post.id, commentId, { content })
        .then(fetchComments)
        .catch((error: AxiosError<IApiErrorResponse>) => {
          launchToast({
            color: "danger",
            title: "Failed to update your comment",
            description: getApiErrorMessage(error),
          });
        });
    },
    // eslint-disable-next-line
    [post.id, fetchComments],
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const values = useMemo(
    () => ({
      comments,
      deleteComment,
      fetchComments,
      updateComment,
    }),
    [comments, fetchComments, deleteComment],
  );
  if (loading && comments.length === 0) return <PostCommentsSkeleton />;

  return (
    <CommentsContext.Provider value={values}>
      <PostComments
        postId={post.id}
        isAuthor={isAuthor}
        favoriteCommentId={post.favoriteCommentId}
      />
    </CommentsContext.Provider>
  );
};
