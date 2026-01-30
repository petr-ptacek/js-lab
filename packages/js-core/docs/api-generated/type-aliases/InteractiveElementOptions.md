# Type Alias: InteractiveElementOptions

> **InteractiveElementOptions** = `object`

Options for [isInteractiveElement](../functions/isInteractiveElement.md).

## Since

1.0.0

## Properties

### selectors?

> `optional` **selectors**: readonly `Selector`[]

List of CSS selectors that define which elements are considered interactive.

If not provided, [DEFAULT\_INTERACTIVE\_SELECTORS](../variables/DEFAULT_INTERACTIVE_SELECTORS.md) are used.

Providing an empty array disables interactive detection entirely
and the function will always return `false`.
