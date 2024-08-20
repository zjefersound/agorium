import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement>{
  className?: string;
  children?: ReactNode;
}

export function Skeleton({ className, children, ...rest}: Props) {
  return (
    <div
      {...rest}
      role="status"
      className= {`flex items-center justify-center bg-slate-200 rounded animate-pulse ${className}`}
    >
      {children}
      <span className="sr-only">Loading...</span>
    </div>
  );
}