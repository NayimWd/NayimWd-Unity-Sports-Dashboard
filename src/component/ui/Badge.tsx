import { cva, VariantProps } from "class-variance-authority"
import cn from "../../utils/cn"
import { ReactNode } from "react"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-surface text-font border-transparent hover:opacity-90",
        success:
          "bg-green-500 text-green-100",
        warning:
          "bg-yellow-500 text-yellow-100",
        error:
          "bg-red-500 text-red-100",
        outline:
          "bg-transparent text-font border border-border hover:bg-surface",
        ghost:
          "bg-transparent text-font border border-transparent hover:bg-surface",
        info:
          "bg-blue-500 text-blue-100 border border-blue-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof badgeVariants> {
  icon?: ReactNode;
}

const Badge = ({ className, variant, icon, children, ...props }: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon && <span className="flex-shrink-0 text-[1em] leading-none">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge