import { cva, VariantProps } from "class-variance-authority";
import cn from "../../utils/cn";
import { ReactNode } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium select-none tracking-wide transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-surface text-font border border-border hover:bg-subSurface/60",

        primary:
          "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15",

        success:
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/15",

        warning:
          "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/15",

        error:
          "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15",

        info:
          "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/15",

        outline:
          "bg-transparent text-font border border-border hover:bg-surface/60",

        ghost:
          "bg-transparent text-font border border-transparent hover:bg-surface/50",
      },

      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },

      rounded: {
        sm: "rounded",
        md: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof badgeVariants> {
  icon?: ReactNode;
}

const Badge = ({
  className,
  variant,
  size,
  rounded,
  icon,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    >
      {icon && (
        <span className="flex-shrink-0 text-[1.15em] leading-none opacity-90">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;