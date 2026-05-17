import type { CSSClassValue } from "../../type";

export type UI = {
  root?: CSSClassValue;
  header?: CSSClassValue;
  content?: CSSClassValue;
  contentWrapper?: CSSClassValue;
  footer?: CSSClassValue;
};

export type Props = {
  ui?: UI;
  scrollable?: boolean;
};

export type Slots = {
  header: () => void;
  default: () => void;
  footer: () => void;
  overlay: () => void;
  contentOverlay: () => void;
};
