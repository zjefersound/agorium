import { Category } from "./Category";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { User } from "./User";

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  userId: number;

  voted: boolean;
  totalUpvotes: number;

  favoriteCommentId?: number;

  tags?: Tag[];
  category: Category;
  user: Pick<User, "id" | "avatar" | "fullName" | "username">;
  comments?: Comment[];
};
