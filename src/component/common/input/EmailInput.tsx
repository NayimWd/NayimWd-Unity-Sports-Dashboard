import React, { useEffect, useState } from "react";
import BaseInput from "./BaseInput";
import { useFormContext } from "react-hook-form";
import { BadgeAlert } from "lucide-react";

interface EmailInputProps {
  name: string;
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  autoComplete?: string;
}

const EmailInput = ({ name, label, placeholder, icon, autoComplete }: EmailInputProps) => {
  // import useFormContext to get the form methods
  const { register, watch, formState, trigger } = useFormContext();
  const { errors } = formState;


  // focus state
  const [focused, setFocused] = useState(false);
  const value = watch(name);
  const error = errors[name]?.message as string | undefined;

  // dynamic border color
  let variant: "primary" | "success" | "error" = "primary";

  // set the input variant based on the error and focus state
  if (focused && value) {
    variant = error ? "error" : "success";
  }

  useEffect(() => {
    // trigger validation while the input is focused and has a value
    if (focused) {
      trigger(name);
    }
  }, [value, name, focused]);

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-font font-medium">
        {label}
      </label>
      <div className="relative">
        <BaseInput
          id={name}
          type="email"
          placeholder={placeholder}
          icon={icon}
          variant={variant}
          autoComplete={autoComplete}
          {...register(name)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {error && <p className="errorText flex items-center justify-center gap-1"> <BadgeAlert size={14} /> {error}</p>
        }

      </div>
    </div>
  );
};

export default EmailInput;
