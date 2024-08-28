import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { getInitials } from "../../utils/getInitials";
import clsx from "clsx";
import { getAvatarURL } from "../../utils/getAvatarURL";
import { memo } from "react";

interface Props extends AvatarPrimitive.AvatarProps {
  name: string;
  url?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}
function Avatar({ name, url, size = "sm", ...rest }: Props) {
  return (
    <AvatarPrimitive.Root
      {...rest}
      className={clsx(
        "inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle",
        {
          "h-5 w-5": size === "xs",
          "h-9 w-9": size === "sm",
          "h-10 w-10": size === "md",
          "h-[70px] w-[70px]": size === "lg",
          "h-[128px] w-[128px]": size === "xl",
          "h-[200px] w-[200px]": size === "2xl",
          "w-full aspect-square": size === "full",
        },
      )}
    >
      <AvatarPrimitive.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={url ? getAvatarURL(url) : undefined}
        alt={name}
      />
      <AvatarPrimitive.Fallback
        className={clsx(
          "text-agorium-900 leading-1 flex h-full w-full items-center justify-center bg-agorium-400 font-semibold",
          {
            "text-xs": size === "xs",
            "text-sm": size !== "xs",
          },
        )}
        delayMs={600}
      >
        {getInitials(name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
const MemoizedAvatar = memo(Avatar);
export { MemoizedAvatar as Avatar };
