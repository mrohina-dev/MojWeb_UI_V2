import * as React from "react";
import type { CollapsibleContextValue } from "./collapsible.types";

export const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

export const useCollapsibleContext = (): CollapsibleContextValue => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      "Collapsible sub-components must be used within <BaseCollapsible />"
    );
  }
  return context;
};
