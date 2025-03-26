import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import cn from "../../utils/cn";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonvariants> {
  children: ReactNode;
}

const Buttons: FC<ButtonProps> = ({
  children,
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <>
      <button
        className={cn(buttonvariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default Buttons;

const buttonvariants = cva("", {
  variants: {
    variant: {
      primary: "",
      secondary: "",
      danger: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
