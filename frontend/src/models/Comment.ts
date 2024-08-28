import { Post } from "./Post";
import { User } from "./User";

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: number;
  userId: number;
  parentCommentId?: number;

  voted: boolean;
  totalUpvotes: number;

  parentComment?: Comment;
  post?: Post;
  user?: User;
};
