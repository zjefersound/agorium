import clsx from "clsx";
import { ReactNode } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

const IconByColor = {
  success: AiOutlineCheckCircle,
  error: AiOutlineCloseCircle,
  warning: AiOutlineExclamationCircle,
  info: AiOutlineExclamationCircle,
};
export interface Props {
  color?: "success" | "error" | "warning" | "info";
  className?: string;
  children: ReactNode;
}

export function Alert({ color = "info", className, children }: Props) {
  const Icon = IconByColor[color];
  return (
    <div
    role="alert"
      className={clsx(
        "flex items-center p-3 justify-center rounded-md font-medium text-sm",
        className,
        {
          "bg-emerald-100 text-emerald-600 shadow-emerald-700 hover:shadow-emerald-700  focus:shadow-emerald-700":
            color === "success",
          "bg-red-100 text-red-600 shadow-red-700 hover:shadow-red-700  focus:shadow-red-700":
            color === "error",
          "bg-blue-100 text-blue-600 shadow-blue-700 hover:shadow-blue-700  focus:shadow-blue-700":
            color === "info",
          "bg-amber-100 text-amber-600 shadow-amber-700 hover:shadow-amber-700  focus:shadow-amber-700":
            color === "warning",
        }
      )}
    >
      <Icon
        className={clsx("h-6 w-6 mr-2 shrink-0", {
          "text-emerald-600": color === "success",
          "text-red-600": color === "error",
          "text-blue-500": color === "info",
          "text-amber-500": color === "warning",
        })}
      />
      <p>{children}</p>
    </div>
  );
}
