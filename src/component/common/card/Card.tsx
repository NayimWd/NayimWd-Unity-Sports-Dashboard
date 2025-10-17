import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import cn from "../../../utils/cn";

const cardVariants = cva("relative overflow-hidden rounded-lg border text-font transition-colors duration-100", {
  variants: {
    variant: {
      Base: "bg-surface border-border",
      Team: "bg-subSurface hover:bg-surface",
      Player: "bg-surface border border-border",
      Tournament: "bg-gradient-to-br from-bg to-surface",
      match: "bg-gradient-to-br from-subSurface to-surface",
      Blog: "bg-surface border-border hover:shadow-md",
      venue: "bg-gradient-to-br from-primary to-secondary border border-primary hover:scale-[1.01]",
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
});

interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode,
  className?: string
};

const Card = ({ children, className, variant, size }: CardProps) => {
  return (
    <div className={cn(cardVariants({ variant, size, className }))}>
      {children}
    </div>
  )
};

interface CardSubProps {
  children: ReactNode;
  className?: string;
};

const CardTags = ({ children, className }: CardSubProps) => (
  <div className={cn(className, "absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2")}>
    {children}
  </div>
);

const CardTag = ({ children, className }: CardSubProps) => (
  <div className={cn(className, "rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary shadow")}>
    {children}
  </div>
);

interface CardImgProps extends CardSubProps {
  src: string;
  alt?: string;
};

const CardImage = ({ src, alt = "", children, className }: CardImgProps) => (
  <div className={cn("relative w-full overflow-hidden rounded-t-lg", className)}>
    <img
      src={src}
      alt={alt}
      className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
    />
    {children}
  </div>
);

const CardContent = ({ children, className }: CardSubProps) => (
  <div className={cn(className, "p-4 flex flex-col gap-2")}>
    {children}
  </div>
);

const CardTitle = ({ children, className }: CardSubProps) => (
  <h3 className={cn("text-lg font-semibold leading-tight", className)}>
    {children}
  </h3>
);

const CardDescription = ({ children, className }: CardSubProps) => (
  <p className={cn("text-sm text-muted-foreground line-clamp-3", className)}>{children}</p>
);

const CardFooter = ({ children, className }: CardSubProps) => (
  <div className={cn("p-4 border-t border-border flex items-center justify-between", className)}>
    {children}
  </div>
);


Card.Image = CardImage;
Card.Tags = CardTags;
Card.Tag = CardTag;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Footer = CardFooter;

export default Card;