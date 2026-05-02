import { useFormContext, Controller, get } from "react-hook-form";
import { BadgeAlert, ChevronRight, X } from "lucide-react";
import cn from "../../../utils/cn";

interface PickerItem {
  _id: string;
  name: string;
  photo?: string;
}


interface EntityPickerInputProps {
  name: string;
  label: string;
  placeholder?: string;
  selected?: PickerItem | null;
  onPick: () => void;
  onClear?: () => void;
}


const EntityPickerInput = ({
  name,
  label,
  placeholder = "Select an option",
  selected,
  onPick,
  onClear,
}: EntityPickerInputProps) => {
  const { control, formState } = useFormContext();
  const error = get(formState.errors, name)?.message as string | undefined;

  return (
    <div className="space-y-1">
      <label className="block text-font font-medium" htmlFor={name}>
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={() => (
          <div
            onClick={onPick}
            className={cn(
              "w-full h-10 px-3 flex items-center justify-between gap-2",
              "bg-surface border rounded-md cursor-pointer",
              "text-sm transition-all duration-150",
              "hover:border-primary/50",
              error ? "border-toastErrorText"
                : selected ? "border-green-500"
                  : "border-inputBorder"
            )}
          >
            {selected ? (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {selected.photo && (
                  <img
                    src={selected.photo}
                    alt={selected.name}
                    className="w-5 h-5 rounded object-cover flex-shrink-0"
                  />
                )}
                <span className="text-font truncate">{selected.name}</span>
              </div>
            ) : (
              <span className="text-muted flex-1">{placeholder}</span>
            )}

            <div className="flex items-center gap-1 flex-shrink-0">
              {selected && onClear && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                  className="w-5 h-5 rounded flex items-center justify-center
                             text-muted hover:text-toastErrorText hover:bg-toastErrorBg
                             transition-colors"
                >
                  <X size={12} />
                </button>
              )}
              <ChevronRight size={14} className="text-muted" />
            </div>
          </div>
        )}
      />

      {error && (
        <p className="errorText flex items-center gap-1 text-xs">
          <BadgeAlert size={14} /> {error}
        </p>
      )}
    </div>
  );
};

export default EntityPickerInput;