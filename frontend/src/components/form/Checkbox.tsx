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
          "ring-slate-300": !borderColor,
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
            "bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white":
              color === "primary",
            "bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-white":
              color === "secondary",
            "bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-900":
              color === "tertiary",
            "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white":
              color === "success",
            "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white":
              color === "danger",
            "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white":
              color === "info",
            "bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white":
              color === "warning",
          })}
        />
      </CheckboxPrimitive.CheckboxIndicator>
    </CheckboxPrimitive.Root>
  );
}
