import * as React from "react";
import type { AccordionContextValue } from "./accordion.types";

export const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export const useAccordionContext = (): AccordionContextValue => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion sub-components must be used within <BaseAccordion />"
    );
  }
  return context;
};
