import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";

interface SliderProps
  extends Omit<
    SliderPrimitive.SliderProps,
    "className" | "children" | "onValueChange" | "onChange" | "asChild"
  > {
  height?: string;
  width?: string;
  required?: boolean;
  borderColor?: "danger" | "success";
  onChange?: (value: number[]) => void;
}

export function Slider({
  height,
  width,
  required,
  onChange,
  orientation = "horizontal",
  borderColor,
  ...props
}: SliderProps) {
  const numberOfThumbs = props.value?.length || props.defaultValue?.length || 1;
  return (
    <SliderPrimitive.Root
      {...props}
      onValueChange={onChange}
      className={clsx("relative flex items-center select-none touch-none", {
        "flex-col w-5": orientation === "vertical",
        "h-5": orientation === "horizontal",
        [`h-[${height}]`]: height,
        "h-80": !height && orientation === "vertical",
        "w-min": !width && orientation === "vertical",
        [`w-[${width}]`]: width,
        "w-80": !width && orientation === "horizontal",
        "opacity-50 [&>*>*]:cursor-not-allowed": props.disabled,
        "[&>*>*]:ring-red-600 first:[&>*>*]:ring-1": borderColor === "danger",
        "[&>*>*]:ring-emerald-600 first:[&>*>*]:ring-1": borderColor === "success",
      })}
      aria-required={required}
      orientation={orientation}
    >
      <SliderPrimitive.Track
        className={clsx("bg-slate-300 relative grow rounded-full", {
          "w-[3px]": orientation === "vertical",
          "h-[3px]": orientation === "horizontal",
        })}
      >
        <SliderPrimitive.Range
          className={clsx("absolute bg-slate-900 rounded-full", {
            "w-full": orientation === "vertical",
            "h-full": orientation === "horizontal",
          })}
        />
      </SliderPrimitive.Track>

      {Array(numberOfThumbs)
        .fill(0)
        .map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block size-5 rounded-full bg-slate-900 hover:bg-slate-800"
          />
        ))}
    </SliderPrimitive.Root>
  );
}
