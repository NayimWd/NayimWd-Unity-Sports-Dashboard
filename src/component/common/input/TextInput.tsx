import React, { useEffect, useState } from "react";
import BaseInput from "./BaseInput";
import { useFormContext } from "react-hook-form";
import { BadgeAlert } from "lucide-react";

interface TextInputProps {
  name: string;
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  autoComplete?: string;
  defaultValue?: string;
}

const TextInput = ({ name, label, placeholder = "Write Your thoughts here!", icon, autoComplete, defaultValue }: TextInputProps) => {
  // importing useFormContext to get the form methods
  const { register, watch, formState, trigger } = useFormContext();
  const { errors } = formState;

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
    // trigger validation when the input is focused and has a value
    if (focused) {
      trigger(name);
    }
  }, [value, name, focused]);

  return (
    <div className="relative space-y-1">
      <label className="block text-font font-medium" htmlFor={name}>
        {label}
      </label>
      <div>
        <BaseInput
          id={name}
          type="text"
          placeholder={placeholder}
          icon={icon}
          autoComplete={autoComplete}
          variant={variant}
          defaultValue={defaultValue}
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

export default TextInput;
