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
import { Tag } from "../models/Tag";
import { ITrendingTag, tagService } from "../services/tagService";
import { UserOverviewResponse, userService } from "../services/userService";

interface ResourceProviderProps {
  children: React.ReactNode;
}

export interface ResourceContextType {
  categoriesResource: IPaginatedResource<Category>;
  popularCategoriesResource: IGenericResource<ITrendingCategory[]>;
  popularTagsResource: IGenericResource<ITrendingTag[]>;
  postResource: IGenericResource<Post, number>;
  userOverviewResource: IGenericResource<UserOverviewResponse, number>;
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

  const popularCategoriesResource = useGenericResource<ITrendingCategory[]>({
    alias: "popular categories",
    fetch: categoryService.getTrending,
    expiresIn: 1000 * 60 * 5, // 5 min
  });

  const popularTagsResource = useGenericResource<ITrendingTag[]>({
    alias: "popular tags",
    fetch: tagService.getTrending,
    expiresIn: 1000 * 60 * 5, // 5 min
  });

  const postResource = useGenericResource<Post, number>({
    alias: "post",
    fetch: postService.getById,
    expiresIn: 1000 * 60 * 1, // 1 min
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

  const userOverviewResource = useGenericResource<UserOverviewResponse, number>(
    {
      alias: "user overview",
      fetch: userService.getOverviewById,
      expiresIn: 1000 * 60 * 1, // 1 min
    },
  );

  const values = useMemo(
    () => ({
      categoriesResource,
      popularCategoriesResource,
      popularTagsResource,
      postResource,
      postsResource,
      tagsResource,
      userOverviewResource,
    }),
    [
      categoriesResource,
      popularCategoriesResource,
      popularTagsResource,
      postResource,
      postsResource,
      tagsResource,
      userOverviewResource,
    ],
  );

  useEffect(() => {
    if (!authenticated) return;
    popularCategoriesResource.fetchData();
    popularTagsResource.fetchData();
    categoriesResource.fetchData();
    // eslint-disable-next-line
  }, [authenticated]);
  return (
    <ResourceContext.Provider value={values}>
      {children}
    </ResourceContext.Provider>
  );
};
