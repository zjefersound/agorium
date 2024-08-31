import { useContext } from "react";
import { EditPostContext } from "../contexts/EditPostContext";

export const useEditPost = () => {
  return useContext(EditPostContext);
};
