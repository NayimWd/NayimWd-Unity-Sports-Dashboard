import { ChevronLeft, ChevronRight } from "lucide-react";
import Buttons from "../common/Buttons";

interface PaginationProps {
    currentPage: number;
    totalPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (page: number) => void;
    className?: string;
}


const TablePagination = ({ currentPage, totalPage, onPageChange, onPageSizeChange, pageSize = 10 }: PaginationProps) => {


    const handlePageChange = (newPage: number) => {

        if (newPage >= 1 && newPage <= totalPage && newPage !== currentPage) {
            onPageChange(newPage);
        }
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPage <= 5) {
            for (let i = 1; i <= totalPage; i++) pages.push(i)
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPage)
            } else if (currentPage >= totalPage - 2) {
                pages.push(1, "...", totalPage - 2, totalPage - 1, totalPage)
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage)
            }
        }

        return pages;
    }

    const pages = getPageNumbers();

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
            {/* pagination button */}
            <div className="flex items-center gap-2 flex-wrap">
                <Buttons variant="gradient"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="disabled:opacity-60 rounded-sm"
                    iconLeft={<ChevronLeft size={18} />}
                >
                    Prev
                </Buttons>
                {
                    pages.map((page, index) => (
                        <Buttons
                            key={index}
                            disabled={page === "..." || page === currentPage}
                            variant="outline">
                            {page}
                        </Buttons>
                    ))
                }
                <Buttons variant="gradient" iconRight={<ChevronRight size={18} />}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPage}
                    className="disabled:opacity-60 rounded-sm"
                >
                    Next
                </Buttons>
            </div>
            {/* page size selection */}
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
    )
}

export default TablePagination