import { createContext, useEffect, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { Category } from "../models/Category";
import { Post } from "../models/Post";
import { IPaginatedResource } from "../models/IPaginatedResource";
import { usePaginatedResource } from "../hooks/resources/usePaginatedResource";
import {
  categoryService,
  ITrendingCategory,
} from "../services/categoryService";
import { IPostSearchableOptions, postService } from "../services/postService";
import { IGenericResource } from "../models/IGenericResource";
import { useGenericResource } from "../hooks/resources/useGenericResource";

interface ResourceProviderProps {
  children: React.ReactNode;
}

export interface ResourceContextType {
  categoriesResource: IPaginatedResource<Category>;
  popularCategoriesResource: IGenericResource<ITrendingCategory[]>;
  postsResource: IPaginatedResource<Post, IPostSearchableOptions>;
}

export const ResourceContext = createContext<ResourceContextType>(
  {} as ResourceContextType,
);

export const ResourceProvider = ({ children }: ResourceProviderProps) => {
  const { authenticated } = useAuth();
  const categoriesResource = usePaginatedResource<Category>({
    alias: "categories",
    fetch: categoryService.getAll,
  });
  const popularCategoriesResource = useGenericResource<ITrendingCategory[]>({
    alias: "posts",
    fetch: categoryService.getTrending,
    expiresIn: 1000 * 60 * 5, // 5 min
  });
  const postsResource = usePaginatedResource<Post, IPostSearchableOptions>({
    alias: "posts",
    fetch: postService.getAll,
    expiresIn: 1000 * 60 * 2, // 2 min
  });

  const values = useMemo(
    () => ({ categoriesResource, popularCategoriesResource, postsResource }),
    [categoriesResource, popularCategoriesResource, postsResource],
  );

  useEffect(() => {
    if (!authenticated) return;
    popularCategoriesResource.fetchData();
    categoriesResource.fetchData();
    // eslint-disable-next-line
  }, [authenticated]);
  return (
    <ResourceContext.Provider value={values}>
      {children}
    </ResourceContext.Provider>
  );
};
