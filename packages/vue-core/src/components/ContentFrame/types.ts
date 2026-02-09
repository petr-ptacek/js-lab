import type { CSSClassValue } from "../../types";

export type UI = {
  root?: CSSClassValue;
  header?: CSSClassValue;
  content?: CSSClassValue;
  contentWrapper?: CSSClassValue;
  footer?: CSSClassValue;
}

export type ContentFrameProps = {
  ui?: UI;
  scrollable?: boolean;
}

export type ContentFrameSlots = {
  header?: () => void;
  default: () => void;
  footer?: () => void;
  contentBefore?: () => void;
  contentAfter?: () => void;
}
