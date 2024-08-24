import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
export function Layout({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "flex flex-1 flex-col text-agorium-50 overflow-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}
