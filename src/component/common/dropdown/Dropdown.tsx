import { createContext, ReactNode, useContext, useRef, useState } from "react";
import useClickOutSide from "../../../hooks/useClickOutSide";
import cn from "../../../utils/cn";

interface DropDownContextProps {
    open: boolean;
    toggle: () => void;
    close: () => void;
    align?: "left" | "right"
};

// dropdown context 
const DropDownContext = createContext<DropDownContextProps | null>(null);

// use context 
function useDropdownContext() {
    const context = useContext(DropDownContext);
    if (!context) throw new Error("Dropdown children must be used within <Dropdown>");
    return context
}

interface DropDownProps {
    children: ReactNode;
    align?: "left" | "right";
};


const Dropdown = ({ children, align = "left" }: DropDownProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null!);

    const toggle = () => setOpen((prev: boolean) => !prev);
    const close = () => setOpen(false);

    // close on outside click
    useClickOutSide(ref, () => close());

    return (
        <DropDownContext.Provider value={{ open, toggle, align, close }}>
            <div ref={ref}>
                {children}
            </div>
        </DropDownContext.Provider>
    );
};

interface TriggerProps {
    children: ReactNode;
    className?: string;
}

function DropdownTrigger({ children, className }: TriggerProps) {
    const { toggle } = useDropdownContext();

    <button
        className={cn("px-3 py-2 bg-surface border border-border rounded-md", className)}
        onClick={toggle}
    >
        {children}
    </button>
};

interface MenuProps {
    children: ReactNode;
    className?: string;
};

function DropdownMenu({ children, className }: MenuProps) {

    const { open, align } = useDropdownContext();

    return open ? (
        <div
            className={cn(
                `absolute mt-2 min-w-[160px] rounded-md border border-border bg-surface shadow-lg`,
                align === "right" ? "right-0" : "left-0",
                className
            )}
        >
            {children}
        </div>
    ) : null;
};





export default Dropdown;