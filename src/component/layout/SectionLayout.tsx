import { cva, VariantProps } from 'class-variance-authority'
import React from 'react';
import cn from '../../utils/cn';

const sectionVariants = cva(
    "rounded-xl w-full transition-colors duration-200 my-4 md:my-5 lg:my-6",
    {
        variants: {
            variant: {
                surface: "bg-surface",
                subSurface: "bg-subSurface",
                plain: "bg-transparent",
            },
            shadow: {
                none: "",
                sm: "shadow-sm",
                md: "shadow-md",
                lg: "shadow-lg",
            },
            border: {
                none: "",
                subtle: "border border-gray-300/30 dark:border-none",
                strong: "border border-border",
            },
            density: {
                normal: "px-4 sm:px-5 lg:px-6 py-10 space-y-3 sm:space-y-4 lg:space-y-5",
                dense: "p-3 space-y-2",
                relaxed: "p-7 space-y-6",
            },
        },
        defaultVariants: {
            variant: "surface",
            shadow: "sm",
            border: "subtle",
            density: "normal",
        },
    }
);

interface SectionProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {
    children: React.ReactNode;
    className?: string;
}

const SectionLayout = ({ children, className, variant, shadow, border, density }: SectionProps) => {
    return (
        <section className={cn(sectionVariants({ variant, shadow, border, density }), className)}>
            {children}
        </section>
    )
}

export default SectionLayout;