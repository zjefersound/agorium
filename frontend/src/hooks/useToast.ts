import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";

export const useToast = () => {
  return useContext(ToastContext);
};