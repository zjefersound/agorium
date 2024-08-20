import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CheckLabel } from "./atoms/CheckLabel";
import React, { LegacyRef } from "react";
import clsx from "clsx";

export interface RadioGroupRootProps
  extends Omit<
    RadioGroupPrimitive.RadioGroupProps,
    "onValueChange" | "onChange"
  > {
  borderColor?: "danger" | "success";
  onChange: (value: string) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
function RadioGroupRoot({
  children,
  borderColor,
  className,
  onChange,
  ...props
}: RadioGroupRootProps) {
  return (
    <RadioGroupPrimitive.Root
      className={clsx("space-y-2", className, {
        "opacity-50 [&>*>*]:cursor-not-allowed": props.disabled,
        "[&>*>*]:ring-red-600 first:[&>*>*]:ring-1": borderColor === "danger",
        "[&>*>*]:ring-emerald-600 first:[&>*>*]:ring-1": borderColor === "success",
      })}
      {...props}
      onValueChange={onChange}
      role="radiogroup"
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
}
RadioGroupRoot.displayName = "RadioGroup.Root";

// eslint-disable-next-line react-refresh/only-export-components
const RadioGroupItem = React.forwardRef(
  (
    { children, ...props }: Omit<RadioGroupPrimitive.RadioGroupItemProps, "id">,
    forwardedRef
  ) => {
    return (
      <div className="flex">
        <RadioGroupPrimitive.Item
          className="bg-white size-6 ring-1 ring-slate-300 rounded-full"
          {...props}
          id={props.value}
          ref={forwardedRef as LegacyRef<HTMLButtonElement>}
          role="radio"
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full after:content-[''] after:block after:size-3 after:rounded-[50%] after:bg-slate-900" />
        </RadioGroupPrimitive.Item>

        <CheckLabel htmlFor={props.value}>{children}</CheckLabel>
      </div>
    );
  }
);
RadioGroupItem.displayName = "RadioGroup.Item";

export const RadioGroup = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
};
