import { useContext } from "react";
import { CommentsContext } from "../contexts/CommentsContext";

export const useComments = () => {
  return useContext(CommentsContext);
};
