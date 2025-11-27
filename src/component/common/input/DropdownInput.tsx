import { BadgeAlert, ChevronDown } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface DropdownOptions {
  label: string;
  value: string | number;
}

interface DropdownInputProps {
  name: string;
  label: string;
  placeholder?: string;
  options: DropdownOptions[];
  icon?: React.ReactNode;
}

const DropdownInput = ({
  name,
  label,
  placeholder = "Select an option",
  options,
  icon,
}: DropdownInputProps) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  const error = errors[name]?.message as string | undefined;

  const variant: "primary" | "error" = error ? "error" : "primary";

  return (
    <div className="">
      <label className="block font-medium text-font mb-1" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          {...register(name)}
          className={`w-full cursor-pointer h-10 px-3 py-2 text-font bg-surface rounded-md appearance-none text-sm transition-all duration-150 ease-in-out focus:outline-none border focus:ring-2 p-1 
    ${variant === "error"
              ? "border-toastErrorText focus:ring-toastErrorText"
              : "border-inputBorder focus:ring-primary"
            }    
  `}
        >
          <option value="" disabled hidden className="text-muted">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              className="text-font bg-bg"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        {/* optional icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        )}
        {/*Dropdown arrow*/}
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted"
        />
      </div>
      {error && <p className="errorText flex items-center justify-center gap-1"> <BadgeAlert size={14} /> {error}</p>
      }
    </div>
  );
};

export default DropdownInput;
