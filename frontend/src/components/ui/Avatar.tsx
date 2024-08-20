import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { getInitials } from "../../utils/getInitials";
import clsx from "clsx";

interface Props extends AvatarPrimitive.AvatarProps {
  name: string;
  url?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}
export function Avatar({ name, url, size = "sm", ...rest }: Props) {
  return (
    <AvatarPrimitive.Root
      {...rest}
      className={clsx(
        "inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle",
        {
          "h-10 w-10": size === "sm",
          "h-14 w-14": size === "md",
          "h-[70px] w-[70px]": size === "lg",
          "h-[128px] w-[128px]": size === "xl",
          "h-[200px] w-[200px]": size === "2xl",
          "w-full aspect-square": size === "full",
        }
      )}
    >
      <AvatarPrimitive.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={url}
        alt={name}
      />
      <AvatarPrimitive.Fallback
        className=" text-white leading-1 flex h-full w-full items-center justify-center bg-slate-500 text-sm font-semibold"
        delayMs={600}
      >
        {getInitials(name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
