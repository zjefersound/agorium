import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
export function Card({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "bg-agorium-800 border-[1px] border-agorium-700 p-4 md:p-6 rounded-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
