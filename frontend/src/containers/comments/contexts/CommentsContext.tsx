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

interface CommentsProviderProps {
  post: Post;
}

export interface CommentsContextType {
  comments: Comment[];
  fetchComments: () => void;
}

export const CommentsContext = createContext<CommentsContextType>(
  {} as CommentsContextType,
);

export const CommentsProvider = ({ post }: CommentsProviderProps) => {
  const { user } = useAuth();
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

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const values = useMemo(
    () => ({
      comments,
      fetchComments,
    }),
    [comments, fetchComments],
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
