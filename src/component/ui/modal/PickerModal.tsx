import { useState } from "react";
import { Search } from "lucide-react";
import cn from "../../../utils/cn";
import RedixModal from "./RedixModal";

interface PickerItem {
    _id: string;
    name: string;
    photo?: string;
}

interface PickerModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    items: PickerItem[];
    onSelect: (item: PickerItem) => void;
    selectedId?: string;
    isLoading?: boolean;
}

const PickerModal = ({
    isOpen,
    onOpenChange,
    title,
    items,
    onSelect,
    selectedId,
    isLoading,
}: PickerModalProps) => {
    const [search, setSearch] = useState("");

    const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <RedixModal
            isOpen={isOpen}
            onOpenChange={(open) => {
                if (!open) setSearch(""); // clear search on close
                onOpenChange(open);
            }}
            title={title}
            size="sm"
        >
            {/* Search */}
            <div className="relative mb-3">
                <Search
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    autoFocus
                    className="w-full h-9 pl-8 pr-3 bg-bg border border-inputBorder rounded-lg
                     text-sm text-font placeholder:text-muted
                     focus:outline-none focus:ring-2 focus:ring-primary/30
                     focus:border-primary transition-all"
                />
            </div>

            {/* List */}
            <div className="max-h-60 overflow-y-auto scrollbar-hide space-y-0.5">

                {/* Skeleton */}
                {isLoading && (
                    Array(4).fill(null).map((_, i) => (
                        <div key={i} className="h-11 rounded-lg bg-subSurface animate-pulse" />
                    ))
                )}

                {/* Empty */}
                {!isLoading && filtered.length === 0 && (
                    <div className="py-8 text-center text-sm text-muted">
                        No results found
                    </div>
                )}

                {/* Items */}
                {!isLoading && filtered.map((item) => {
                    const isSelected = item._id === selectedId;
                    return (
                        <button
                            key={item._id}
                            type="button"
                            onClick={() => {
                                onSelect(item);
                                onOpenChange(false);
                                setSearch("");
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left",
                                "text-sm transition-colors duration-100",
                                isSelected
                                    ? "bg-primary/10 text-primary"
                                    : "text-subtext hover:bg-subSurface hover:text-font"
                            )}
                        >
                            {item.photo && (
                                <img
                                    src={item.photo}
                                    alt={item.name}
                                    className="w-7 h-7 rounded-lg object-cover flex-shrink-0 border border-border"
                                />
                            )}
                            <span className="flex-1 truncate font-medium">{item.name}</span>
                            {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            )}
                        </button>
                    );
                })}
            </div>
        </RedixModal>
    );
};

export default PickerModal;