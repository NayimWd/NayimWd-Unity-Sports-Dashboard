import { cva, VariantProps } from "class-variance-authority";
import { ImageIcon } from "lucide-react";
import { InputHTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import cn from "../../../utils/cn";

interface photoArrayInputProps
   extends InputHTMLAttributes<HTMLInputElement>,
      VariantProps<typeof inputVariants> {
    name: string;
    label: string;
    icon?: ReactNode;
    className?: string;
}

const PhotoArrayInput = ({name, label, icon, className, ...reset}: photoArrayInputProps) => {

    const {
        control,
        formState: {errors}
    } = useFormContext();

    const error = errors[name]?.message as string || undefined;

    const inputRef = useRef<HTMLInputElement>(null);

    const [previews, setPreviews] = useState<string[]>([]);

    // reset preview on form reset
      const watchFile = useWatch({ name, control });
      useEffect(() => {
        if (!watchFile) {
          setPreviews([]);
        }
      }, [watchFile])



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
                multiple
                ref={inputRef}
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  field.onChange(files);

                  const readers = files.map((file) => {
                    return new Promise<string>((resolve) => {
                      const reader = new FileReader();
                      reader.onload = () => resolve(reader.result as string);
                      reader.readAsDataURL(file);
                    });
                  });

                  Promise.all(readers).then(setPreviews);
                }}
                className="hidden"
                {...reset}
              />

              <div
                onClick={() => inputRef.current?.click()}
                className={cn(
                  inputVariants({ variant: error ? "error" : "default" }),
                  "cursor-pointer p-4 text-muted rounded-md bg-surface border border-dashed min-h-[140px] flex flex-wrap gap-2 items-center justify-center",
                  className
                )}
              >
                {previews.length > 0 ? (
                  <div className="flex gap-2 flex-wrap">
                    {previews.map((src, idx) => (
                      <div key={idx} className="relative w-24 h-24">
                        <img
                          src={src}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    {icon || <ImageIcon size={24} />}
                    <span className="text-sm mt-1 text-muted">Upload photos</span>
                  </div>
                )}
              </div>
            </>
          )}
        />
        {error && <p className="text-toastErrorText text-sm mt-1">{error}</p>}
      </div>
    </div>
  )
}

export default PhotoArrayInput;

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