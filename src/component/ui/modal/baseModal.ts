import { cva } from "class-variance-authority";

export const baseModal = cva(
    "fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-xl z-50 bg-surface border border-border focus:outline-none transition-all duration-300 ease-out",
  {
    variants: {
      size: {
        sm: "w-[90%] max-w-sm p-4",
        md: "w-[90%] max-w-md p-6",
        lg: "w-[90%] max-w-2xl p-8",
        xl: "w-[90%] max-w-4xl p-10",
      },
      variant: {
        default: "",
        info: "border-primary",
        danger: "border-toastErrorText",
        success: "border-toastSuccessText",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)