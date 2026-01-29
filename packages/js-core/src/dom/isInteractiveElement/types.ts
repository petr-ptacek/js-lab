// eslint-disable-next-line no-undef
export type Selector = keyof HTMLElementTagNameMap | string;

/**
 * Options for {@link isInteractiveElement}.
 */
export type InteractiveElementOptions = {
  /**
   * List of CSS selectors that define which elements are considered interactive.
   *
   * If not provided, {@link DEFAULT_INTERACTIVE_SELECTORS} are used.
   *
   * Providing an empty array disables interactive detection entirely
   * and the function will always return `false`.
   */
  selectors?: readonly Selector[];
}
