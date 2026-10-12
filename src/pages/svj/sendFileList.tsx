import type { FC } from 'react';
import PageContainer from '@/shared/components/layout/page-container';
import SvjSendFileList from '@/features/svj/send-file-list';

const SvjSendFileListPage: FC = () => {
  return (
    <PageContainer
      title="لیست فایل‌های ارسال شده"
      size="sm"
      headerProps={{ variant: 'primary' }}
      withCard={false}
    >
      <SvjSendFileList />
    </PageContainer>
  );
};

export default SvjSendFileListPage;
