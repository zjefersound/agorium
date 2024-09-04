import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { ISearchableOptions } from "../models/ISearchableOptions";
import { Post } from "../models/Post";
import { api } from "./api";

async function getById(id: number | string) {
  return api.get<Post>(`/post/${id}`);
}

export type CreatePostPayload = {
  title: string;
  content: string;
  categoryId: number;
  tags: string[];
};
function create(data: CreatePostPayload) {
  return api.post("/post", data);
}

function getAll(options?: ISearchableOptions) {
  return api.get<IPaginatedResponse<Post>>("/posts", {
    params: {
      ...options,
    },
  });
}

export const postService = {
  create,
  getAll,
  getById,
};
