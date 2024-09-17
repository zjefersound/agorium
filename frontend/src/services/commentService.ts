import { Comment } from "../models/Comment";
import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { ISearchableOptions } from "../models/ISearchableOptions";
import { api } from "./api";

export type CommentPayload = {
  content: string;
  parentCommentId?: number;
};

function create(postId: number, payload: CommentPayload) {
  return api.post(`/post/${postId}/comment`, payload);
}

function getById(postId: number, commentId: number) {
  return api.get<Comment>(`/post/${postId}/comment/${commentId}`);
}

function update(postId: number, commentId: number, payload: CommentPayload) {
  return api.put(`/post/${postId}/comment/${commentId}`, payload);
}

function deleteComment(postId: number, commentId: number) {
  return api.delete(`/post/${postId}/comment/${commentId}`);
}

function getAll(postId: number, options?: ISearchableOptions) {
  return api.get<IPaginatedResponse<Comment>>(`/post/${postId}/comments`, {
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
