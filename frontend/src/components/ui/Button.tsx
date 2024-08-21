import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef, LegacyRef, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * What background color to use
   */
  color?: "primary" | "secondary" | "success" | "danger";
  /**
   * Button size
   */
  size?: "sm" | "md";
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
      size = "md",
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
          "rounded-md flex items-center text-sm leading-5 font-semibold transition",
          "disabled:opacity-50 disabled:pointer-events-none select-none",
          className,
          {
            "h-10 px-4": size === "md",
            "h-8 px-3": size === "sm",
            "bg-amber-100 hover:opacity-90 active:bg-amber-50 text-agorium-900":
              color === "primary",
            "bg-agorium-700 hover:bg-agorium-600 active:bg-agorium-500 text-amber-100 ring-agorium-600 ring-1":
              color === "secondary",
            "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-agorium-900":
              color === "success",
            "bg-red-600 hover:bg-red-700 active:bg-red-800 text-agorium-900":
              color === "danger",
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
