import { useCallback, useState } from "react";
import {
  CommentPayload,
  commentService,
} from "../../../services/commentService";
import { Comment } from "../../../models/Comment";

export function useCommentCreation(postId: string | number) {
  const [commentToReply, setCommentToReply] = useState<null | Comment>(null);
  const handleCreateComment = useCallback(
    async (content: string) => {
      const payload: CommentPayload = {
        content,
      };
      if (commentToReply) {
        payload.parentCommentId = commentToReply.id;
      }

      return commentService.create(postId, payload);
    },
    [commentToReply, postId],
  );
  return { commentToReply, setCommentToReply, handleCreateComment };
}
