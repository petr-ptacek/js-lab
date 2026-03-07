# isInteractiveElement

Determines whether an element is interactive or is contained within an interactive element.

## Usage

```ts
import { isInteractiveElement } from "@petr-ptacek/js-core"

document.addEventListener("click", (event) => {
  const target = event.target as Element;
  
  if (isInteractiveElement(target)) {
    console.log("User clicked an interactive element");
  } else {
    console.log("User clicked a non-interactive area");
  }
});
```

## Why This Utility Exists

Distinguishing between clicks on interactive elements (buttons, links, form controls) and other elements is a common need in web applications. This is especially important for implementing custom click handlers, delegated event logic, or overlay behaviors that should skip interactive elements. The utility provides a reliable cross-browser way to check if an element is interactive using CSS selectors and the DOM's native `closest()` method.

## Signature

```typescript
function isInteractiveElement(element: Element | null, options?: InteractiveElementOptions): boolean
```

## Parameters

- `element` (`Element | null`): The DOM element to test. If `null`, the function returns `false`.
- `options` (`InteractiveElementOptions`, optional): Configuration for interactive element detection.
  - `selectors` (`readonly Selector[]`, optional): Custom CSS selectors that define interactive elements. If not provided, `DEFAULT_INTERACTIVE_SELECTORS` are used. Providing an empty array disables detection and always returns `false`.

## Return Type

Returns `true` if the element matches or is inside an interactive element based on the active selector set, otherwise `false`.

## Type Declarations

```ts
type Selector = keyof HTMLElementTagNameMap | string;

type InteractiveElementOptions = {
  selectors?: readonly Selector[];
}
```

## Default Interactive Selectors

The following CSS selectors are considered interactive by default:

- `button` - HTML button element
- `a` - HTML anchor (link) element
- `input` - HTML input element
- `textarea` - HTML textarea element
- `select` - HTML select element
- `[contenteditable='true']` - Any element with contenteditable set to true

These can be imported and extended:

```ts
import { 
  isInteractiveElement, 
  DEFAULT_INTERACTIVE_SELECTORS 
} from "@petr-ptacek/js-core"

isInteractiveElement(element, {
  selectors: [
    ...DEFAULT_INTERACTIVE_SELECTORS,
    "[role='button']",
    ".custom-interactive",
  ],
})
```

## Design Notes

The implementation uses the DOM's native `Element.closest()` method to check if the element or any of its ancestors matches the interactive selectors. This approach is:

- **Performance-efficient**: Leverages native DOM methods
- **Flexible**: Supports custom CSS selectors
- **Null-safe**: Handles null elements gracefully
- **Ancestor-aware**: Detects nested interactive elements (e.g., a span inside a button)

The function joins selectors into a single CSS selector string for `closest()`, making it performant even with multiple selectors.

## When To Use

Use `isInteractiveElement` when you need to:

- determine if a click target is an interactive element
- implement custom click delegation logic
- skip interactive elements in overlay or modal handling
- prevent default behaviors on non-interactive elements
- implement accessible focus management

## When Not To Use

Avoid when:

- you only need to detect a specific element type (use `instanceof` or `tagName` instead)
- you need to validate form inputs or user data
- you're implementing keyboard navigation (use native browser APIs)
- the selectors will be extremely large or complex (consider performance impact)

## Summary

`isInteractiveElement` provides a reliable, flexible way to detect interactive elements in the DOM. By leveraging CSS selectors and the native `closest()` API, it handles both direct matches and nested scenarios with minimal performance overhead.

