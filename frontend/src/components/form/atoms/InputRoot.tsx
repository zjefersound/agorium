import clsx from "clsx";
import React, { LegacyRef, ReactNode } from "react";

export interface InputRootProps
  extends React.BaseHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  borderColor?: "danger" | "success";
}

export const InputRoot = React.forwardRef(
  (
    { children, className, borderColor, ...restProps }: InputRootProps,
    forwardedRef
  ) => {
    return (
      <div
        ref={forwardedRef as LegacyRef<HTMLDivElement>}
        className={clsx(
          `
        flex items-center space-x-2
        py-2.5 px-3 rounded-md
        ring-1
        bg-white
        text-sm
        text-slate-900
        focus-within:ring-2 focus-within:ring-slate-500
        placeholder:text-slate-500
      `,
          {
            "ring-slate-300": !borderColor,
            "ring-red-600": borderColor === "danger",
            "ring-emerald-600": borderColor === "success",
          },
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);
