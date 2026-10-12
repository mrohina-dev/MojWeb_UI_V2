import type { TableColumn } from '@/shared/components/ui/table';
import type { ColumnsProps, SvjSendFileItem } from '@/features/svj/send-file-list/types/salary-pay.types';
import Button from '@/shared/components/ui/button';
import { FileText, Eye, Check, X } from 'lucide-react';
import Badge from '@/shared/components/ui/badge';
import { formatDate, formatPrice } from '@/shared/lib/formatters';

export const getSvjSendFileColumns = ({
  onConfirmPayment,
  onCancelPayment,
  onViewDetails,
  onDownloadPdf,
  isActionLoading,
  isAnyActionLoading = false,
}: ColumnsProps = {}): TableColumn<SvjSendFileItem>[] => [
  {
    key: 'accNumber',
    header: 'شماره حساب',
    sortable: true,
    filterable: true,
    filterPlaceholder: 'جست‌وجوی شماره حساب...',
  },
  {
    key: 'serial',
    header: 'سریال',
    sortable: true,
    filterable: true,
    filterPlaceholder: 'جست‌وجوی سریال...',
  },
  {
    key: 'count',
    header: 'تعداد',
    align: 'center',
    sortable: true,
  },
  {
    key: 'sumPrice',
    header: 'مبلغ',
    align: 'center',
    sortable: true,
    cell: (row) => <span>{formatPrice(row.sumPrice)}</span>,
  },
  {
    key: 'statusName',
    header: 'وضعیت',
    align: 'center',
    sortable: true,
    filterable: true,
    cell: (row) => (
      <Badge variant="primary-subtle">
        {(row.statusName as string) ?? '-'}
      </Badge>
    ),
  },
  {
    key: 'createDate',
    header: 'تاریخ ارسال',
    sortable: true,
    filterable: true,
    cell: (row) => (
      <span>{formatDate(row.createDate as string, { time: 'hms' })}</span>
    ),
  },
  {
    key: 'actions',
    header: 'عملیات پرداخت',
    align: 'center',
    cell: (row) => {
      const isConfirmLoading = isActionLoading?.(row.id, 'confirm') ?? false;
      const isCancelLoading = isActionLoading?.(row.id, 'cancel') ?? false;

      return (
        <div className="flex items-center justify-center gap-1">
          {row.statusName === 'ثبت شده' && (
            <>
              <Button
                variant="success"
                size="xs"
                title="تایید پرداخت"
                stopPropagation
                loading={isConfirmLoading}
                disabled={isAnyActionLoading}
                iconStart={<Check className="size-3.5" />}
                onClick={() => onConfirmPayment?.(row)}
              />
              <Button
                variant="destructive"
                size="xs"
                title="لغو پرداخت"
                stopPropagation
                loading={isCancelLoading}
                disabled={isAnyActionLoading}
                iconStart={<X className="size-3.5" />}
                onClick={() => onCancelPayment?.(row)}
              />
            </>
          )}
        </div>
      );
    },
  },
  {
    key: 'info',
    header: 'جزئیات',
    align: 'center',
    cell: (row) => {
      const isPdfLoading = isActionLoading?.(row.id, 'pdf') ?? false;

      return (
        <div className="flex items-center justify-center gap-1">
          <Button
            variant="secondary"
            size="xs"
            title="مشاهده جزئیات"
            stopPropagation
            disabled={isAnyActionLoading}
            onClick={() => onViewDetails?.(row)}
          >
            <Eye className="size-3.5 text-muted-foreground hover:text-foreground" />
          </Button>
          <Button
            variant="secondary"
            size="xs"
            title="دریافت فایل PDF"
            stopPropagation
            outline
            loading={isPdfLoading}
            disabled={isAnyActionLoading}
            onClick={() => onDownloadPdf?.(row)}
          >
            <FileText className="size-3.5 text-primary" />
          </Button>
        </div>
      );
    },
  },
];
