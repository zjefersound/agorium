import { useState } from "react";
import { Category } from "../../models/Category";
import { categoryService } from "../../services/categoryService";
import { ISearchableOptions } from "../../models/ISearchableOptions";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchCategories = (options?: ISearchableOptions) =>
    categoryService.getAll(options).then((res) => setCategories(res.data.data));
  return { categories, fetchCategories };
}
