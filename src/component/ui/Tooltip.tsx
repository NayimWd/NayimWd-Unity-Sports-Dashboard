import { ReactNode } from "react"
import cn from "../../utils/cn";

interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    className?: string;
    position?: "top" | "bottom" | "left" | "right"
}

const Tooltip = ({ content, children, className, position = "top" }: TooltipProps) => {
    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <div className={cn("relative group inline-block z-40", className)}>
            {children}

            <div
                className={cn(
                    "pointer-events-none absolute hidden group-hover:flex group-focus:flex flex-col items-center",
                    "transition-opacity duration-200 opacity-0 group-hover:opacity-100 group-focus:opacity-100",
                    positionClasses[position]
                )}
            >
                <div className="relative rounded bg-inputBorder px-3 py-1.5 text-xs leading-tight text-font shadow-lg w-20  max-w-xs text-center">
                    {content}

                </div>
            </div>
        </div>
    );
};

export default Tooltip