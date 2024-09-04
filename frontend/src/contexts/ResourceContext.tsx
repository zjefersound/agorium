import { createContext, useEffect, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { Category } from "../models/Category";
import { Post } from "../models/Post";
import { IPaginatedResource } from "../models/IPaginatedResource";
import { usePaginatedResource } from "../hooks/resources/usePaginatedResource";
import { categoryService } from "../services/categoryService";
import { postService } from "../services/postService";

interface ResourceProviderProps {
  children: React.ReactNode;
}

export interface ResourceContextType {
  categoriesResource: IPaginatedResource<Category>;
  postsResource: IPaginatedResource<Post>;
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
  const postsResource = usePaginatedResource<Post>({
    alias: "posts",
    fetch: postService.getAll,
    expiresIn: 1000 * 10, // 10 seconds
  });

  const values = useMemo(
    () => ({ categoriesResource, postsResource }),
    [categoriesResource, postsResource],
  );

  useEffect(() => {
    if (!authenticated) return;

    categoriesResource.fetchData();
    // eslint-disable-next-line
  }, [authenticated]);
  return (
    <ResourceContext.Provider value={values}>
      {children}
    </ResourceContext.Provider>
  );
};
