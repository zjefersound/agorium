import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { ISearchableOptions } from "../models/ISearchableOptions";
import { Post } from "../models/Post";
import { api } from "./api";

export type PostPayload = {
  title: string;
  content: string;
  categoryId: number;
  tags: string[];
};

async function getById(id: number | string) {
  return api.get<Post>(`/post/${id}`);
}

function create(data: PostPayload) {
  return api.post("/post", data);
}

function update(id: number | string, data: PostPayload) {
  return api.put(`/post/${id}`, data);
}

function updateFavoriteComment(
  id: number | string,
  favoriteCommentId: number | string,
) {
  return api.patch(`/post/${id}/favorite-comment`, { favoriteCommentId });
}

function deletePost(id: number | string) {
  return api.delete(`/post/${id}`);
}
export interface IPostSearchableOptions extends ISearchableOptions {
  categoryId?: string;
  tagId?: string;
}
function getAll(options?: IPostSearchableOptions) {
  return api.get<IPaginatedResponse<Post>>("/posts", {
    params: {
      ...options,
    },
  });
}

export const postService = {
  create,
  delete: deletePost,
  getAll,
  getById,
  update,
  updateFavoriteComment,
};
