import * as React from 'react';
import { PageHeaderContext, usePageHeader } from './PageHeaderContext';

export interface PageHeaderProviderProps {
  children: React.ReactNode;
}

export function PageHeaderProvider({ children }: PageHeaderProviderProps) {
  const [actions, setActions] = React.useState<React.ReactNode>(null);
  const [customTitle, setCustomTitle] = React.useState<string | undefined>();

  const value = React.useMemo(
    () => ({
      actions,
      setActions,
      customTitle,
      setCustomTitle,
    }),
    [actions, customTitle]
  );

  return (
    <PageHeaderContext.Provider value={value}>
      {children}
    </PageHeaderContext.Provider>
  );
}

export interface PageActionsProps {
  children: React.ReactNode;
}

export function PageActions({ children }: PageActionsProps) {
  const { setActions } = usePageHeader();

  React.useEffect(() => {
    setActions(children);
    return () => setActions(null);
  }, [children, setActions]);

  return null;
}
