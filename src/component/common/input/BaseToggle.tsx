import { cva, VariantProps } from "class-variance-authority";
import cn from "../../../utils/cn";

interface BaseToggleProps extends VariantProps<typeof toggleStyles> {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

const BaseToggle = ({ checked, onChange, disabled, variant }: BaseToggleProps) => {

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            aria-label="check"
            className={cn(toggleStyles({ checked, variant }), "focus:ring-2 focus:ring-offset-2 focus:ring-primary")}
            onClick={() => onChange(!checked)}
        >
            <span
                className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out",
                    checked ? "translate-x-6" : "translate-x-1"
                )}
            >

            </span>
        </button>
    )
}

export default BaseToggle;

const toggleStyles = cva(
    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none",
    {
        variants: {
            variant: {
                primary: "bg-inputBorder",
                success: "bg-green-500",
                error: "bg-red-500",
            },
            checked: {
                true: "bg-primary",
                false: "",
            },
        },
        compoundVariants: [
            {
                checked: true,
                variant: "primary",
                className: "bg-primary",
            },
            {
                checked: false,
                variant: "primary",
                className: "bg-inputBorder",
            },
            {
                checked: true,
                variant: "success",
                className: "bg-green-500",
            },
            {
                checked: true,
                variant: "error",
                className: "bg-red-500",
            },
        ],
        defaultVariants: {
            variant: "primary",
            checked: false,
        },
    }
);