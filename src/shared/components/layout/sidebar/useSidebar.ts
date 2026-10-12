import * as React from 'react';
import { SidebarContext } from './SidebarContext';
import type { SidebarContextValue } from './Sidebar.types';

export function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a <SidebarProvider />');
  }
  return context;
}
