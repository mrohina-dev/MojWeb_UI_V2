import * as React from 'react';

export interface PageHeaderContextType {
  actions: React.ReactNode;
  setActions: (node: React.ReactNode) => void;
  customTitle?: string;
  setCustomTitle: (title: string | undefined) => void;
}

export const PageHeaderContext = React.createContext<PageHeaderContextType | null>(null);

export function usePageHeader(): PageHeaderContextType {
  const context = React.useContext(PageHeaderContext);
  if (!context) {
    throw new Error('usePageHeader must be used within a PageHeaderProvider');
  }
  return context;
}
