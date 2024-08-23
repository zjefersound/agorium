import { Post } from "./Post";
import { User } from "./User";

export type Vote = {
  id: number;
  voteType: "upvote" | "downvote";
  createdAt: string;
  userId: number;
  postId?: number;
  commentId?: number;

  user: User;
  post?: Post;
  comment?: Comment;
};
