import { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="py-1 px-2 text-agorium-300 bg-agorium-700 rounded text-xs">
      {children}
    </span>
  );
}
