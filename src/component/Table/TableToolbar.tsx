import { cva } from "class-variance-authority";
import cn from "../../utils/cn";

interface FilterOption {
    label: string;
    value: string;
}

interface TableToolbarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;

    sortValue?: string;
    onSortChange?: (value: string) => void;

    filters?: {
        label: string;
        value: string;
        options: FilterOption[];
        onChange: (value: string) => void;
    }[];

    className?: string;
}

const TableToolbar = ({
    searchValue,
    onSearchChange,
    sortValue,
    onSortChange,
    filters = [],
    className,
}: TableToolbarProps) => {
    return (
        <div className={cn("flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4", className)}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:items-center overflow-x-hidden">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className={cn(inputVariants(), "w-full sm:max-w-[240px]")}
                />

                {/* Sort */}
                {onSortChange && (
                    <select
                        value={sortValue}
                        onChange={(e) => onSortChange(e.target.value)}
                        className={cn(inputVariants(), "w-full sm:max-w-[180px]")}
                    >
                        <option value="">Sort by</option>
                        <option value="asc">A → Z</option>
                        <option value="desc">Z → A</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                )}

                {/* Filters */}
                {filters.map((filter) => (
                    <select
                        key={filter.label}
                        value={filter.value}
                        onChange={(e) => filter.onChange(e.target.value)}
                        className={cn(inputVariants(), "w-full sm:max-w-[180px] truncate")}
                    >
                        <option className="max-w-[180px]" value="">{filter.label}</option>
                        {filter.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ))}
            </div>
        </div>
    )
}


export default TableToolbar

const inputVariants = cva(
    "bg-surface border border-inputBorder rounded-md px-3 py-2 text-sm text-font placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition"
);