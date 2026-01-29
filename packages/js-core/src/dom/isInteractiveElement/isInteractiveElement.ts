import type { InteractiveElementOptions, Selector } from "./types";

export const DEFAULT_INTERACTIVE_SELECTORS = [
  "button",
  "a",
  "input",
  "textarea",
  "select",
  "[contenteditable='true']",
] as const satisfies readonly Selector[];

export function isInteractiveElement(element: Element | null, options: InteractiveElementOptions = {}): boolean {
  if (!element) return false;

  const selectors = options.selectors ?? DEFAULT_INTERACTIVE_SELECTORS;

  if (selectors.length === 0) return false;

  return Boolean(element.closest(selectors.join(",")));
}
