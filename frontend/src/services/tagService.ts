import { Tag } from "../models/Tag";
import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { ISearchableOptions } from "../models/ISearchableOptions";
import { api } from "./api";

function getAll(options?: ISearchableOptions) {
  return api.get<IPaginatedResponse<Tag>>("/tags", {
    params: {
      ...options,
    },
  });
}

export interface ITrendingTag {
  tag: Tag;
  totalPosts: number;
}
function getTrending() {
  return api.get<ITrendingTag[]>("/tags/trending");
}

export const tagService = {
  getAll,
  getTrending,
};
