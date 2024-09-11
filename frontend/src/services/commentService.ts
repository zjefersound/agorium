export type CommentPayload = {
  content: string;
  parentCommentId?: number;
};

function create(postId: number, payload: CommentPayload) {
  console.log([`/post/${postId}/comment`, payload]);

  return Promise.resolve([`/post/${postId}/comment`, payload]);
}

export const commentService = {
  create,
  // delete: deleteComment,
  // getAll,
  // getById,
  // update,
};
