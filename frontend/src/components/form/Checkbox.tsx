import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { SemanticColor } from "../../models/semanticColor";
import { MdCheck } from "react-icons/md";

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
  color?: SemanticColor;
  borderColor?: "danger" | "success";
}

export function Checkbox({
  checked,
  onChange,
  className,
  color = "primary",
  borderColor,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      className={clsx(
        "size-6 rounded shrink-0 ring-1",
        className,
        {
          "opacity-50 cursor-not-allowed": props.disabled,
          "ring-agorium-700": !borderColor,
          "ring-red-600": borderColor === "danger",
          "ring-emerald-600": borderColor === "success",
        }
      )}
      onClick={onChange}
      {...props}
    >
      <CheckboxPrimitive.CheckboxIndicator>
        <MdCheck
          className={clsx("size-6 rounded p-[3px]", {
            "bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-agorium-900":
              color === "primary",
            "bg-agorium-400 hover:bg-agorium-300 active:bg-agorium-200 text-agorium-900":
              color === "secondary",
            "bg-agorium-700 hover:bg-agorium-700 active:bg-agorium-500 text-agorium-50":
              color === "tertiary",
            "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-agorium-900":
              color === "success",
            "bg-red-600 hover:bg-red-700 active:bg-red-800 text-agorium-900":
              color === "danger",
            "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-agorium-900":
              color === "info",
            "bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-agorium-900":
              color === "warning",
          })}
        />
      </CheckboxPrimitive.CheckboxIndicator>
    </CheckboxPrimitive.Root>
  );
}
