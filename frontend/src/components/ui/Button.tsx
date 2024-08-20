import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef, LegacyRef, ReactNode } from "react";
import { SemanticColor } from "../../models/semanticColor";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * What background color to use
   */
  color?: SemanticColor;
  /**
   * Html button type
   */
  behavior?: "button" | "submit" | "reset";
  /**
   * Button contents
   */
  children: ReactNode;
  /**
   * Optional click handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Optional classes (TW won't appear on storybook)
   */
  className?: string;
  /**
   * Optional disabled behavior
   */
  disabled?: boolean;
}
/**
 * Primary UI component for user interaction
 */
export const Button = forwardRef(
  (
    {
      color = "primary",
      children,
      onClick,
      className,
      behavior,
      ...props
    }: ButtonProps,
    forwardedRef
  ) => {
    return (
      <button
        ref={forwardedRef as LegacyRef<HTMLButtonElement>}
        className={clsx(
          "rounded-md flex items-center py-2.5 px-3.5 text-sm leading-5 font-semibold transition space-x-2.5",
          "disabled:opacity-50 disabled:pointer-events-none select-none",
          className,
          {
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
            "bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white":
              color === "warning",
            "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white":
              color === "info",
          }
        )}
        type={behavior}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
