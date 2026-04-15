import { DayPicker } from "react-day-picker";
import { Controller, useFormContext } from "react-hook-form";
import cn from "../../../utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, useRef, useState } from "react";
import { BadgeAlert, CalendarIcon } from "lucide-react";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import useClickOutSide from "../../../hooks/useClickOutSide";

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
    formState: { errors },
    trigger
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;
  const [open, setOpen] = useState(false);
  const calenderRef = useRef<HTMLDivElement>(null!);



  useClickOutSide(calenderRef, () => setOpen(false));

  return (
    <div className="">
      <label className="block text-font font-medium mb-1">{label}</label>

      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const value = field.value;

            let variant: "default" | "success" | "error" = "default";
            if (error) variant = "error";
            else if (value) variant = "success";
            const safeDate = field.value
              ? new Date(field.value.split("-").reverse().join("-"))
              : undefined;

            return (
              <>
                <input
                  readOnly
                  onClick={() => setOpen(!open)}
                  value={safeDate ? format(safeDate, "dd-MM-yyyy") : ""}
                  placeholder={placeholder}
                  className={cn(
                    inputVariants({ variant }),
                    "w-full pr-10 cursor-pointer text-font",
                    className
                  )}
                />

                {open && (
                  <div
                    ref={calenderRef}
                    className="absolute top-[110%] left-0 bg-surface border rounded-md shadow-lg z-50"
                  >
                    <DayPicker
                      mode="single"
                      selected={safeDate}
                      onSelect={(d) => {
                        field.onChange(d ? format(d, "dd-MM-yyyy") : null);
                        trigger(name);
                        setOpen(false);
                      }}
                      className="p-2 bg-bg rounded-lg border-border text-font"
                      modifiersClassNames={{
                        selected: "bg-primary text-white",
                        today: "border border-primary",
                      }}
                    />
                  </div>
                )}
              </>
            );
          }}
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
          {icon ?? <CalendarIcon size={16} />}
        </span>
      </div>

      {error && (
        <p className="errorText flex items-center gap-1 text-red-500 text-xs pt-1">
          <BadgeAlert size={14} /> {error}
        </p>
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
        success: "border-green-500 focus:ring-green-500",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
