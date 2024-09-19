import { Category } from "../models/Category";
import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { ISearchableOptions } from "../models/ISearchableOptions";
import { api } from "./api";

function getAll(options?: ISearchableOptions) {
  return api.get<IPaginatedResponse<Category>>("/categories", {
    params: {
      ...options,
    },
  });
}

export interface ITrendingCategory {
  category: Category;
  totalPosts: number;
}
function getTrending() {
  return api.get<ITrendingCategory[]>("/categories/trending");
}

export const categoryService = {
  getAll,
  getTrending,
};
