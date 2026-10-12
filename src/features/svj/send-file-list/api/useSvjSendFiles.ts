import salaryPayService from '@/features/svj/send-file-list/api/svj.service';
import type { SvjSendFileItem } from '@/features/svj/send-file-list/types/salary-pay.types';
import { useEffect, useState } from 'react';

export function useSvjSendFiles() {
  const [data, setData] = useState<SvjSendFileItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [reloadTrigger, setReloadTrigger] = useState<number>(0);

  useEffect(() => {
    let ignore = false;

    async function fetchSvjData() {
      setIsLoading(true);

      try {
        const response = await salaryPayService.getSendFileList({
          size: pageSize,
          page: pageIndex,
        });

        if (!ignore) {
          setData(response.uploadedFile ?? []);
          setTotalCount(response.totalCount ?? 0);
        }
      } catch {
        if (!ignore) {
          setData([]);
          setTotalCount(0);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void fetchSvjData();

    return () => {
      ignore = true;
    };
  }, [pageSize, pageIndex, reloadTrigger]);

  const refetch = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1);
  };

  return {
    data,
    totalCount,
    isLoading,
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize: handlePageSizeChange,
    refetch,
  };
}
