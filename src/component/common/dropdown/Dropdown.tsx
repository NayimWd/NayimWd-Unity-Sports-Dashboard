import { createContext, ReactNode, useContext, useRef, useState } from "react";
import useClickOutSide from "../../../hooks/useClickOutSide";
import cn from "../../../utils/cn";
import { Link } from "react-router-dom";

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
            <div ref={ref} className="relative inline-block text-left">
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
    const { toggle, open } = useDropdownContext();

    return <button
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
        className={cn("px-3 py-2 bg-surface border border-border rounded-md", className)}
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
            role="menu"
            tabIndex={-1}
            data-open={open}
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


interface DropdownItemProps {
    children: ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
}

function DropdownItem({ children, onClick, href, className }: DropdownItemProps) {
    const { close } = useDropdownContext();

    const handleClick = () => {
        if (onClick) {
            onClick()
        }
        close();
    }

    if (href) {
        return (
            <Link
                to={href}
                role="menuitem"
                tabIndex={0}
                onClick={handleClick}
                className={cn(
                    "block px-3 py-2 text-sm hover:bg-subtle rounded-md w-full text-left transition-colors",
                    className
                )}
            >
                {children}
            </Link>
        );
    }


    return (
        <button
            role="menuitem"
            tabIndex={0}
            onClick={handleClick}
            className={cn(
                "block px-3 py-2 text-sm hover:bg-subtle rounded-md w-full text-left transition-colors",
                className
            )}
        >
            {children}
        </button>
    );

}

function DropdownSeparator() {
    return <div className="border-t border-border my-1" />;
};

interface FooterProps {
    children: ReactNode;
    className?: string;
}

function DropdownFooter({ children, className }: FooterProps) {
    return <div className={cn("px-3 py-2 text-sm opacity-75", className)}>{children}</div>;
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;
Dropdown.Footer = DropdownFooter;


export default Dropdown;