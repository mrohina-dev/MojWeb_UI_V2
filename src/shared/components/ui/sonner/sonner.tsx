import { Toaster as Sonner } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";
import { toastVariants } from "./sonner.variants";
import "./sonner.css";
import type { ToasterProps } from "./sonner.type";

export const Toaster = ({
  showProgress = true,
  size,
  ...props
}: ToasterProps) => {
  return (
    <Sonner
      dir="rtl"
      position="top-center"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 shrink-0 text-success-600" />,
        info: <InfoIcon className="size-4 shrink-0 text-info-600" />,
        warning: <TriangleAlertIcon className="size-4 shrink-0 text-warning-600" />,
        error: <OctagonXIcon className="size-4 shrink-0 text-destructive-600" />,
        loading: <Loader2Icon className="size-4 shrink-0 animate-spin text-primary" />,
      }}
      toastOptions={{
        classNames: {
          toast: toastVariants({ variant: "default", size, showProgress }),
          description: "!text-muted-foreground text-xs opacity-90",
          actionButton:
            "font-medium rounded-lg text-xs px-3 py-1.5 transition-colors cursor-pointer",
          cancelButton:
            "!bg-muted/80 hover:!bg-muted !text-muted-foreground font-medium rounded-lg text-xs px-3 py-1.5 transition-colors cursor-pointer",
          success: toastVariants({ variant: "success", size, showProgress }),
          warning: toastVariants({ variant: "warning", size, showProgress }),
          error: toastVariants({ variant: "error", size, showProgress }),
          info: toastVariants({ variant: "info", size, showProgress }),
        },
      }}
      {...props}
    />
  );
};

export default Toaster;
