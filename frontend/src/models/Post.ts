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

  tags?: Tag[];
  category: Category;
  user: User;
  comments?: Comment[];
  upvotes?: Vote[];
};
