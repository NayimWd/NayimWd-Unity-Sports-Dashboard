import { cva, VariantProps } from "class-variance-authority"
import cn from "../../utils/cn"
import { ReactNode } from "react"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-surface text-font border-transparent hover:opacity-90",
        success:
          "bg-green-400/30 text-green-500 border border-green-400",
        warning:
          "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30",
        error:
          "bg-red-500/30 text-red-500 border border-red-500/40",
        outline:
          "bg-transparent text-font border-border hover:bg-surface",
        ghost:
          "bg-transparent text-font border-transparent hover:bg-surface",
        info:
          "bg-blue-500/15 text-blue-500 border border-blue-500/30",
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