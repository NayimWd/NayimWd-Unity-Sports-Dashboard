import { cva, VariantProps } from "class-variance-authority"
import { ReactNode } from "react"
import cn from "../../../utils/cn"

interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode,
  className?: string
}

const Card = ({ children, className, variant, size }: CardProps) => {
  return (
    <div className={cn(cardVariants({ variant, size, className }))}>
      {children}
    </div>
  )
}

const cardVariants = cva("rounded-lg border text-font transition-colors", {
  variants: {
    variant: {
      Base: "bg-surface border-border",
      Team: "bg-subSurface hover:bg-surface",
      Player: "bg-surface border border-border",
      Tournament: "bg-gradient-to-br from-bg to-surface",
      match: "bg-gradient-to-br from-subSurface to-surface",
      Blog: "bg-surface border-border hover:shadow-md"
    },
    size: {
      sm: "p-3",
      md: "p-5",
      lg: "p-6",
    },
    defaultVariants: {
      variant: "base",
      size: "md"
    }
  }
}) 

export default Card;