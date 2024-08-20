import { InputHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { CurrencyInput as TextCurrencyInput } from "./CurrencyInput";
import { InputRoot, InputRootProps } from "./atoms/InputRoot";

export interface TextInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export interface TextInputRootProps extends InputRootProps {}

// eslint-disable-next-line react-refresh/only-export-components
function TextInputRoot({
  children,
  borderColor,
  className,
}: TextInputRootProps) {
  return (
    <InputRoot className={clsx("w-full", className)} borderColor={borderColor}>
      {children}
    </InputRoot>
  );
}
TextInputRoot.displayName = "TextInput.Root";

export interface TextInputIconProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
function TextInputIcon({ children }: TextInputIconProps) {
  return <Slot className="w-5 h-5 text-slate-500">{children}</Slot>;
}
TextInputIcon.displayName = "TextInput.Icon";

// eslint-disable-next-line react-refresh/only-export-components
function TextInputInput(props: TextInputInputProps) {
  return (
    <input
      className="outline-0 bg-transparent flex-1 text-slate-900 text-sm placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    />
  );
}
TextInputInput.displayName = "TextInput.Input";

Object.assign(TextCurrencyInput, { displayName: "TextInput.CurrencyInput" });

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
  CurrencyInput: TextCurrencyInput,
};
