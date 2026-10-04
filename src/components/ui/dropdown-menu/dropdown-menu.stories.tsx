import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Archive,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  Copy,
  Edit,
  FolderPlus,
  HelpCircle,
  LogOut,
  MoreVertical,
  Settings,
  Share2,
  Trash2,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';
import type { ComponentSize } from './dropdown-menu.types';

const meta = {
  title: 'Components/UI/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'کامپوننت منوی آبشاری (DropdownMenu) بر پایه `@base-ui/react/menu`، مدیریت کامل کیبورد، استایل‌دهی CVA و پشتیبانی کامل از RTL.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    trigger: <Button outline>منو</Button>,
    size: 'default',
    side: 'bottom',
    align: 'start',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full'] satisfies ComponentSize[],
      description: 'سایز کادر منو مطابق استاندارد ۵‌تایی سامانه',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'جهت باز شدن منو نسبت به محرک',
      table: {
        defaultValue: { summary: 'bottom' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'تراز منو نسبت به لبه محرک',
      table: {
        defaultValue: { summary: 'start' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'destructive', 'success', 'warning'],
      description: 'تم رنگی',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: 'profile',
    label: 'مشاهده پروفایل',
    icon: <User className="size-4" />,
    shortcut: '⇧⌘P',
  },
  {
    id: 'settings',
    label: 'تنظیمات سیستم',
    icon: <Settings className="size-4" />,
    shortcut: '⌘S',
  },
  {
    id: 'delete',
    label: 'حذف داده‌ها',
    icon: <Trash2 className="size-4" />,
    destructive: true,
  },
];

/* -------------------------------------------------------------------------- */
/* ۱. حالت پایه با استفاده از Shorthand (لیست اکشن‌های پروفایل)               */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  args: {
    size: 'default',
    side: 'bottom',
    align: 'start',
    trigger: (
      <Button outline className="gap-2" iconStart={<User />} iconEnd={<ChevronDown />}>
        حساب کاربری
      </Button>
    ),
    items: [
      {
        label: 'حساب کاربری',
        items: [
          {
            id: 'profile',
            label: 'مشاهده پروفایل',
            icon: <User className="size-4" />,
            shortcut: '⇧⌘P',
          },
          {
            id: 'settings',
            label: 'تنظیمات سیستم',
            icon: <Settings className="size-4" />,
            shortcut: '⌘S',
          },
        ],
      },
      {
        label: 'عملیات',
        items: [
          {
            id: 'support',
            label: 'پشتیبانی آنلاین',
            icon: <HelpCircle className="size-4" />,
          },
          {
            id: 'logout',
            label: 'خروج از حساب',
            icon: <LogOut className="size-4" />,
            destructive: true,
            shortcut: '⇧⌘Q',
          },
        ],
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* ۲. جهات مختلف باز شدن منو (Side: Top, Bottom, Left, Right)               */
/* -------------------------------------------------------------------------- */

export const PlacementsSide: Story = {
  render: () => {
    const sides: Array<{ side: 'top' | 'bottom' | 'left' | 'right'; label: string; icon: React.ReactNode }> = [
      { side: 'top', label: 'باز شدن به بالا (Top)', icon: <ArrowUp className="size-4" /> },
      { side: 'bottom', label: 'باز شدن به پایین (Bottom)', icon: <ArrowDown className="size-4" /> },
      { side: 'right', label: 'باز شدن به راست (Right)', icon: <ArrowRight className="size-4" /> },
      { side: 'left', label: 'باز شدن به چپ (Left)', icon: <ArrowLeft className="size-4" /> },
    ];

    return (
      <div className="grid grid-cols-2 gap-8 p-12">
        {sides.map(({ side, label, icon }) => (
          <div key={side} className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">{label}</span>
            <DropdownMenu
              side={side}
              align="center"
              trigger={
                <Button outline iconStart={icon}>
                  جهت: {side}
                </Button>
              }
              items={sampleItems}
            />
          </div>
        ))}
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/* ۳. ترازهای مختلف قرارگیری (Align: Start, Center, End)                     */
/* -------------------------------------------------------------------------- */

export const Alignments: Story = {
  render: () => {
    const aligns: Array<'start' | 'center' | 'end'> = ['start', 'center', 'end'];

    return (
      <div className="flex flex-wrap items-center justify-center gap-6 p-8">
        {aligns.map((align) => (
          <div key={align} className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">تراز: {align}</span>
            <DropdownMenu
              side="bottom"
              align={align}
              trigger={
                <Button outline>
                  Align: {align}
                </Button>
              }
              items={sampleItems}
            />
          </div>
        ))}
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/* ۴. منوی سه‌نقطه جدول‌ها و کارت‌ها (Icon Trigger / Actions Menu)            */
/* -------------------------------------------------------------------------- */

export const IconTriggerActions: Story = {
  render: () => (
    <DropdownMenu
      size="default"
      side="bottom"
      align="end"
      trigger={
        <Button variant="ghost" iconOnly aria-label="عملیات بیشتر">
          <MoreVertical className="size-4" />
        </Button>
      }
      items={[
        {
          id: 'edit',
          label: 'ویرایش اطلاعات',
          icon: <Edit className="size-4" />,
        },
        {
          id: 'duplicate',
          label: 'تکثیر سطر',
          icon: <Copy className="size-4" />,
        },
        {
          id: 'share',
          label: 'اشتراک‌گذاری',
          icon: <Share2 className="size-4" />,
        },
        {
          id: 'archive',
          label: 'انتقال به بایگانی',
          icon: <Archive className="size-4" />,
          disabled: true,
        },
        {
          id: 'delete',
          label: 'حذف دائمی',
          icon: <Trash2 className="size-4" />,
          destructive: true,
        },
      ]}
    />
  ),
};

/* -------------------------------------------------------------------------- */
/* ۵. مقایسه تمام سایزهای استاندارد ۵تایی ('sm' | 'default' | 'lg' | 'xl' | 'full') */
/* -------------------------------------------------------------------------- */

export const SizesComparison: Story = {
  render: () => {
    const sizes: ComponentSize[] = ['sm', 'default', 'lg', 'xl', 'full'];

    return (
      <div className="flex flex-wrap items-center justify-center gap-4 py-8">
        {sizes.map((size) => (
          <DropdownMenu
            key={size}
            size={size}
            trigger={
              <Button outline size="sm">
                سایز: {size}
              </Button>
            }
            items={sampleItems}
          />
        ))}
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/* ۶. پیاده‌سازی به روش ترکیبی اتمیک (Compound Component Pattern)              */
/* -------------------------------------------------------------------------- */

export const CompoundPattern: Story = {
  render: () => (
    <DropdownMenuRoot>
      <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">
        <span>منوی سفارشی ترکیبی</span>
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent size="lg" side="bottom" align="start">
        <DropdownMenuGroupLabel>پوشه‌ها و دسته‌ها</DropdownMenuGroupLabel>
        <DropdownMenuItem>
          <FolderPlus className="size-4 shrink-0" />
          <span>پوشه جدید</span>
          <span className="ms-auto text-xs text-muted-foreground">⌘N</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="size-4 shrink-0" />
          <span>کپی در مسیر...</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuGroupLabel>مدیریت</DropdownMenuGroupLabel>
        <DropdownMenuItem disabled>
          <Archive className="size-4 shrink-0" />
          <span>بایگانی خودکار (غیرفعال)</span>
        </DropdownMenuItem>
        <DropdownMenuItem destructive>
          <Trash2 className="size-4 shrink-0" />
          <span>حذف کامل پوشه</span>
          <span className="ms-auto text-xs text-destructive">⌫</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  ),
};

/* -------------------------------------------------------------------------- */
/* ۷. حالت‌های آیتم‌های مخرب و غیرفعال (Disabled & Destructive Items)         */
/* -------------------------------------------------------------------------- */

export const ItemStates: Story = {
  render: () => (
    <DropdownMenu
      size="default"
      trigger={<Button outline>بررسی وضعیت آیتم‌ها</Button>}
      items={[
        {
          id: 'active',
          label: 'آیتم فعال و قابل کلیک',
          icon: <User className="size-4" />,
        },
        {
          id: 'disabled',
          label: 'آیتم غیرفعال (Disabled)',
          icon: <Settings className="size-4" />,
          disabled: true,
          shortcut: 'قفل شده',
        },
        {
          id: 'destructive',
          label: 'آیتم خطرناک / مخرب (Destructive)',
          icon: <Trash2 className="size-4" />,
          destructive: true,
          shortcut: 'خطرناک',
        },
      ]}
    />
  ),
};

export const VariantsComparison: Story = {
  render: () => {
    const variants: Array<{
      variant: 'default' | 'primary' | 'secondary' | 'destructive' | 'success' | 'warning';
      label: string;
    }> = [
      { variant: 'default', label: 'Default' },
      { variant: 'primary', label: 'Primary' },
      { variant: 'secondary', label: 'Secondary' },
      { variant: 'destructive', label: 'Destructive' },
      { variant: 'success', label: 'Success' },
      { variant: 'warning', label: 'Warning' },
    ];

    return (
      <div className="flex flex-wrap items-center justify-center gap-4 py-8">
        {variants.map(({ variant, label }) => (
          <DropdownMenu
            key={variant}
            variant={variant}
            trigger={<Button outline variant={variant === "default" ? "primary" : variant}>{label}</Button>}
            items={sampleItems}
          />
        ))}
      </div>
    );
  },
};
