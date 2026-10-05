import * as React from "react";
import { Filter, X } from "lucide-react";
import { Button } from "../button/button";
import { Popover } from "../popover/popover";
import { Input } from "../input/input";
import { Select } from "../select/select";
import type { FilterOperator, FilterState } from "./table.types";

interface TableColumnFilterProps {
    columnKey: string;
    columnTitle?: React.ReactNode;
    placeholder?: string;
    currentFilter?: FilterState;
    onFilterChange: (filter: FilterState | null) => void;
}

const FILTER_OPERATOR_OPTIONS = [
    { value: "contains", label: "شامل شود" },
    { value: "not_contains", label: "شامل نشود" },
    { value: "equals", label: "برابر باشد با" },
    { value: "starts_with", label: "شروع شود با" },
];

interface FilterFormContentProps {
    columnKey: string;
    placeholder?: string;
    initialOperator: FilterOperator;
    initialValue: string;
    hasActiveFilter: boolean;
    onApply: (operator: FilterOperator, value: string) => void;
    onReset: () => void;
    onClose: () => void;
}

/**
 * کامپوننت تفکیک‌شده فرم فیلتر:
 * مقادیر اولیه را مستقیماً در useState دریافت می‌کند بدون هیچ useEffect
 */
function FilterFormContent({
    placeholder = "جست‌وجو...",
    initialOperator,
    initialValue,
    hasActiveFilter,
    onApply,
    onReset,
    onClose,
}: FilterFormContentProps) {
    const [operator, setOperator] = React.useState<FilterOperator>(initialOperator);
    const [value, setValue] = React.useState<string>(initialValue);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        onApply(operator, value);
        onClose();
    };

    const handleReset = () => {
        onReset();
        onClose();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2.5 p-1"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between pb-1.5 border-b border-border/80">
                <span className="text-xs font-semibold text-foreground">فیلتر ستون</span>
                {hasActiveFilter && (
                    <span className="text-[10px] bg-primary/15 text-primary px-1.5 py-0.5 rounded font-medium">
                        فعال
                    </span>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground font-medium">شرط فیلتر:</label>
                <Select
                    size="sm"
                    value={operator}
                    onValueChange={(val) => setOperator(val as FilterOperator)}
                    options={FILTER_OPERATOR_OPTIONS}
                    fullWidth
                />
            </div>

            <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground font-medium">مقدار:</label>
                <Input
                    size="xs"
                    plain
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="bg-muted/20"
                    autoFocus
                />
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/80">
                <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={handleReset}
                    disabled={!hasActiveFilter && !value}
                    iconStart={<X className="size-3" />}
                >
                    حذف
                </Button>
                <Button type="submit" variant="primary" size="xs">
                    اعمال فیلتر
                </Button>
            </div>
        </form>
    );
}

export const TableColumnFilter: React.FC<TableColumnFilterProps> = ({
    columnKey,
    placeholder = "جست‌وجو...",
    currentFilter,
    onFilterChange,
}) => {
    const hasActiveFilter = Boolean(currentFilter && currentFilter.value.trim() !== "");

    const handleApply = (operator: FilterOperator, value: string) => {
        if (!value.trim()) {
            onFilterChange(null);
        } else {
            onFilterChange({
                columnKey,
                value: value.trim(),
                operator,
            });
        }
    };

    const handleReset = () => {
        onFilterChange(null);
    };

    // کلید ریست برای ایجاد یک نمونه تمیز با استیت هماهنگ بر اساس فیلتر جاری
    const formKey = `${columnKey}-${currentFilter?.operator ?? "contains"}-${currentFilter?.value ?? ""}`;

    return (
        <div onClick={(e) => e.stopPropagation()} className="inline-flex items-center">
            <Popover
                size="sm"
                align="start"
                side="bottom"
                trigger={
                    <span
                        tabIndex={0}
                        role="button"
                        className={
                            "inline-flex items-center justify-center size-6 rounded-full transition-colors cursor-pointer " +
                            (hasActiveFilter
                                ? "text-primary bg-primary/10 hover:bg-primary/20"
                                : "text-muted-foreground/60 hover:text-foreground hover:bg-muted")
                        }
                        title="فیلتر ستون"
                    >
                        <Filter className="size-3" />
                    </span>
                }
            >
                {({ close }) => (
                    <FilterFormContent
                        key={formKey}
                        columnKey={columnKey}
                        placeholder={placeholder}
                        initialOperator={currentFilter?.operator ?? "contains"}
                        initialValue={currentFilter?.value ?? ""}
                        hasActiveFilter={hasActiveFilter}
                        onApply={handleApply}
                        onReset={handleReset}
                        onClose={close}
                    />
                )}
            </Popover>
        </div>
    );
};

export default TableColumnFilter;
