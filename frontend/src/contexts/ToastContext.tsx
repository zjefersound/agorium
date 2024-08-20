import { createContext, useMemo, useState } from "react";
import { Toast, ToastProps } from "../components/ui/Toast";

interface ToastProviderProps {
  children: React.ReactNode;
}

interface LauchToastProps extends Omit<ToastProps, "open" | "setOpen"> {}

export interface ToastContextType {
  launchToast: (props: LauchToastProps) => void;
}

export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType
);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastProps, setToastProps] = useState<Omit<ToastProps, "setOpen">>({
    open: false,
    color: "success",
    title: "",
    description: "",
    duration: 200,
  });

  const launchToast = (props: LauchToastProps) => {
    setToastProps({
      open: true,
      description: "",
      ...props,
    });
  };
  const values = useMemo(() => ({ launchToast }), []);

  return (
    <ToastContext.Provider value={values}>
      {children}
      <Toast
        {...toastProps}
        setOpen={(open) => setToastProps({ ...toastProps, open: open })}
      />
    </ToastContext.Provider>
  );
};
