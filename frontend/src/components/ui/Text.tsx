import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";

export interface TextProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: ReactNode;
  asChild?: boolean;
}

export function Text({ size = "md", className, children, asChild }: TextProps) {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={clsx(
        "text-agorium-400 font-sans",
        {
          "text-xs": size === "sm",
          "text-sm": size === "md",
          "text-md": size === "lg",
          "text-lg": size === "xl",
        },
        className,
      )}
    >
      {children}
    </Comp>
  );
}
