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
    <label htmlFor={id} className="flex text-sm mb-1 text-slate-500">
      {children}
    </label>
  );
}