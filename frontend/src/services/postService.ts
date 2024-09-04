import { mockedPosts } from "../examples/mocks/mocks";
import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { ISearchableOptions } from "../models/ISearchableOptions";
import { Post } from "../models/Post";
import { api } from "./api";

async function getById(id: number | string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const post = mockedPosts.find((p) => String(p.id) === id);
  if (!post)
    return Promise.reject({
      status: 404,
    });
  return Promise.resolve({
    data: post,
  });
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
