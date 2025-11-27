import { Controller, useFormContext } from "react-hook-form";
import { BadgeAlert, ChevronDown } from "lucide-react";

interface DropdownInputProps {
  name: string;
  label: string;
  placeholder?: string;
  options: { label: string | number; value: string | number }[];
}

const DropdownInput = ({ name, label, placeholder, options }: DropdownInputProps) => {
  const { control, formState } = useFormContext();
  const error = formState.errors[name]?.message as string | undefined;

  const variant: "primary" | "error" = error ? "error" : "primary";


  return (
    <div className="space-y-1">
      <label className="text-font font-medium">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <select
              className={`w-full cursor-pointer h-10 px-3 py-2 text-font bg-surface rounded-md appearance-none text-sm transition-all duration-150 ease-in-out focus:outline-none border focus:ring-2 p-1 
    ${variant === "error"
                  ? "border-toastErrorText focus:ring-toastErrorText"
                  : "border-inputBorder focus:ring-primary"
                }    
  `}
              value={field.value ?? ""}
              onChange={(e) => {
                const val = e.target.value;

                // Convert number-like values into real numbers
                if (!isNaN(Number(val))) {
                  field.onChange(Number(val));
                } else {
                  field.onChange(val);
                }
              }}
            >
              {placeholder && (
                <option value="" disabled hidden className="text-muted">
                  {placeholder}
                </option>
              )}
              {options.map((op) => (
                <option className="text-font bg-bg" key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
          </div>
        )}
      />

      {error && (
        <p className="errorText flex items-center gap-1 text-xs">
          <BadgeAlert size={14} /> {error}
        </p>
      )}
    </div>
  );
};

export default DropdownInput;
