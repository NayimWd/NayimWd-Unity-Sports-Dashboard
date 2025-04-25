import { DayPicker } from "react-day-picker";
import { Controller, useFormContext } from "react-hook-form";
import cn from "../../utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, useRef, useState } from "react";
import { CalendarIcon } from "lucide-react";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import useClickOutSide from "../../hooks/useClickOutSide";

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

  const [open, setOpen] = useState(false);

  // close the date picker when clicking outside
  const calenderRef = useRef<HTMLDivElement>(null!);

  useClickOutSide(calenderRef, () => {
    setOpen(false);
  });

  return (
    <div className="">
      <label className="block text-font font-medium mb-1">{label}</label>
      <div className="relative">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              <input
                readOnly
                onClick={() => setOpen(!open)}
                value={field.value ? format(field.value, "dd/MM/yyyy") : ""}
                placeholder={placeholder}
                className={cn(
                  inputVariants({ variant: error ? "error" : "default" }),
                  "w-full pr-10 cursor-pointer text-font",
                  className
                )}
              />
              {open && (
                <div
                  ref={calenderRef}
                  className="absolute -top-[800%] left-4 z-50  bg-surface border border-inputBorder rounded-md shadow-md"
                >
                  <DayPicker
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setOpen(false);
                    }}
                    className="p-2 bg-bg rounded-lg border-border text-font"
                    modifiersClassNames={{
                      selected: "bg-primary text-white",
                      today: "border border-primary",
                    }}
                    fromDate={new Date(1900, 0, 1)}
                  />
                </div>
              )}
            </>
          )}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
          {icon ?? <CalendarIcon size={16} />}
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
