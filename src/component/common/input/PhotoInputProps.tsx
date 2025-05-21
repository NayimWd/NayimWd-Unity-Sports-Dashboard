import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import cn from "../../../utils/cn";
import { ImageIcon } from "lucide-react";

interface PhotoInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  name: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const PhotoInput = ({
  name,
  label,
  icon,
  className,
  ...reset
}: PhotoInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;


  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div>
      <label className="block text-font font-medium mb-1">{label}</label>
      <div className="relative">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              <input
                type="file"
                accept="image/*"

                ref={inputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                  if (file) {
                    const render = new FileReader();
                    render.onload = () => {
                      setPreview(render.result as string);
                    };
                    render.readAsDataURL(file);
                  }
                }}
                className="hidden"
                {...reset}
              />
              <div
                onClick={() => inputRef.current?.click()}
                className={cn(
                  inputVariants({ variant: error ? "error" : "default" }),
                  "cursor-pointer h-40 flex items-center justify-center text-muted relative overflow-hidden",
                  className
                )}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="absolute inset-0 p-1 object-contain object-center w-full h-full rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    {icon || <ImageIcon size={24} />}
                    <span className="text-sm mt-1">Upload a photo</span>
                  </div>
                )}
              </div>
            </>
          )}
        />
        {error && <p className="text-toastErrorText text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default PhotoInput;

const inputVariants = cva(
  "w-full bg-surface rounded-md border text-sm border-inputBorder appearance-none transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary",
  {
    variants: {
      variant: {
        default: "",
        error: "border-toastErrorText focus:ring-toastErrorText",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
