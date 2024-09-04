import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
  title: string;
  description: string;
  confirmText: string;
  confirmColor?: "danger" | "primary" | "success" | "secondary";
  onConfirm: () => void;
}

export function AlertDialog({
  children,
  title,
  description,
  confirmText,
  onConfirm,
  confirmColor = "danger",
}: Props) {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger asChild>
        {children}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="z-40 bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialogPrimitive.Content className="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[calc(100%-1.5rem)] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-agorium-800 ring-1 ring-agorium-700 p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialogPrimitive.Title className="m-0 text-lg text-agorium-50 font-bold">
            {title}
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="text-agorium-400 mt-4 mb-5 text-sm">
            {description}
          </AlertDialogPrimitive.Description>
          <div className="flex justify-end space-x-3">
            <AlertDialogPrimitive.Cancel asChild>
              <Button color="secondary">Cancelar</Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button color={confirmColor} onClick={onConfirm}>
                {confirmText}
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
