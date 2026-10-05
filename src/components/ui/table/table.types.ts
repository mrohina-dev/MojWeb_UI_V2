import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import type { tableVariants } from "./table.variants";

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
    pageIndex: number; // 1-based (starts from 1)
    pageSize: number;
    total?: number;
}

export interface TableRootProps<T>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof tableVariants> {
    data: readonly T[];
    columns: TableColumn<T>[];
    rowKey?: keyof T | ((item: T) => string | number);

    // لودینگ و داده خالی
    isLoading?: boolean;
    loadingRows?: number;
    emptyText?: React.ReactNode;

    // ردیف ایندکس (ردیف شماره)
    showRowIndex?: boolean;
    rowIndexHeader?: React.ReactNode;

    // انتخاب سطر
    selectable?: boolean;
    multiSelect?: boolean;
    selectedRowKeys?: (string | number)[];
    defaultSelectedRowKeys?: (string | number)[];
    onSelectionChange?: (selectedKeys: (string | number)[], selectedRows: T[]) => void;

    // سورت (اختیاری - کلاینت یا سرور)
    sortState?: SortState | null;
    defaultSortState?: SortState | null;
    onSortChange?: (sortState: SortState | null) => void;
    manualSorting?: boolean; // برای سورت سمت سرور

    // فیلتر (اختیاری - کلاینت یا سرور)
    filterState?: FilterState[];
    defaultFilterState?: FilterState[];
    onFilterChange?: (filters: FilterState[]) => void;
    manualFiltering?: boolean; // برای فیلتر سمت سرور

    // صفحه‌بندی (اختیاری)
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

    // رویدادهای سطر
    onRowClick?: (item: T, index: number) => void;
    rowClassName?: (item: T, index: number) => string | undefined;

    // اسکرول و ابعاد
    maxHeight?: string | number;
    stickyHeader?: boolean;
    children?: React.ReactNode;
}
