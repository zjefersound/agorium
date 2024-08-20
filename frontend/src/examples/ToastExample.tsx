import { Button } from "../components/ui/Button";
import { ToastProvider } from "../contexts/ToastContext";
import { useToast } from "../hooks/useToast";

function ToastUsageExample() {
  const { launchToast } = useToast();

  const handleCreateProduct = async () => {
    const createProduct = () => Promise.resolve(null);
    return createProduct().then(() => {
      launchToast({
        title: "Product created",
        description: "Product has been created successfully",
        color: "success",
        actionText: "Undo",
        onActionClick: () => alert("Undo create product"),
        duration: 1000,
      });
    });
  };

  return (
    <div className="flex h-dvh items-center justify-center">
      <Button onClick={handleCreateProduct}>Create product</Button>
    </div>
  );
}

export function ToastExample() {
  return (
    <ToastProvider>
      <ToastUsageExample />
    </ToastProvider>
  );
}
