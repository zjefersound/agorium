import { useContext } from "react";
import { NewPostContext } from "../contexts/NewPostContext";

export const useNewPost = () => {
  return useContext(NewPostContext);
};
