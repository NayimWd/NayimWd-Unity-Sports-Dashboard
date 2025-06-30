import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import BaseInput from "./BaseInput";
import { BadgeAlert, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  autoComplete?: string;
}

const PasswordInput = ({
  name,
  label,
  placeholder,
  icon,
  autoComplete
}: PasswordInputProps) => {
  const { register, watch, formState, trigger } = useFormContext();
  const { errors } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const value = watch(name);
  const error = errors[name]?.message as string | undefined;

  // dynamic border color
  let variant: "primary" | "success" | "error" = "primary";

  if (focused && value) {
    variant = error ? "error" : "success";
  }

  useEffect(() => {
    if (focused) {
      trigger(name);
    }
  }, [focused, value, name]);

  return (
    <div className=" space-y-2 relative">
      {/* input label */}
      <label
        htmlFor={name}
        className="block text-font font-medium "
        aria-details="Password label"
      >
        {label}
      </label>
      {/* Input and icon*/}
      <div className="relative">
        <BaseInput
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          variant={variant}
          icon={icon}
          autoComplete={autoComplete}
          {...register(name)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted focus:outline-none"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        {error && <p className="errorText flex items-center justify-center gap-1"> <BadgeAlert size={14} /> {error}</p>
        }
      </div>
    </div>
  );
};

export default PasswordInput;
