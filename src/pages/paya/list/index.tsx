import { type FC } from 'react';

const PayaListPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="rounded-xl border border-border/60 bg-card p-6 shadow-xs">
        <h1 className="text-xl font-bold text-foreground">
          واریز گروهی پایا
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          شناسه ماژول: <code className="font-mono text-primary">paya-transfer</code> | مسیر: <code className="font-mono text-primary">/paya/List</code>
        </p>
      </div>
    </div>
  );
};

export default PayaListPage;
