import type { CSSClassValue, ReadonlyRef } from "../../types";

export type UI = {
  root?: CSSClassValue;
  header?: CSSClassValue;
  content?: CSSClassValue;
  contentWrapper?: CSSClassValue;
  contentOverlay?: CSSClassValue;
  contentScroll?: CSSClassValue;
  footer?: CSSClassValue;
}

export interface Props {
  ui?: UI;
  scrollable?: boolean;
}

export type Slots = {
  header: () => void;
  default: () => void;
  footer: () => void;
  overlay: () => void;
  contentOverlay: () => void;
}

type ExposedEl = HTMLElement | null;

export type Expose = {
  /**
   * Root element of the scrollable area (positioning container for content overlay).
   */
  contentWrapper: ReadonlyRef<ExposedEl>;

  /**
   * Overlay container rendered above the scrollable area.
   */
  contentOverlay: ReadonlyRef<ExposedEl>;

  /**
   * Actual scroll container element (`overflow: auto` when `scrollable = true`).
   */
  contentScroll: ReadonlyRef<ExposedEl>;

  /**
   * Content element inside the scroll container.
   */
  content: ReadonlyRef<ExposedEl>;
}
