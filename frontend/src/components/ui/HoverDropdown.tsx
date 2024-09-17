import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef, LegacyRef, ReactNode } from "react";

interface HoverDropdownRootProps {
  children: ReactNode;
}
function HoverDropdownRoot({ children }: HoverDropdownRootProps) {
  return <div className="relative group flex flex-row-reverse">{children}</div>;
}
interface HoverDropdownTriggerProps {
  children: ReactNode;
}
function HoverDropdownTrigger({ children }: HoverDropdownTriggerProps) {
  return <div>{children}</div>;
}

interface HoverDropdownButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const HoverDropdownButton = forwardRef(
  (
    { children, className, ...restProps }: HoverDropdownButtonProps,
    forwardedRef: LegacyRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={forwardedRef}
        className={clsx(
          "flex hover:bg-agorium-700 w-full rounded p-1",
          className,
        )}
        {...restProps}
      >
        {children}
      </button>
    );
  },
);

interface HoverDropdownContentProps {
  children: ReactNode;
  className?: string;
  placement?: "right" | "center" | "left";
}
function HoverDropdownContent({
  children,
  className,
  placement = "right",
}: HoverDropdownContentProps) {
  return (
    <div
      className={clsx(
        "absolute",
        "transition-[.5s]",
        "opacity-0 pointer-events-none",
        "group-hover:opacity-100 group-hover:pointer-events-auto",
        className,
      )}
    >
      <svg
        className={clsx(
          "styles_Arrow__vmR9C block rotate-180 mt-3 fill-agorium-700",
          {
            "ml-auto mr-2": placement === "right",
            "mx-auto": placement === "center",
            "mr-auto ml-2": placement === "left",
          },
        )}
        width="10"
        height="5"
        viewBox="0 0 30 10"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 30,0 15,10"></polygon>
      </svg>
      <div
        className={clsx(
          "bg-agorium-800 ring-1 ring-agorium-700 rounded-md p-2 shadow-lg flex flex-col",
          "space-y-1",
          "shadow-[0px_10px_38px_-10px_rgba(0,_0,_0,_0.4),_0px_8px_16px_-15px_rgba(22,_23,_24,_0.9)]",
        )}
      >
        {children}
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const HoverDropdown = {
  Root: HoverDropdownRoot,
  Trigger: HoverDropdownTrigger,
  Content: HoverDropdownContent,
  Button: HoverDropdownButton,
};
