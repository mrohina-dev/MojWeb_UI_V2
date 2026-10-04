import * as React from 'react';
import type { SidebarContextValue } from './Sidebar.types';

export const SidebarContext = React.createContext<SidebarContextValue | null>(null);
