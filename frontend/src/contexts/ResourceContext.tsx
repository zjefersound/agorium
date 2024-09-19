import { createContext, useEffect, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { Category } from "../models/Category";
import { Post } from "../models/Post";
import { IPaginatedResource } from "../models/IPaginatedResource";
import { usePaginatedResource } from "../hooks/resources/usePaginatedResource";
import { categoryService } from "../services/categoryService";
import { IPostSearchableOptions, postService } from "../services/postService";
import { Tag } from "../models/Tag";
import { tagService } from "../services/tagService";

interface ResourceProviderProps {
  children: React.ReactNode;
}

export interface ResourceContextType {
  categoriesResource: IPaginatedResource<Category>;
  postsResource: IPaginatedResource<Post, IPostSearchableOptions>;
  tagsResource: IPaginatedResource<Tag>;
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
  const tagsResource = usePaginatedResource<Tag>({
    alias: "tags",
    fetch: tagService.getAll,
    expiresIn: 1000 * 30, // 30 s
  });
  const postsResource = usePaginatedResource<Post, IPostSearchableOptions>({
    alias: "posts",
    fetch: postService.getAll,
    expiresIn: 1000 * 60 * 2, // 2 min
  });

  const values = useMemo(
    () => ({ categoriesResource, postsResource, tagsResource }),
    [categoriesResource, postsResource, tagsResource],
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
