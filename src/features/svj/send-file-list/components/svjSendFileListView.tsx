// src/features/svj/send-file-list/components/svj-send-file-list.tsx
import { useCallback, useMemo, useState, type FC } from 'react';
import { Table } from '@/shared/components/ui/table';
import type { ActionType, ActiveAction, SvjSendFileItem } from '../types/salary-pay.types';
import { getSvjSendFileColumns } from './svjSendFileColumns';
import salaryPayService from '../api/svj.service';
import { useSvjSendFiles } from '../api/useSvjSendFiles';

const SvjSendFileList: FC = () => {
    const {
        data,
        totalCount,
        isLoading,
        pageIndex,
        pageSize,
        setPageIndex,
        setPageSize,
        refetch,
    } = useSvjSendFiles();

    const [activeAction, setActiveAction] = useState<ActiveAction | null>(null);

    // عملیات تایید پرداخت
    const handleConfirmPayment = useCallback((row: SvjSendFileItem) => {
        setActiveAction({ id: row.id, type: 'confirm' });
        try {
            console.log('Confirm payment for:', row.id);
        } finally {
            setActiveAction(null);
        }
    }, []);

    // عملیات لغو پرداخت
    const handleCancelPayment = useCallback(
        async (row: SvjSendFileItem) => {
            if (!row.serial) return;

            setActiveAction({ id: row.id, type: 'cancel' });
            try {
                await salaryPayService.postSalaryCancel({
                    account: row.accNumber,
                    serial: row.serial,
                    type: 1,
                });
                refetch();
            } catch {
                // خطا توسط Interceptor نمایش داده می‌شود
            } finally {
                setActiveAction(null);
            }
        },
        [refetch]
    );

    const handleViewDetails = useCallback((row: SvjSendFileItem) => {
        console.log('View details for:', row.id);
    }, []);

    const handleDownloadPdf = useCallback(async (row: SvjSendFileItem) => {
        setActiveAction({ id: row.id, type: 'pdf' });
        try {
            console.log('Download PDF for:', row.id);
        } finally {
            setActiveAction(null);
        }
    }, []);

    const isActionLoading = useCallback(
        (rowId: number | string, action: ActionType) => {
            return activeAction?.id === rowId && activeAction?.type === action;
        },
        [activeAction]
    );

    const isAnyActionLoading = activeAction !== null;

    const columns = useMemo(
        () =>
            getSvjSendFileColumns({
                onConfirmPayment: handleConfirmPayment,
                onCancelPayment: handleCancelPayment,
                onViewDetails: handleViewDetails,
                onDownloadPdf: handleDownloadPdf,
                isActionLoading,
                isAnyActionLoading,
            }),
        [
            handleConfirmPayment,
            handleCancelPayment,
            handleViewDetails,
            handleDownloadPdf,
            isActionLoading,
            isAnyActionLoading,
        ]
    );

    return (
        <Table<SvjSendFileItem>
            rowKey="id"
            columns={columns}
            data={data}
            isLoading={isLoading}
            loadingRows={pageSize}
            pagination
            manualPagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalRows={totalCount}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
            showRowIndex
            variant="secondary"
        />
    );
};

export default SvjSendFileList
