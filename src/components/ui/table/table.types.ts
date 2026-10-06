import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import type { tableVariants } from "./table.variants";

export type TableVariant = "default" | "lightPrimary" | "secondary" | "ghost" | "primary";
export type TableDensity = "compact" | "default" | "relaxed";
export type SortDirection = "asc" | "desc" | null;

export interface SortState {
    columnKey: string;
    direction: SortDirection;
}

export type FilterOperator = "contains" | "not_contains" | "equals" | "starts_with";

export interface FilterState {
    columnKey: string;
    value: string;
    operator: FilterOperator;
}

export interface TableColumn<T> {
    key: string;
    header: React.ReactNode;
    cell?: (item: T, index: number) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    filterPlaceholder?: string;
    width?: string | number;
    minWidth?: string | number;
    className?: string;
    headerClassName?: string;
    align?: "right" | "center" | "left";
}

export interface PaginationState {
    pageIndex: number; // 1-based
    pageSize: number;
    total?: number;
}

export interface TableRootProps<T>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof tableVariants> {
    data: readonly T[];
    columns: TableColumn<T>[];
    rowKey?: keyof T | ((item: T) => string | number);

    // Variants
    variant?: TableVariant;
    density?: TableDensity;
    bordered?: boolean;
    striped?: boolean;

    // Loading & Empty state
    isLoading?: boolean;
    loadingRows?: number;
    emptyText?: React.ReactNode;

    // Row Index
    showRowIndex?: boolean;
    rowIndexHeader?: React.ReactNode;

    // Row Selection
    selectable?: boolean;
    multiSelect?: boolean;
    selectedRowKeys?: (string | number)[];
    defaultSelectedRowKeys?: (string | number)[];
    onSelectionChange?: (selectedKeys: (string | number)[], selectedRows: T[]) => void;

    // Sorting
    sortState?: SortState | null;
    defaultSortState?: SortState | null;
    onSortChange?: (sortState: SortState | null) => void;
    manualSorting?: boolean;

    // Filtering
    filterState?: FilterState[];
    defaultFilterState?: FilterState[];
    onFilterChange?: (filters: FilterState[]) => void;
    manualFiltering?: boolean;

    // Pagination
    pagination?: boolean;
    pageIndex?: number;
    defaultPageIndex?: number;
    pageSize?: number;
    defaultPageSize?: number;
    pageSizeOptions?: number[];
    totalRows?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    manualPagination?: boolean;

    // Row Events
    onRowClick?: (item: T, index: number) => void;
    rowClassName?: (item: T, index: number) => string | undefined;

    // Dimensions & Header
    maxHeight?: string | number;
    stickyHeader?: boolean;
    children?: React.ReactNode;
}
