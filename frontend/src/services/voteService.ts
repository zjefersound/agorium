import { api } from "./api";

export type VotePayload = {
  voteType: "upvote" | "downvote";
  postId?: number;
  commentId?: number;
};

function create(data: VotePayload) {
  return api.post("/vote", data);
}

function deleteVote(id: number | string) {
  return api.delete(`/vote/${id}`);
}

export const voteService = {
  create,
  delete: deleteVote,
};
