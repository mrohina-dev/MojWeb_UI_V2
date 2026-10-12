import {
  Select as SelectBase,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectIcon,
  SelectItem,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";
import type { SelectComponentType } from "./select.types";

export const Select = Object.assign(SelectBase, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator,
}) as SelectComponentType;

export {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
};

export type * from "./select.types";
export * from "./select.variants";
export default Select;
