import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  tabIndex?: number;
}
export function Card({ children, className, tabIndex }: Props) {
  return (
    <div
      className={clsx(
        "bg-agorium-800 border-[1px] border-agorium-700 p-4 md:p-6 rounded-md",
        className,
      )}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
}
