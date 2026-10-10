import PageContainer from '@/components/layout/page-container';
import { type FC } from 'react';

const SvjSendFileListPage: FC = () => {
  return (
    <PageContainer
      title="لیست فایل های ارسالی واریز گروهی"
      size='sm'
      headerProps={{ variant: 'primary' }}
    >

        <p className="mt-2 text-sm text-muted-foreground">
         ماژول 1
        </p>
    </PageContainer>
  );
};

export default SvjSendFileListPage;
