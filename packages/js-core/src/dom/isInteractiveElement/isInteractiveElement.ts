import type { InteractiveElementOptions, Selector } from "./types";

/**
 * Default set of CSS selectors used to detect interactive elements.
 *
 * Includes common interactive HTML elements such as buttons, links,
 * form controls and contenteditable elements.
 *
 * Can be imported and extended by consumers when custom behavior is needed.
 */
export const DEFAULT_INTERACTIVE_SELECTORS = [
  "button",
  "a",
  "input",
  "textarea",
  "select",
  "[contenteditable='true']",
] as const satisfies readonly Selector[];

/**
 * Determines whether the given element is interactive or is contained
 * within an interactive element.
 *
 * The function uses {@link Element.closest} to check the element itself
 * and its ancestors against a set of CSS selectors.
 *
 * @param element - DOM element to test. If `null`, the function returns `false`.
 * @param options - Optional configuration for interactive element detection.
 *
 * @returns `true` if the element matches or is inside an interactive element,
 * otherwise `false`.
 *
 * @example
 * ```ts
 * isInteractiveElement(event.target as Element);
 * ```
 *
 * @example
 * ```ts
 * isInteractiveElement(el, {
 *   selectors: [
 *     ...DEFAULT_INTERACTIVE_SELECTORS,
 *     "[role='button']",
 *   ],
 * });
 * ```
 */
export function isInteractiveElement(element: Element | null, options: InteractiveElementOptions = {}): boolean {
  if (!element) return false;

  const selectors = options.selectors ?? DEFAULT_INTERACTIVE_SELECTORS;

  if (selectors.length === 0) return false;

  return Boolean(element.closest(selectors.join(",")));
}
