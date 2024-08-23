import { Category } from "./Category";
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

  tags?: Tag[];
  category: Category;
  user: User;
  comments?: Comment[];
};
