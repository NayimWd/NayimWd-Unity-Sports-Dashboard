import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "../../utils/cn";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonvariants> {
  children: ReactNode;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const Buttons = ({
  children,
  className,
  variant,
  size,
  iconLeft,
  iconRight,
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <>
      <button
        className={cn(
          buttonvariants({ variant, size }),
          "relative inline-flex items-center justify-center",
          loading && "cursor-not-allowed",
          className
        )}
        {...props}
        disabled={loading || props.disabled}
        aria-busy={loading}
        aria-disabled={loading || props.disabled}
      >
        {/* Keep content for width consistency */}
        <span
          className={cn(
            "flex items-center justify-center gap-2 transition-opacity duration-200",
            loading && "opacity-0"
          )}
        >
          {iconLeft && <span className="inline-flex">{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span className="inline-flex">{iconRight}</span>}
        </span>

        {/* Loading overlay */}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="text-sm">Processing...</span>
          </span>
        )}
      </button>
    </>
  );
};

export default Buttons;

const buttonvariants = cva("", {
  variants: {
    variant: {
      primary: "bg-primary hover:bg-primaryHover text-white",
      secondary: "bg-subSurface hover:brightness-90 text-font",
      danger: "bg-toastErrorText hover:bg-[#c41d1d] text-white",
      outline: "border border-border text-font  dark:hover:text-white  hover:bg-subSurface",
      ghost: "bg-transparent text-font dark:hover:text-white hover:bg-subSurface",
      warning: "bg-secondary hover:brightness-90 text-white",
      gradient: "bg-gradient-primary text-white hover:opacity-90 bg-no-repeat bg-cover",
      gradientS: "bg-gradient-secondary to-l text-white hover:opacity-90 bg-no-repeat bg-cover",
      gradientD: "bg-gradient-bg text-white hover:opacity-90 to-r bg-no-repeat bg-cover",
    },
    size: {
      sm: "px-2 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-2.5 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
