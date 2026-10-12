import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Inbox } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import Checkbox from "../checkbox/checkbox";
import { TablePagination } from "./table-pagination";
import { TableColumnFilter } from "./table-column-filter";
import {
    TableContainer,
    TableScrollWrapper,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableFooter,
} from "./table-elements";
import { tableVariants } from "./table.variants";
import type { TableRootProps, SortState, FilterState } from "./table.types";
import { SkeletonTable } from "../skeleton";

export function Table<T extends Record<string, unknown>>({
    data = [],
    columns = [],
    rowKey,
    isLoading = false,
    loadingRows = 5,
    emptyText,

    // Table Variants Props
    variant = "default",
    density = "default",
    bordered = true,
    striped = false,

    // Row Indexing
    showRowIndex = false,
    rowIndexHeader = "#",

    // Row Selection
    selectable = false,
    multiSelect = true,
    selectedRowKeys: controlledSelectedRowKeys,
    defaultSelectedRowKeys = [],
    onSelectionChange,

    // Sorting
    sortState: controlledSortState,
    defaultSortState = null,
    onSortChange,
    manualSorting = false,

    // Filtering
    filterState: controlledFilterState,
    defaultFilterState = [],
    onFilterChange,
    manualFiltering = false,

    // Pagination
    pagination = false,
    pageIndex: controlledPageIndex,
    defaultPageIndex = 1,
    pageSize: controlledPageSize,
    defaultPageSize = 10,
    pageSizeOptions = [5, 10, 20, 50, 100],
    totalRows,
    onPageChange,
    onPageSizeChange,
    manualPagination = false,

    // Row Events & Classes
    onRowClick,
    rowClassName,

    // Dimensions & Header
    maxHeight,
    stickyHeader = true,
    className,
    children,
    ...props
}: TableRootProps<T>) {
    // 1. Internal Sort State
    const [internalSortState, setInternalSortState] = React.useState<SortState | null>(
        defaultSortState
    );
    const isSortControlled = controlledSortState !== undefined;
    const currentSort = isSortControlled ? controlledSortState : internalSortState;

    // 2. Internal Filter State
    const [internalFilterState, setInternalFilterState] =
        React.useState<FilterState[]>(defaultFilterState);
    const isFilterControlled = controlledFilterState !== undefined;
    const currentFilters = isFilterControlled ? controlledFilterState : internalFilterState;

    // 3. Internal Selection State
    const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<
        (string | number)[]
    >(defaultSelectedRowKeys);
    const isSelectionControlled = controlledSelectedRowKeys !== undefined;
    const currentSelectedKeys = isSelectionControlled
        ? controlledSelectedRowKeys
        : internalSelectedKeys;

    // 4. Internal Pagination State
    const isPageIndexControlled = controlledPageIndex !== undefined;
    const isPageSizeControlled = controlledPageSize !== undefined;

    const [internalPageIndex, setInternalPageIndex] = React.useState<number>(
        defaultPageIndex
    );

    const [internalPageSize, setInternalPageSize] = React.useState<number>(
        defaultPageSize
    );

    const currentPageIndex = isPageIndexControlled
        ? controlledPageIndex
        : internalPageIndex;

    const currentPageSize = isPageSizeControlled
        ? controlledPageSize
        : internalPageSize;

    const handlePageChange = (newPage: number) => {
        if (!isPageIndexControlled) {
            setInternalPageIndex(newPage);
        }

        onPageChange?.(newPage);
    };

    const handlePageSizeChange = (newSize: number) => {
        if (!isPageSizeControlled) {
            setInternalPageSize(newSize);
        }

        if (!isPageIndexControlled) {
            setInternalPageIndex(1);
        }

        onPageSizeChange?.(newSize);
    };

    // Helper to extract key
    const getRowKey = React.useCallback(
        (item: T, index: number): string | number => {
            if (typeof rowKey === "function") {
                return rowKey(item);
            }
            if (typeof rowKey === "string" && item[rowKey] !== undefined) {
                return item[rowKey as keyof T] as unknown as string | number;
            }
            return index;
        },
        [rowKey]
    );

    // Filter Handler
    const handleColumnFilterChange = (columnKey: string, filter: FilterState | null) => {
        let nextFilters: FilterState[];
        if (!filter) {
            nextFilters = currentFilters.filter((f) => f.columnKey !== columnKey);
        } else {
            const existingIndex = currentFilters.findIndex((f) => f.columnKey === columnKey);
            if (existingIndex > -1) {
                nextFilters = [...currentFilters];
                nextFilters[existingIndex] = filter;
            } else {
                nextFilters = [...currentFilters, filter];
            }
        }

        if (!isFilterControlled) {
            setInternalFilterState(nextFilters);
        }
        if (!isPageIndexControlled) {
            setInternalPageIndex(1);
        }
        onFilterChange?.(nextFilters);
    };

    // Sort Handler
    const handleSort = (columnKey: string) => {
        let nextSort: SortState | null;
        if (!currentSort || currentSort.columnKey !== columnKey) {
            nextSort = { columnKey, direction: "asc" };
        } else if (currentSort.direction === "asc") {
            nextSort = { columnKey, direction: "desc" };
        } else {
            nextSort = null;
        }

        if (!isSortControlled) {
            setInternalSortState(nextSort);
        }
        onSortChange?.(nextSort);
    };

    // Client-side Filter Logic
    const filteredData = React.useMemo(() => {
        if (manualFiltering || currentFilters.length === 0) {
            return data;
        }

        return data.filter((item) => {
            return currentFilters.every((filter) => {
                const itemVal = item[filter.columnKey];
                if (itemVal === undefined || itemVal === null) return false;

                const strItemVal = String(itemVal).toLowerCase();
                const strFilterVal = String(filter.value).toLowerCase();

                switch (filter.operator) {
                    case "contains":
                        return strItemVal.includes(strFilterVal);
                    case "not_contains":
                        return !strItemVal.includes(strFilterVal);
                    case "equals":
                        return strItemVal === strFilterVal;
                    case "starts_with":
                        return strItemVal.startsWith(strFilterVal);
                    default:
                        return true;
                }
            });
        });
    }, [data, currentFilters, manualFiltering]);

    // Client-side Sort Logic
    const sortedData = React.useMemo(() => {
        if (manualSorting || !currentSort || !currentSort.direction) {
            return filteredData;
        }

        return [...filteredData].sort((a, b) => {
            const aVal = a[currentSort.columnKey];
            const bVal = b[currentSort.columnKey];

            if (aVal === bVal) return 0;
            if (aVal === undefined || aVal === null) return 1;
            if (bVal === undefined || bVal === null) return -1;

            let diff: number;
            if (typeof aVal === "number" && typeof bVal === "number") {
                diff = aVal - bVal;
            } else {
                diff = String(aVal).localeCompare(String(bVal), "fa", { numeric: true });
            }

            return currentSort.direction === "asc" ? diff : -diff;
        });
    }, [filteredData, currentSort, manualSorting]);

    // Client-side Pagination Logic
    const paginatedData = React.useMemo(() => {
        if (!pagination || manualPagination) {
            return sortedData;
        }
        const startIndex = (currentPageIndex - 1) * currentPageSize;
        return sortedData.slice(startIndex, startIndex + currentPageSize);
    }, [sortedData, pagination, manualPagination, currentPageIndex, currentPageSize]);

    const effectiveTotalRows = totalRows !== undefined ? totalRows : filteredData.length;

    // Selection Logic
    const allRowKeysOnCurrentView = React.useMemo(() => {
        return paginatedData.map((item, idx) => getRowKey(item, idx));
    }, [paginatedData, getRowKey]);

    const isAllSelected =
        allRowKeysOnCurrentView.length > 0 &&
        allRowKeysOnCurrentView.every((key) => currentSelectedKeys.includes(key));

    const isSomeSelected =
        allRowKeysOnCurrentView.some((key) => currentSelectedKeys.includes(key)) &&
        !isAllSelected;

    const updateSelection = (nextKeys: (string | number)[]) => {
        if (!isSelectionControlled) {
            setInternalSelectedKeys(nextKeys);
        }
        if (onSelectionChange) {
            const selectedRowItems = data.filter((item, idx) =>
                nextKeys.includes(getRowKey(item, idx))
            );
            onSelectionChange(nextKeys, [...selectedRowItems]);
        }
    };

    const handleSelectAll = () => {
        let nextSelected: (string | number)[];
        if (isAllSelected) {
            nextSelected = currentSelectedKeys.filter(
                (key) => !allRowKeysOnCurrentView.includes(key)
            );
        } else {
            const set = new Set([...currentSelectedKeys, ...allRowKeysOnCurrentView]);
            nextSelected = Array.from(set);
        }
        updateSelection(nextSelected);
    };

    const handleSelectRow = (key: string | number) => {
        let nextSelected: (string | number)[];
        if (!multiSelect) {
            nextSelected = currentSelectedKeys.includes(key) ? [] : [key];
        } else {
            if (currentSelectedKeys.includes(key)) {
                nextSelected = currentSelectedKeys.filter((k) => k !== key);
            } else {
                nextSelected = [...currentSelectedKeys, key];
            }
        }
        updateSelection(nextSelected);
    };

    const getDisplayIndex = (index: number) => {
        if (!pagination) return index + 1;
        return (currentPageIndex - 1) * currentPageSize + index + 1;
    };

    const totalColumnCount =
        columns.length + (selectable ? 1 : 0) + (showRowIndex ? 1 : 0);

    return (
        <div className={cn("w-full flex flex-col gap-2", className)} {...props}>
            <TableContainer variant={variant}>
                <TableScrollWrapper style={{ maxHeight }}>
                    <table className={cn(tableVariants({ variant, density, bordered, striped }))}>
                        <TableHeader sticky={stickyHeader}>
                            <TableRow className="group">
                                {/* 1. Selection Header */}
                                {selectable && (
                                    <TableHead className="w-10 px-3 text-center" align="center">
                                        {multiSelect && (
                                            <Checkbox
                                                size="sm"
                                                isTableInline
                                                checked={isAllSelected}
                                                indeterminate={isSomeSelected}
                                                onCheckedChange={handleSelectAll}
                                                aria-label="انتخاب همه سطرها"
                                                stopPropagation
                                            />
                                        )}
                                    </TableHead>
                                )}

                                {/* 2. Index Header */}
                                {showRowIndex && (
                                    <TableHead className="w-12 px-2 text-center" align="center">
                                        {rowIndexHeader}
                                    </TableHead>
                                )}

                                {/* 3. Columns Header */}
                                {columns.map((col) => {
                                    const isColumnSortable = Boolean(col.sortable);
                                    const isColumnFilterable = Boolean(col.filterable);
                                    const activeFilter = currentFilters.find((f) => f.columnKey === col.key);
                                    const isSorted = currentSort?.columnKey === col.key;

                                    return (
                                        <TableHead
                                            key={col.key}
                                            align={col.align}
                                            style={{ width: col.width, minWidth: col.minWidth }}
                                            className={cn("group", col.headerClassName)}
                                        >
                                            <div
                                                className={cn(
                                                    "flex items-center gap-1.5",
                                                    col.align === "center" && "justify-center",
                                                    col.align === "left" && "justify-start"
                                                )}
                                            >
                                                {isColumnSortable ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSort(col.key)}
                                                        className="flex items-center gap-1 font-semibold text-foreground/60 hover:text-primary transition-colors select-none focus:outline-none"
                                                    >
                                                        <span>{col.header}</span>
                                                        <span className="text-muted-foreground/60 group-hover:text-primary transition-colors">
                                                            {isSorted && currentSort?.direction ? (
                                                                currentSort.direction === "asc" ? (
                                                                    <ArrowUp className="size-3.5 text-primary" />
                                                                ) : (
                                                                    <ArrowDown className="size-3.5 text-primary" />
                                                                )
                                                            ) : (
                                                                <ArrowUpDown className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            )}
                                                        </span>
                                                    </button>
                                                ) : (
                                                    <span className="text-foreground/60">{col.header}</span>
                                                )}

                                                {isColumnFilterable && (
                                                    <TableColumnFilter
                                                        columnKey={col.key}
                                                        columnTitle={col.header}
                                                        placeholder={col.filterPlaceholder}
                                                        currentFilter={activeFilter}
                                                        onFilterChange={(filter) =>
                                                            handleColumnFilterChange(col.key, filter)
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={totalColumnCount} className="p-0 border-none">
                                        <SkeletonTable rows={loadingRows} columns={totalColumnCount} />
                                    </td>
                                </tr>
                            ) : paginatedData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={totalColumnCount}
                                        className="p-8 text-center text-muted-foreground"
                                    >
                                        {emptyText ?? (
                                            <div className="flex flex-col items-center justify-center gap-2 py-4">
                                                <Inbox className="size-8 text-muted-foreground/40" />
                                                <p className="text-sm font-medium">هیچ داده‌ای برای نمایش یافت نشد.</p>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((record, index) => {
                                    const key = getRowKey(record, index);
                                    const isSelected = currentSelectedKeys.includes(key);

                                    return (
                                        <TableRow
                                            key={key}
                                            selected={isSelected}
                                            clickable={Boolean(onRowClick)}
                                            onClick={() => onRowClick?.(record, index)}
                                            className={cn(
                                                "group",
                                                typeof rowClassName === "function"
                                                    ? rowClassName(record, index)
                                                    : rowClassName
                                            )}
                                        >
                                            {/* Selection Cell */}
                                            {selectable && (
                                                <TableCell className="w-10 px-3 text-center" align="center">
                                                    <Checkbox
                                                        size="sm"
                                                        isTableInline
                                                        checked={isSelected}
                                                        onCheckedChange={() => handleSelectRow(key)}
                                                        aria-label={`انتخاب ردیف ${getDisplayIndex(index)}`}
                                                        stopPropagation
                                                    />
                                                </TableCell>
                                            )}

                                            {/* Index Cell */}
                                            {showRowIndex && (
                                                <TableCell
                                                    className="w-12 px-2 text-center text-muted-foreground/70 font-mono"
                                                    align="center"
                                                >
                                                    {getDisplayIndex(index)}
                                                </TableCell>
                                            )}

                                            {/* Data Cells */}
                                            {columns.map((col) => (
                                                <TableCell
                                                    key={col.key}
                                                    align={col.align}
                                                    style={{ width: col.width, minWidth: col.minWidth }}
                                                    className={col.className}
                                                >
                                                    {col.cell
                                                        ? col.cell(record, index)
                                                        : ((record[col.key] as React.ReactNode) ?? "-")}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>

                        {children && <TableFooter>{children}</TableFooter>}
                    </table>
                </TableScrollWrapper>
            </TableContainer>

            {/* Pagination */}
            {pagination && (
                <TablePagination
                    variant={variant}
                    pageIndex={currentPageIndex}
                    pageSize={currentPageSize}
                    pageSizeOptions={pageSizeOptions}
                    totalRows={effectiveTotalRows}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}
        </div>
    );
}

export default Table;
