import { Comment } from "../models/Comment";
import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { ISearchableOptions } from "../models/ISearchableOptions";
import { api } from "./api";

export type CommentPayload = {
  content: string;
  parentCommentId?: number;
};

function create(postId: number | string, payload: CommentPayload) {
  return api.post(`/post/${postId}/comment`, payload);
}

function getById(postId: number | string, commentId: number | string) {
  return api.get<Comment>(`/post/${postId}/comment/${commentId}`);
}

function update(
  postId: number | string,
  commentId: number | string,
  payload: CommentPayload,
) {
  return api.put(`/post/${postId}/comment/${commentId}`, payload);
}

function deleteComment(postId: number | string, commentId: number | string) {
  return api.delete(`/post/${postId}/comment/${commentId}`);
}

function getAll(postId: number | string, options?: ISearchableOptions) {
  return api.get<Comment[]>(`/post/${postId}/comments`, {
    params: {
      ...options,
    },
  });
}

export const commentService = {
  create,
  delete: deleteComment,
  getAll,
  getById,
  update,
};
