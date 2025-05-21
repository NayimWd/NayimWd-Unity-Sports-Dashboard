import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import BaseToggle from "./BaseToggle";

interface toggleInputProps {
    name: string;
    label: string;
    disabled?: boolean;
}

const ToggleInput = ({ name, label, disabled }: toggleInputProps) => {
    const { watch, setValue, formState, trigger, register } = useFormContext();
    const { errors } = formState;

    const [focused, setFocused] = useState(false);
    const checked = watch(name);

    const error = errors[name]?.message as string || undefined;

    // dynamic variant 
    let variant: "primary" | "success" | "error" = "primary";

    if (focused) {
        variant = error ? "error" : "success"
    };

    useEffect(() => {
        if (focused) {
            trigger(name);
        }
    }, [checked, focused])

    return (
        <div className="space-y-1">
            <label htmlFor={name} className="text-font font-medium">
                {label}
            </label>
            <div
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="flex items-center space-x-3"
            >
                <BaseToggle
                    checked={!!checked}
                    onChange={(val) => setValue(name, val)}
                    variant={variant}
                    disabled={disabled}
                />
                <input type="hidden" {...register(name)} />
            </div>
            {error && <p className="errorText">{error}</p>}
        </div>
    )
}

export default ToggleInput