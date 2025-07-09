import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import cn from "../../../utils/cn";
import { baseModal } from "./baseModal";


interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "default" | "info" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "default",
  size = "md",
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <Dialog.Content className={baseModal({ variant, size })}>
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            {title && (
              <Dialog.Title className="text-lg font-semibold text-font">
                {title}
              </Dialog.Title>
            )}
            <Dialog.Close asChild>
              <button className="text-subtext hover:text-font transition">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Description */}
          {description && (
            <Dialog.Description className="text-sm text-subtext mb-4">
              {description}
            </Dialog.Description>
          )}

          {/* Body */}
          {children}

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-sm rounded-md border border-border text-font hover:bg-subSurface transition">
                {cancelText}
              </button>
            </Dialog.Close>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={cn(
                "px-4 py-2 text-sm rounded-md text-white bg-primary hover:bg-primaryHover transition",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? "Processing..." : confirmText}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;