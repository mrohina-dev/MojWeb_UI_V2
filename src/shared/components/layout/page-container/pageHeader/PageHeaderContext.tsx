import * as React from 'react';
import type { PageHeaderContextType } from './PageHeader.type';

export const PageHeaderContext = React.createContext<PageHeaderContextType | null>(null);

export function usePageHeader(): PageHeaderContextType {
  const context = React.useContext(PageHeaderContext);
  if (!context) {
    throw new Error('usePageHeader must be used within a PageHeaderProvider');
  }
  return context;
}
