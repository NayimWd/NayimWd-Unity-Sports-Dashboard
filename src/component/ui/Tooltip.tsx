import { ReactNode } from "react"
import cn from "../../utils/cn";

interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    className?: string;
    position?: "top" | "bottom" | "left" | "right"
}

const Tooltip = ({ content, children, className, position }: TooltipProps) => {

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    const arrowPosition = {
        top: "top-full left-1/2 -translate-x-1/2",
        bottom: "bottom-full left-1/2 -translate-x-1/2 rotate-180",
        left: "left-full top-1/2 -translate-y-1/2 -rotate-90",
        right: "right-full top-1/2 -translate-y-1/2 rotate-90",
    };
    return (
        <div className={cn(className, "relative group inline-block z-40")}>
            {children}
            <div className={cn(
                "pointer-events-none absolute z-10 hidden w-max group-hover:flex group-focus:flex flex-col items-center transition-all duration-200 opacity-0 group-hover:opacity-100 group-focus:opacity-100",
                positionClasses[position ? position : "top"],
                className
            )}>
                <div className="relative rounded bg-black px-2 py-1 text-xs text-white shadow-md p-2">
                    {content}
                    <div
                        className={cn(
                            "absolute w-2 h-2 bg-black rotate-45",
                            arrowPosition[position ? position : "top"]
                        )}
                    />

                </div>
            </div>
        </div>
    )
}

export default Tooltip