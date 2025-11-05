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
        className={cn(buttonvariants({ variant, size, className }))}
        {...props}
        disabled={props.disabled}
        aria-busy={loading}
        aria-disabled={loading || props.disabled}
      >
        {/*  Loading overrides everything */}
        {loading ? (
          <span className="animate-spin rounded-full border-2 border-font border-t-transparent h-4 w-4" />
        ) : (
          <span className="flex items-center justify-center gap-2">
            {iconLeft && <span className="inline-flex">{iconLeft}</span>}
            <span>{children}</span>
            {iconRight && <span className="inline-flex">{iconRight}</span>}
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
      secondary: "bg-subSurface hover:brightness-90 text-white",
      danger: "bg-toastErrorText hover:bg-[#c41d1d] text-white",
      outline: "border border-border text-white dark:text-border dark:hover:text-white  hover:bg-subSurface",
      ghost: "bg-transparent text-gray-700 dark:hover:text-white hover:bg-subSurface",
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
