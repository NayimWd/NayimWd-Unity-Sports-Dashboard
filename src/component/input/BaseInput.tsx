import { cva, VariantProps } from 'class-variance-authority';
import React, { InputHTMLAttributes, forwardRef} from 'react'
import cn from '../../utils/cn';

interface BaseInputProps 
    extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles>{
        icon?: React.ReactNode;
        placeholder?: string
}
const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ icon, className, variant, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 mr-10">{icon}</span>}
        <input
          ref={ref}
          {...props}
          className={cn(inputStyles({variant, className}), icon ? "pl-9" : "")}
          {...props}
         
        />
      </div>
    );
  }
);

export default BaseInput;

const inputStyles = cva(
    "w-full h-10 px-3 py-2 placeholder-muted rounded-md border transition-all duration-150 ease-in-out focus:outline-none",
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