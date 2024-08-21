import { ReactNode } from "react";

interface Props {
  /**
   * Field id
   */
  id?: string;
  /**
   * Label contents
   */
  children: ReactNode;
}
export function Label({ id, children }: Props) {
  return (
    <label htmlFor={id} className="flex text-sm mb-1 text-agorium-400">
      {children}
    </label>
  );
}