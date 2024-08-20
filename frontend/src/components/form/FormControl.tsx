import { ReactNode } from "react";
import { FieldError } from "./FieldError";
import { Label } from "./Label";

export interface FormControlProps {
  /**
   * Field id
   */
  id: string;
  /**
   * Field label
   */
  label: string;
  /**
   * Is this field optional?
   */
  optional?: boolean;
  /**
   * Form input|select|checkbox...
   */
  children: ReactNode;
  /**
   * Error message
   */
  error?: string;
}
export function FormControl({
  id,
  label,
  optional,
  error,
  children,
}: FormControlProps) {
  return (
    <div>
      <Label id={id}>
        {label}:{" "}
        {optional && <span className="text-sm text-slate-500">(optional)</span>}
      </Label>
      {children}
      <FieldError message={error} />
    </div>
  );
}
