import { ChevronLeft, ChevronRight } from "lucide-react";
import Buttons from "../Buttons";

interface PaginationProps {
    currentPage: number;
    totalPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    className?: string;
}

const TablePagination = ({
    currentPage,
    totalPage,
    pageSize = 10,
    onPageChange,
    onPageSizeChange,
}: PaginationProps) => {

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPage && newPage !== currentPage) {
            onPageChange(newPage);
        }
    };

    /* Generate Page Numbers */
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPage <= 5) {
            for (let i = 1; i <= totalPage; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPage);
            } else if (currentPage >= totalPage - 2) {
                pages.push(1, "...", totalPage - 2, totalPage - 1, totalPage);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage);
            }
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">

            {/* page navigation */}
            <div className="flex items-center gap-2 flex-wrap">

                {/* prev button */}
                <Buttons
                    variant="gradient"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-sm disabled:opacity-40"
                    iconLeft={<ChevronLeft size={18} />}
                >
                    Prev
                </Buttons>

                {/* number page */}
                {pages.map((page, idx) => {
                    const isActive = page === currentPage;

                    if (page === "...") {
                        return (
                            <span
                                key={idx}
                                className="px-3 py-1 text-sm text-muted cursor-default"
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handlePageChange(page as number)}
                            className={[
                                "px-3 py-1 rounded-md border transition-all text-sm",
                                isActive
                                    ? "bg-primary text-white border-primary"
                                    : "bg-surface border-border hover:bg-hover"
                            ].join(" ")}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Next button */}
                <Buttons
                    variant="gradient"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPage}
                    className="rounded-sm disabled:opacity-40"
                    iconRight={<ChevronRight size={18} />}
                >
                    Next
                </Buttons>
            </div>

            {/* page size dropdown */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted">Rows per page:</span>

                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="border border-inputBorder rounded-md px-2 py-1 bg-surface text-font text-sm"
                >
                    {[5, 10, 15, 20, 30, 50].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TablePagination;
