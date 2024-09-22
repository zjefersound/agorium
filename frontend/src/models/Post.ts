import { Category } from "./Category";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { User } from "./User";
import { Vote } from "./Vote";

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  userId: number;

  userVote?: Vote;
  totalUpvotes: number;
  totalComments: number;

  favoriteCommentId?: number;

  tags?: Tag[];
  category: Category;
  user: Pick<User, "id" | "avatar" | "fullName" | "username">;
  comments?: Comment[];
};
