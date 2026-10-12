import * as React from "react";
import type { InputProps } from "../input";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  /**
   * آیا آیکون نمایش/مخفی‌سازی رمز عبور فعال باشد؟
   * @default true
   */
  showToggleIcon?: boolean;

  /**
   * آیکون دلخواه برای حالت نمایش پسورد (EyeOpen)
   */
  visibleIcon?: React.ReactNode;

  /**
   * آیکون دلخواه برای حالت مخفی بودن پسورد (EyeOff / ClosedEye)
   */
  hiddenIcon?: React.ReactNode;
}
