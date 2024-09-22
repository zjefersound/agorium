import { User } from "./User";
import { Vote } from "./Vote";

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: number;
  userId: number;
  parentCommentId?: number;

  userVote?: Vote;
  totalUpvotes: number;
  user?: User;

  children: Comment[];
};
