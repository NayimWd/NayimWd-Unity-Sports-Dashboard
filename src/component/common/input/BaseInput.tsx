import { cva, VariantProps } from 'class-variance-authority';
import React, { InputHTMLAttributes, forwardRef } from 'react'
import cn from '../../../utils/cn';

interface BaseInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputStyles> {
  icon?: React.ReactNode;
  placeholder?: string
  defaultValue?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ icon, className, variant, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-font">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            inputStyles({ variant }),
            icon ? "pl-9" : "",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

export default BaseInput;

const inputStyles = cva(
  "w-full h-10 px-3 py-2 text-font placeholder-muted rounded-md border transition-all duration-150 ease-in-out focus:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-surface border-inputBorder focus:ring-2 focus:ring-primary",
        success: "bg-surface border-inputBorder focus:ring-2 focus:ring-green-500",
        error: "bg-surface border-inputBorder focus:ring-2 focus:ring-red-500",
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
)