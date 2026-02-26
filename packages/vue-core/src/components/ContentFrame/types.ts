import type { CSSClassValue, ReadonlyRef } from "../../types";

/**
 * CSS class overrides for individual component parts.
 */
export type UI = {
  /** Classes applied to the root element. */
  root?: CSSClassValue;
  /** Classes applied to the header section. */
  header?: CSSClassValue;
  /** Classes applied to the content element. */
  content?: CSSClassValue;
  /** Classes applied to the content wrapper (overlay positioning container). */
  contentWrapper?: CSSClassValue;
  /** Classes applied to the content overlay container. */
  contentOverlay?: CSSClassValue;
  /** Classes applied to the scroll container. */
  contentScroll?: CSSClassValue;
  /** Classes applied to the footer section. */
  footer?: CSSClassValue;
};

/**
 * Component props.
 */
export interface Props {
  /** Optional UI class overrides. */
  ui?: UI;
  /**
   * Enable internal scrolling inside the content area.
   * Defaults to true.
   */
  scrollable?: boolean;
}

/**
 * Component slots.
 */
export type Slots = {
  /** Header content. */
  header: () => void;
  /** Main content. */
  default: () => void;
  /** Footer content. */
  footer: () => void;
  /** Overlay rendered above the whole frame (root positioned). */
  overlay: () => void;
  /** Overlay rendered above the scrollable viewport. */
  contentOverlay: () => void;
};

/**
 * HTMLElement reference exposed by the component.
 */
type ExposedEl = HTMLElement | null;

/**
 * Exposed public API returned via `defineExpose`.
 */
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

  /**
   * Scroll to an explicit position. Returns false when not scrollable or not mounted.
   */
  scrollTo(options: ScrollToOptions): boolean;

  /**
   * Scroll to the top of the content. Returns false when not scrollable or not mounted.
   */
  scrollToTop(options?: Omit<ScrollToOptions, "top">): boolean;

  /**
   * Scroll to the bottom of the content. Returns false when not scrollable or not mounted.
   */
  scrollToBottom(options?: Omit<ScrollToOptions, "top">): boolean;
};

/**
 * Options passed to the internal controller.
 */
export type UseControllerOptions = Readonly<{
  /** Component props. */
  props: Props;
}>;
