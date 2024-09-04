import { useCallback, useState } from "react";
import { Category } from "../../models/Category";
import { categoryService } from "../../services/categoryService";
import { ISearchableOptions } from "../../models/ISearchableOptions";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategories = useCallback((options?: ISearchableOptions) => {
    setLoading(true);
    return categoryService
      .getAll(options)
      .then((res) => setCategories(res.data.data))
      .catch((error) => console.error("Failed to fetch categories:", error))
      .finally(() => setLoading(false));
  }, []);

  return { categories, fetchCategories, loading };
}
