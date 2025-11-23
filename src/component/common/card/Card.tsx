import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import cn from "../../../utils/cn";

const cardVariants = cva("relative overflow-hidden rounded-lg  text-font transition-colors duration-100 w-full max-w-sm", {
  variants: {
    variant: {
      Base: "bg-surface border border-border shadow-sm hover:shadow-md hover:border-subSurface",
      Team: "bg-surface border border-border shadow-sm hover:shadow-lg hover:border-blue-400",
      Player: "bg-surface border border-border shadow-md hover:shadow-xl hover:border-blue-400",
      Tournament:
        "bg-gradient-to-br from-bg via-surface to-subSurface border border-border shadow-lg hover:shadow-2xl",
      match:
        "bg-gradient-to-br from-subSurface to-surface border border-surface shadow-md hover:shadow-xl hover:border-blue-500",
      Blog: "bg-surface border border-border shadow-sm hover:shadow-lg hover:border-muted",
      venue:
        "bg-gradient-to-br from-blue-200 to-blue-400 border border-surface shadow-lg hover:shadow-2xl text-white",
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
  <div className={cn("absolute top-2 left-2 right-2 z-10 flex items-center justify-between gap-2", className)}>
    {children}
  </div>
);

const CardTag = ({ children, className }: CardSubProps) => (
  <div className={cn(className, "")}>
    {children}
  </div>
);

interface CardImgProps {
  children?: ReactNode,
  src: string;
  alt?: string;
  className?: string;
};

const CardImage = ({ src, alt = "", children, className }: CardImgProps) => (
  <div className={cn("relative w-full overflow-hidden rounded-t-md", className)}>
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
  <h3 className={cn("text-lg font-semibold leading-tight tracking-tight text-font", className)}>
    {children}
  </h3>
);

const CardDescription = ({ children, className }: CardSubProps) => (
  <p className={cn("text-sm leading-relaxed text-subtext line-clamp-3", className)}>{children}</p>
);

const CardFooter = ({ children, className }: CardSubProps) => (
  <div className={cn("p-4 border-t border-border flex items-center justify-between gap-3", className)}>
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