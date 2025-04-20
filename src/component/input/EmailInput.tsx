import React, { useEffect, useState } from 'react'
import BaseInput from './BaseInput';
import { useFormContext } from 'react-hook-form';

interface EmailInputProps {
    name: string;
    label: string;
    placeholder: string;
    icon?: React.ReactNode;
}

const EmailInput = ({name, label, placeholder, icon} : EmailInputProps) => {
// import useFormContext to get the form methods
const {register, watch, formState, trigger} = useFormContext();
const {errors, touchedFields} = formState;

// focus state
const [focused, setFocused] = useState(false);
const value = watch(name);
const error = errors[name]?.message as string | undefined;

const isTouched = touchedFields[name];

// dynamic border color
let variant: "primary" | "success" | "error" = "primary";

// set the input variant based on the error and focus state
if(focused && value) {
    variant = error ? "error" : "success"
};

useEffect(() => {
    // trigger validation while the input is focused and has a value
    if(focused && value) {
        trigger(name)
    }
},[value, name, focused, trigger, isTouched]);


  return (
    <div className='space-y-2'>
        <label
        htmlFor={name}
        className='block text-font font-medium'>
            {label}
        </label>
        <div className='relative'>
            <BaseInput
              id={name}
              type="email"
              placeholder={placeholder}
              icon={icon}
              variant={variant}
              {...register(name)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            {
                error && focused &&  value && (
                    <p className='absolute mt-2  text-sm text-toastErrorText'>{error}</p>
                )
            }
        </div>
    </div>
  )
}

export default EmailInput