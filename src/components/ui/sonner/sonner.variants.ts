import { cva, type VariantProps } from "class-variance-authority";

export const toastVariants = cva(
  "group toast font-sans shadow-lg rounded-xl border p-4 transition-all duration-200 w-full relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "!bg-popover !text-popover-foreground !border-border after:!bg-primary/40 [&_[data-button]]:!bg-primary [&_[data-button]]:!text-primary-foreground",
        success:
          "!bg-success-50 !text-success-700 !border-success-100 after:!bg-success-500 [&_[data-button]]:!bg-success-600 [&_[data-button]]:!text-white hover:[&_[data-button]]:!bg-success-700",
        warning:
          "!bg-warning-50 !text-warning-700 !border-warning-100 after:!bg-warning-500 [&_[data-button]]:!bg-warning-600 [&_[data-button]]:!text-white hover:[&_[data-button]]:!bg-warning-700",
        error:
          "data-[type=error]:!bg-destructive-50 data-[type=error]:!text-destructive-700 data-[type=error]:!border-destructive-100 data-[type=error]:after:!bg-destructive-500 [&_[data-button]]:!bg-destructive-600 [&_[data-button]]:!text-white hover:[&_[data-button]]:!bg-destructive-700",
        info:
          "data-[type=info]:!bg-blue-50 data-[type=info]:!text-blue-700 data-[type=info]:!border-blue-100 data-[type=info]:after:!bg-blue-500 [&_[data-button]]:!bg-blue-600 [&_[data-button]]:!text-white hover:[&_[data-button]]:!bg-blue-700",
      },
      showProgress: {
        true: "toast-has-progress",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      showProgress: true,
    },
  }
);

export type ToastVariantProps = VariantProps<typeof toastVariants>;
