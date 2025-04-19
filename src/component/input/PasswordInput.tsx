import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import BaseInput from "./BaseInput";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
}

const PasswordInput = ({
  name,
  label,
  placeholder,
  icon,
}: PasswordInputProps) => {
  const { register, watch, formState, trigger } = useFormContext();
  const { errors, touchedFields } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const value = watch(name);
  const error = errors[name]?.message as string | undefined;
  const isTouched = touchedFields[name];

  // dynamic border color
  let variant: "primary" | "success" | "error" = "primary";

  if (focused && value) {
    variant = error ? "error" : "success";
  }

  useEffect(() => {}, [value, name, focused, trigger]);

  return (
    <div className="mb-4">
      {/* input label */}
      <label
        htmlFor="label"
        className="block font-medium mb-1"
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
      </div>
      {error && isTouched && (
        <p className="text-sm text-toastErrorText mt-1">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
