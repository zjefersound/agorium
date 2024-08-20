import React, { LegacyRef, ReactNode } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import clsx from "clsx";
import { RxCheck, RxChevronDown, RxChevronUp } from "react-icons/rx";
import { InputRoot } from "./atoms/InputRoot";

export interface SelectRootProps
  extends Omit<SelectPrimitive.SelectProps, "autoComplete" | "onValueChange"> {
  children: ReactNode;
  placeholder?: string;
  defaultValue?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  borderColor?: "success" | "danger";
}

// eslint-disable-next-line react-refresh/only-export-components
const SelectRoot = ({
  value,
  defaultValue,
  children,
  placeholder,
  onChange,
  required,
  disabled,
  borderColor,
  ...props
}: SelectRootProps) => (
  <SelectPrimitive.Root
    defaultValue={defaultValue}
    value={value}
    onValueChange={(value) => onChange(value === null ? "" : value)}
    required={required}
    disabled={disabled}
    {...props}
  >
    <InputRoot className="h-10 w-full" borderColor={borderColor}>
      <SelectPrimitive.Trigger className="outline-0 bg-transparent flex-1 flex items-center space-x-2 text-slate-900 text-sm data-[placeholder]:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed">
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="text-slate-500">
          <RxChevronDown />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </InputRoot>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="z-50 overflow-hidden bg-white border rounded shadow-[0px_10px_38px_-10px_rgba(0,_0,_0,_0.4),_0px_8px_16px_-15px_rgba(22,_23,_24,_0.2)]">
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-slate-300 cursor-default">
          <RxChevronUp />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-slate-300 cursor-default">
          <RxChevronDown />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);
SelectRoot.displayName = "Select.Root";

// eslint-disable-next-line react-refresh/only-export-components
const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>,
    forwardedRef
  ) => {
    return (
      <SelectPrimitive.Item
        className={clsx(
          "text-[13px] cursor-pointer leading-none text-slate-500 rounded-md flex items-center h-10 pr-9 pl-6 relative select-none data-[disabled]:text-slate-300 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-slate-100 data-[highlighted]:text-slate-900",
          className
        )}
        {...props}
        ref={forwardedRef as LegacyRef<HTMLDivElement>}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <RxCheck />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  }
);
SelectItem.displayName = "Select.Item";

export const Select = {
  Root: SelectRoot,
  Item: SelectItem,
};
