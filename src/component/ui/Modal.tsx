import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import cn from "../../utils/cn";


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
  isLoading,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-full max-w-md rounded-2xl p-6 shadow-xl z-50",
            "bg-surface border border-border transition-all duration-300 ease-out",
            "focus:outline-none"
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            {title && (
              <Dialog.Title className="text-lg font-semibold text-font">
                {title}
              </Dialog.Title>
            )}
            <Dialog.Close asChild>
              <button
                className="text-subtext hover:text-font transition-colors"
                aria-label="Close modal"
              >
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
          <div>{children}</div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-sm text-font border border-inputBorder bg-bg hover:bg-subSurface transition"
              >
                {cancelText}
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primaryHover transition",
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