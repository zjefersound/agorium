import { useContext } from "react";
import { ResourceContext } from "../contexts/ResourceContext";

export const useResource = () => {
  return useContext(ResourceContext);
};
