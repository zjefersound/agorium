import { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";

interface DialogRootProps {
  children: ReactNode;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}
export function DialogRoot({ children, onOpenChange, open }: DialogRootProps) {
  return (
    <DialogPrimitive.Root onOpenChange={onOpenChange} open={open}>
      {children}
    </DialogPrimitive.Root>
  );
}
DialogRoot.displayName = "Drawer.Root";

interface DialogTriggerProps {
  children: ReactNode;
}
export function DialogTrigger({ children }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>;
}
DialogTrigger.displayName = "Drawer.Trigger";

interface DialogContentProps {
  title: string;
  description: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}
export function DialogContent({
  title,
  description,
  children,
  size = "sm",
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="z-40 bg-[#000] opacity-50 fixed inset-0" />
      <DialogPrimitive.Content
        className={clsx(
          "z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] translate-x-[-50%] translate-y-[-50%] rounded-md focus:outline-none",
          "bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]",
          "w-[calc(100%-24px)]",
          {
            "max-w-[450px]": size === "sm",
            "max-w-[650px]": size === "md",
            "max-w-[1200px]": size === "lg",
          }
        )}
      >
        <DialogPrimitive.Title className="text-slate-900 mb-2 font-bold">
          {title}
        </DialogPrimitive.Title>
        <DialogPrimitive.Description
          className="mb-4 text-slate-500 text-sm font-sans"
          asChild
        >
          {description}
        </DialogPrimitive.Description>
        {children}
        <DialogPrimitive.Close asChild>
          <button
            className="text-slate-500 hover:bg-slate-100 focus:shadow-slate-100 absolute top-3 right-3 inline-flex size-6 appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <AiOutlineClose />
          </button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
DialogContent.displayName = "Drawer.Content";

// eslint-disable-next-line react-refresh/only-export-components
export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
};
