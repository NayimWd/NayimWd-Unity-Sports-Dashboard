import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import cn from "../../utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { CalendarIcon } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  name: string;
  label: string;
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

const DateInput = ({
  name,
  label,
  className,
  placeholder,
  icon,
}: DateInputProps) => {
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;
  const isTouched = touchedFields[name];

  return (
    <div className="">
      <label className="block text-font font-medium mb-1">{label}</label>
      <div className="relative w-full">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <DatePicker
              placeholderText={placeholder}
              selected={field.value}
              onChange={field.onChange}
              wrapperClassName="w-full"
              className={cn(
                inputVariants({
                  variant: error ? "error" : "default",
                }),
                "w-full pr-10",
                className
              )}
              calendarClassName="bg-surface shadow-lg border border-inputBorder rounded-md text-font"
              dayClassName={() =>
                "hover:bg-subSurface transition-colors rounded"
              }
              dateFormat="dd/MM/yyyy"
            />
          )}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
          {icon ? icon : <CalendarIcon size={16} />}
        </span>
      </div>
      {error && isTouched && (
        <p className="text-sm text-toastErrorText mt-1">{error}</p>
      )}
    </div>
  );
};

export default DateInput;

const inputVariants = cva(
  "w-full h-10 px-3 py-2 text-font bg-surface rounded-md text-sm border appearance-none transition duration-150 ease-in-out focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        default: "border-inputBorder focus:ring-primary",
        error: "border-toastErrorText focus:ring-toastErrorText",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
