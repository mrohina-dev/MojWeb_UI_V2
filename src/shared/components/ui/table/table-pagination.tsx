import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../button/button";
import { Select } from "../select/select";
import { tablePaginationVariants } from "./table.variants";
import type { TableVariant } from "./table.types";

interface TablePaginationProps {
    variant?: TableVariant;
    pageIndex: number;
    pageSize: number;
    totalRows: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
    variant = "default",
    pageIndex,
    pageSize,
    totalRows,
    pageSizeOptions = [5, 10, 20, 50, 100],
    onPageChange,
    onPageSizeChange,
}) => {
    const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
    const isFirstPage = pageIndex <= 1;
    const isLastPage = pageIndex >= totalPages;

    const startRow = totalRows === 0 ? 0 : (pageIndex - 1) * pageSize + 1;
    const endRow = Math.min(pageIndex * pageSize, totalRows);

    const selectOptions = React.useMemo(() => {
        return pageSizeOptions.map((size) => ({
            value: String(size),
            label: `${size} سطر`,
        }));
    }, [pageSizeOptions]);

    return (
        <div className={tablePaginationVariants({ variant })}>
            {/* اطلاعات تعداد سطرها */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>نمایش</span>
                <span className="font-semibold text-foreground">{startRow}</span>
                <span>تا</span>
                <span className="font-semibold text-foreground">{endRow}</span>
                <span>از</span>
                <span className="font-semibold text-foreground">{totalRows}</span>
                <span>داده</span>
            </div>

            <div className="flex items-center gap-4">
                {/* انتخاب تعداد در صفحه */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>تعداد در صفحه:</span>
                    <Select
                        size="sm"
                        value={String(pageSize)}
                        onValueChange={(val) => onPageSizeChange(Number(val))}
                        options={selectOptions}
                        fullWidth={false}
                        className="h-8 min-w-22"
                    />
                </div>

                {/* دکمه‌های ناوبری صفحه */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="xs"
                        shape="square"
                        disabled={isFirstPage}
                        onClick={() => onPageChange(1)}
                        title="صفحه اول"
                    >
                        <ChevronsRight className="size-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="xs"
                        shape="square"
                        disabled={isFirstPage}
                        onClick={() => onPageChange(pageIndex - 1)}
                        title="صفحه قبل"
                    >
                        <ChevronRight className="size-4" />
                    </Button>

                    <span className="px-2 text-xs font-medium text-foreground">
                        صفحه {pageIndex} از {totalPages}
                    </span>

                    <Button
                        variant="ghost"
                        size="xs"
                        shape="square"
                        disabled={isLastPage}
                        onClick={() => onPageChange(pageIndex + 1)}
                        title="صفحه بعد"
                    >
                        <ChevronLeft className="size-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="xs"
                        shape="square"
                        disabled={isLastPage}
                        onClick={() => onPageChange(totalPages)}
                        title="صفحه آخر"
                    >
                        <ChevronsLeft className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TablePagination;
