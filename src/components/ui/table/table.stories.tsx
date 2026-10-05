import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ShieldAlert,
  UserCheck,
  UserX,
  Edit2,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Table } from "./table";
import type { TableColumn } from "./table.types";
import { Button } from "../button/button";

// -----------------------------------------------------------------------------
// Mock Data Type & Sample Records
// -----------------------------------------------------------------------------

interface UserItem extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  role: "مدیر ارشد" | "کارشناس فنی" | "پشتیبان" | "طراح محصول" | null;
  status: "فعال" | "غیرفعال" | "در انتظار";
  activityScore: number;
  lastLogin: string;
}

const mockUsers: readonly UserItem[] = [
  {
    id: "usr-1",
    name: "سارا احمدی",
    email: "sara.ahmadi@example.com",
    role: "مدیر ارشد",
    status: "فعال",
    activityScore: 98,
    lastLogin: "۱۴۰۳/۰۷/۱۰",
  },
  {
    id: "usr-2",
    name: "علی محمدی",
    email: "ali.mohammadi@example.com",
    role: null,
    status: "فعال",
    activityScore: 84,
    lastLogin: "۱۴۰۳/۰۷/۱۴",
  },
  {
    id: "usr-3",
    name: "مهسا رضایی",
    email: "mahsa.rezaei@example.com",
    role: "طراح محصول",
    status: "در انتظار",
    activityScore: 65,
    lastLogin: "۱۴۰۳/۰۶/۲۹",
  },
  {
    id: "usr-4",
    name: "رضا کریمی",
    email: "reza.karimi@example.com",
    role: "پشتیبان",
    status: "غیرفعال",
    activityScore: 32,
    lastLogin: "۱۴۰۳/۰۵/۱۱",
  },
  {
    id: "usr-5",
    name: "فرزانه کاظمی",
    email: "f.kazemi@example.com",
    role: "کارشناس فنی",
    status: "فعال",
    activityScore: 91,
    lastLogin: "۱۴۰۳/۰۷/۱۵",
  },
  {
    id: "usr-6",
    name: "نوید سهرابی",
    email: "navid.sohrabi@example.com",
    role: "طراح محصول",
    status: "فعال",
    activityScore: 78,
    lastLogin: "۱۴۰۳/۰۷/۱۲",
  },
  {
    id: "usr-7",
    name: "پریسا عباسی",
    email: "p.abbasi@example.com",
    role: "پشتیبان",
    status: "در انتظار",
    activityScore: 54,
    lastLogin: "۱۴۰۳/۰۷/۰۱",
  },
  {
    id: "usr-8",
    name: "کیان پیشرو",
    email: "kian.pishro@example.com",
    role: "کارشناس فنی",
    status: "غیرفعال",
    activityScore: 21,
    lastLogin: "۱۴۰۳/۰۴/۱۸",
  },
];

// دیتای بیشتر برای تست صفحه‌بندی
const largeMockUsers: UserItem[] = Array.from({ length: 30 }).map((_, index) => {
  const base = mockUsers[index % mockUsers.length];
  return {
    ...base,
    id: `usr-${index + 1}`,
    name: `${base.name} (${index + 1})`,
    email: `user${index + 1}@example.com`,
  };
});

// استایل‌دهی وضعیت
function StatusBadge({ status }: { status: UserItem["status"] }) {
  if (status === "فعال") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <UserCheck className="size-3" />
        {status}
      </span>
    );
  }
  if (status === "در انتظار") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
        <ShieldAlert className="size-3" />
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400">
      <UserX className="size-3" />
      {status}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Sample Columns Definition
// -----------------------------------------------------------------------------

const defaultColumns: TableColumn<UserItem>[] = [
  {
    key: "name",
    header: "کاربر",
    sortable: true,
    filterable: true,
    filterPlaceholder: "جست‌وجوی نام...",
    minWidth: 180,
    cell: (user) => (
      <div className="flex flex-col">
        <span className="font-semibold text-foreground text-sm">{user.name}</span>
        <span className="text-xs text-muted-foreground font-mono">{user.email}</span>
      </div>
    ),
  },
  {
    key: "role",
    header: "نقش سازمانی",
    sortable: true,
    filterable: true,
    filterPlaceholder: "جست‌وجوی نقش...",
    width: 140,
  },
  {
    key: "status",
    header: "وضعیت",
    sortable: true,
    width: 120,
    align: "center",
    cell: (user) => <StatusBadge status={user.status} />,
  },
  {
    key: "activityScore",
    header: "امتیاز فعالیت",
    sortable: true,
    width: 130,
    align: "center",
    cell: (user) => {
      const score = user.activityScore;
      const color =
        score >= 80
          ? "bg-emerald-500"
          : score >= 50
            ? "bg-amber-500"
            : "bg-rose-500";

      return (
        <div className="flex items-center justify-center gap-2">
          <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
          </div>
          <span className="font-mono text-xs font-semibold text-foreground">{score}</span>
        </div>
      );
    },
  },
  {
    key: "lastLogin",
    header: "آخرین ورود",
    sortable: true,
    width: 130,
    align: "left",
    cell: (user) => (
      <span className="text-xs text-muted-foreground font-mono">{user.lastLogin}</span>
    ),
  },
  {
    key: "actions",
    header: "عملیات",
    width: 90,
    align: "center",
    cell: (row) => (
      <div className="flex items-center justify-center gap-1">
        <Button
          variant="ghost"
          size="xs"
          shape="circle"
          title="ویرایش"
          stopPropagation
          onClick={() => alert(`Edit row: ${row.id}`)}
        >
          <Edit2 className="size-3.5 text-muted-foreground hover:text-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="xs"
          shape="circle"
          title="حذف"
          stopPropagation
          onClick={() => {}}
        >
          <Trash2 className="size-3.5 text-rose-500/80 hover:text-rose-600" />
        </Button>
      </div>
    ),
  },
];

// -----------------------------------------------------------------------------
// Storybook Meta Configuration
// -----------------------------------------------------------------------------

const meta: Meta<typeof Table<UserItem>> = {
  title: "Components/UI/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
### کامپوننت جامع جدول داده‌ها (Data Table)

کامپوننت جدول بر اساس استانداردهای دیزاین سیستم، پشتیبانی کامل از **راست‌چین (RTL)**، فونت **وزیرمتن**، متغیرهای رنگی **OKLCH**، فیلتر ترکیبی، مرتب‌سازی، لودینگ اسکلتی، انتخاب ردیف‌ها و صفحه‌بندی هوشمند کلاینت و سرور طراحی شده است.

---

### راهنمای تعریف ستون‌ها (TableColumn Structure)
برای رندر کردن کامپوننت‌های سفارشی مانند بج وضعیت یا دکمه‌های عملیات داخل ستون‌ها از تابع \`cell\` استفاده کنید:

\`\`\`tsx
const columns: TableColumn<UserItem>[] = [
  {
    key: "name",
    header: "کاربر",
    sortable: true,
    filterable: true,
    filterPlaceholder: "جست‌وجو...",
    cell: (row) => (
      <div className="flex flex-col">
        <span className="font-semibold text-foreground text-sm">{row.name}</span>
        <span className="text-xs text-muted-foreground font-mono">{row.email}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "وضعیت",
    align: "center",
    cell: (row) => (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600">
        {row.status}
      </span>
    ),
  },
  {
    key: "actions",
    header: "عملیات",
    align: "center",
    cell: (row) => (
      <Button
        variant="ghost"
        size="xs"
        shape="circle"
        title="ویرایش"
        stopPropagation
        onClick={() => console.log("Edit row:", row.id)}
      >
        <Edit2 className="size-3.5" />
      </Button>
    ),
  },
];
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    density: {
      control: "inline-radio",
      options: ["compact", "default", "relaxed"],
      description: "تراکم و پدینگ سلول‌ها",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    bordered: {
      control: "boolean",
      description: "نمایش کادر پیرامونی جدول",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    striped: {
      control: "boolean",
      description: "رنگ پس‌زمینه متناوب و راه‌راه برای سطرها",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    selectable: {
      control: "boolean",
      description: "فعال‌سازی ستون انتخاب سطرهای جدول با چک‌باکس",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    multiSelect: {
      control: "boolean",
      description: "امکان انتخاب چندتایی سطرها (در صورت false، تنها یک سطر قابل انتخاب است)",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    showRowIndex: {
      control: "boolean",
      description: "نمایش ستون شماره ردیف خودکار",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "نمایش لودینگ اسکلتی جدول",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    stickyHeader: {
      control: "boolean",
      description: "هدر ثابت در هنگام اسکرول عمودی",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    pagination: {
      control: "boolean",
      description: "فعال‌سازی نوار صفحه‌بندی در انتهای جدول",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    data: mockUsers,
    columns: defaultColumns,
    rowKey: "id",
    density: "default",
    bordered: true,
    striped: false,
    selectable: false,
    multiSelect: true,
    showRowIndex: true,
    isLoading: false,
    stickyHeader: true,
  },
};

export default meta;
type Story = StoryObj<typeof Table<UserItem>>;

// -----------------------------------------------------------------------------
// 1. پیش‌فرض (Default)
// -----------------------------------------------------------------------------
export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-5xl mx-auto p-4 bg-background">
      <Table<UserItem> {...args} />
    </div>
  ),
};

// -----------------------------------------------------------------------------
// 2. صفحه‌بندی خودکار (Pagination - Uncontrolled)
// -----------------------------------------------------------------------------
export const PaginationUncontrolled: Story = {
  name: "Pagination (Uncontrolled)",
  args: {
    data: largeMockUsers,
    pagination: true,
    defaultPageIndex: 1,
    defaultPageSize: 5,
    pageSizeOptions: [5, 10, 15],
    showRowIndex: true,
  },
  render: (args) => (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-3 bg-background">
      <div className="px-1">
        <h3 className="text-base font-bold text-foreground">
          صفحه‌بندی خودکار (حالت Uncontrolled)
        </h3>
        <p className="text-xs text-muted-foreground">
          استیت صفحه و سایز صفحه به صورت داخلی توسط خود جدول مدیریت می‌شود و نیازی به ارسال State از بیرون نیست.
        </p>
      </div>

      <Table<UserItem> {...args} />
    </div>
  ),
};

// -----------------------------------------------------------------------------
// 3. صفحه‌بندی تحت کنترل (Pagination - Controlled)
// -----------------------------------------------------------------------------
function ControlledPaginationComponent(args: React.ComponentProps<typeof Table<UserItem>>) {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(5);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-3 bg-background">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-base font-bold text-foreground">
            صفحه‌بندی کنترل‌شده (حالت Controlled)
          </h3>
          <p className="text-xs text-muted-foreground">
            مناسب برای شرایطی که نیاز به ارتباط با سرور (Server-side Pagination) یا ذخیره در URL دارید.
          </p>
        </div>
        <div className="text-xs font-mono bg-muted/60 px-3 py-1.5 rounded-lg border border-border">
          صفحه فعلی: <span className="font-bold text-primary">{currentPage}</span> | سایز: <span className="font-bold text-primary">{pageSize}</span>
        </div>
      </div>

      <Table<UserItem>
        {...args}
        pagination
        pageIndex={currentPage}
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 20]}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}

export const PaginationControlled: Story = {
  name: "Pagination (Controlled)",
  args: {
    data: largeMockUsers,
    showRowIndex: true,
  },
  render: (args) => <ControlledPaginationComponent {...args} />,
};

// -----------------------------------------------------------------------------
// 4. انتخاب تکی سطر (Single Select)
// -----------------------------------------------------------------------------
function SingleSelectionComponent(args: React.ComponentProps<typeof Table<UserItem>>) {
  const [selectedKeys, setSelectedKeys] = React.useState<(string | number)[]>(["usr-2"]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-4 bg-background">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-base font-bold text-foreground">انتخاب تکی سطرها (Single Selection)</h3>
          <p className="text-xs text-muted-foreground">
            با تنظیم <code className="font-mono text-primary">multiSelect={false}</code> تنها یک ردیف در لحظه قابل انتخاب است و چک‌باکس هدر برداشته می‌شود.
          </p>
        </div>
        <div className="text-xs font-medium text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border border-border">
          ردیف انتخاب‌شده:{" "}
          <span className="font-bold text-primary font-mono">
            {selectedKeys.length > 0 ? selectedKeys[0] : "هیچ"}
          </span>
        </div>
      </div>

      <Table<UserItem>
        {...args}
        selectable
        multiSelect={false}
        showRowIndex
        selectedRowKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys)}
      />
    </div>
  );
}

export const SingleSelection: Story = {
  name: "Selection (Single Select)",
  render: (args) => <SingleSelectionComponent {...args} />,
};

// -----------------------------------------------------------------------------
// 5. انتخاب گروهی سطرها (Multi Select)
// -----------------------------------------------------------------------------
function MultiSelectionComponent(args: React.ComponentProps<typeof Table<UserItem>>) {
  const [selectedKeys, setSelectedKeys] = React.useState<(string | number)[]>(["usr-2", "usr-3"]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-4 bg-background">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-base font-bold text-foreground">انتخاب چندتایی سطرها (Multi Selection)</h3>
          <p className="text-xs text-muted-foreground">
            امکان انتخاب همزمان چندین سطر به همراه چک‌باکس سرستون برای انتخاب یا عدم انتخاب تمام سطرها.
          </p>
        </div>
        <div className="text-xs font-medium text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border border-border">
          تعداد انتخاب‌شده:{" "}
          <span className="font-bold text-primary font-mono">
            {selectedKeys.length} سطر ({selectedKeys.join(", ") || "هیچ"})
          </span>
        </div>
      </div>

      <Table<UserItem>
        {...args}
        selectable
        multiSelect
        showRowIndex
        selectedRowKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys)}
      />
    </div>
  );
}

export const MultiSelection: Story = {
  name: "Selection (Multi Select)",
  render: (args) => <MultiSelectionComponent {...args} />,
};

// -----------------------------------------------------------------------------
// 6. تعاملی کامل (Full Featured)
// -----------------------------------------------------------------------------
function FullFeaturedComponent(args: React.ComponentProps<typeof Table<UserItem>>) {
  const [selectedKeys, setSelectedKeys] = React.useState<(string | number)[]>(["usr-1"]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-3 bg-background">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-base font-bold text-foreground">مدیریت کاربران سامانه (Full Featured)</h3>
          <p className="text-xs text-muted-foreground">
            شامل مرتب‌سازی ستون‌ها، فیلتر پیشرفته، ناوبری صفحه و چک‌باکس‌های انتخابی.
          </p>
        </div>
        <div className="text-xs font-medium text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border border-border">
          انتخاب‌شده: <span className="font-bold text-primary">{selectedKeys.length}</span>
        </div>
      </div>

      <Table<UserItem>
        {...args}
        selectable
        showRowIndex
        pagination
        defaultPageSize={4}
        pageSizeOptions={[2, 4, 8]}
        selectedRowKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys)}
      />
    </div>
  );
}

export const FullFeatured: Story = {
  args: {
    data: largeMockUsers,
  },
  render: (args) => <FullFeaturedComponent {...args} />,
};

// -----------------------------------------------------------------------------
// 7. انواع تراکم‌ها (Density Variants)
// -----------------------------------------------------------------------------
export const DensityVariants: Story = {
  render: (args) => (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-8 bg-background">
      <div className="space-y-2">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
          تراکم فشرده (Compact)
        </div>
        <Table<UserItem> {...args} density="compact" data={mockUsers.slice(0, 3)} />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
          تراکم استاندارد (Default)
        </div>
        <Table<UserItem> {...args} density="default" data={mockUsers.slice(0, 3)} />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
          تراکم باز و راحت (Relaxed)
        </div>
        <Table<UserItem> {...args} density="relaxed" data={mockUsers.slice(0, 3)} />
      </div>
    </div>
  ),
};

// -----------------------------------------------------------------------------
// 8. سطرهای راه‌راه (Striped Style)
// -----------------------------------------------------------------------------
export const StripedRows: Story = {
  args: {
    striped: true,
    bordered: true,
    showRowIndex: true,
  },
  render: (args) => (
    <div className="w-full max-w-5xl mx-auto p-4 bg-background">
      <Table<UserItem> {...args} />
    </div>
  ),
};

// -----------------------------------------------------------------------------
// 9. حالت اسکلتی در حال بارگذاری (Loading State)
// -----------------------------------------------------------------------------
export const LoadingState: Story = {
  args: {
    isLoading: true,
    loadingRows: 5,
    showRowIndex: true,
    selectable: true,
  },
  render: (args) => (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-2 bg-background">
      <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
        <Sparkles className="size-3.5 text-primary animate-pulse" />
        در حال شبیه‌سازی لودینگ اسکلتی جدول...
      </div>
      <Table<UserItem> {...args} />
    </div>
  ),
};

// -----------------------------------------------------------------------------
// 10. حالت داده خالی (Empty State)
// -----------------------------------------------------------------------------
export const EmptyData: Story = {
  args: {
    data: [],
    showRowIndex: true,
    selectable: true,
  },
  render: (args) => (
    <div className="w-full max-w-4xl mx-auto p-4 bg-background">
      <Table<UserItem> {...args} />
    </div>
  ),
};

// -----------------------------------------------------------------------------
// 11. اسکرول عمودی با هدر چسبنده (Sticky Header & Max Height)
// -----------------------------------------------------------------------------
export const StickyHeaderAndScroll: Story = {
  args: {
    maxHeight: 280,
    stickyHeader: true,
    showRowIndex: true,
    data: largeMockUsers,
  },
  render: (args) => (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-2 bg-background">
      <p className="text-xs text-muted-foreground">
        اسکرول عمودی با حداکثر ارتفاع ۲۸۰ پیکسل و هدر شناور نیمه‌شفاف بلور شده:
      </p>
      <Table<UserItem> {...args} />
    </div>
  ),
};
