import { Trophy, ChevronDown, X } from "lucide-react";

interface TournamentPickerTriggerProps {
    selectedName?: string;
    defaultName?: string;
    onOpen: () => void;
    onClear: () => void;
    showClear: boolean;
}

const TournamentPickerTrigger = ({ selectedName,
    defaultName,
    onOpen,
    onClear,
    showClear, }: TournamentPickerTriggerProps) => {

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={onOpen}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
                   border border-border bg-surface hover:bg-subSurface transition-colors"
            >
                <Trophy size={12} className="text-muted" />
                <span className="text-font">
                    {selectedName ?? defaultName ?? "Select Tournament"}
                </span>
                <ChevronDown size={12} className="text-muted" />
            </button>

            {showClear && (
                <button
                    onClick={onClear}
                    className="w-6 h-6 rounded-md flex items-center justify-center
                     text-muted hover:text-toastErrorText hover:bg-toastErrorBg
                     transition-colors"
                >
                    <X size={11} />
                </button>
            )}
        </div>
    )
}

export default TournamentPickerTrigger