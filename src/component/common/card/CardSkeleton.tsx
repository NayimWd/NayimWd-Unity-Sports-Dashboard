import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import cn from "../../../utils/cn";


const skeletonVariants = cva(
    "relative overflow-hidden rounded-lg border text-font animate-pulse min-w-64 max-w-sm",
    {
        variants: {
            variant: {
                Base: "bg-surface border-border",
                Team: "bg-subSurface hover:bg-surface",
                Player: "bg-surface border border-border",
                Tournament: "bg-gradient-to-br from-bg to-surface",
                match: "bg-gradient-to-br from-subSurface to-surface",
                Blog: "bg-surface border-border hover:shadow-md",
                venue: "bg-gradient-to-br from-primary to-secondary border border-primary",
            },
            size: {
                sm: "p-3",
                md: "p-5",
                lg: "p-6",
            },
        },
        defaultVariants: {
            variant: "Base",
            size: "md",
        },
    }
);

interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
    children?: ReactNode;
    className?: string;
};

const CardSkeleton = ({ children, className, variant, size }: SkeletonProps) => {
    return (
        <div className={cn(skeletonVariants({ variant, size }), className)}>
            {children}
        </div>
    )
};

interface skeletonSubProps {
    className?: string;
};

const SkeletonImage = ({ className }: skeletonSubProps) => {
    return (
        <div
            className={cn("w-full h-48 rounded-md bg-border", className)}
        />
    )
};

const SkeletonContent = ({ className }: skeletonSubProps) => {
    return (
        <div className={cn("mt-3 flex flex-col gap-2", className)}>
            <div className="w-3/4 h-4 rounded bg-border" />
            <div className="w-full h-3 rounded bg-border" />
            <div className="w-5/6 h-3 rounded bg-border" />
        </div>
    )
};

const SkeletonFooter = ({ className }: skeletonSubProps) => {
    return (
        <div
            className={cn(
                "mt-4 flex items-center justify-between border-t border-border pt-3",
                className
            )}
        >
            <div className="w-20 h-4 rounded bg-border" />
            <div className="w-14 h-4 rounded bg-border" />
        </div>
    )
};


CardSkeleton.Image = SkeletonImage;
CardSkeleton.Content = SkeletonContent;
CardSkeleton.Footer = SkeletonFooter;

export default CardSkeleton;