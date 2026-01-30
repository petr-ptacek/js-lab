# Function: isInteractiveElement()

> **isInteractiveElement**(`element`, `options`): `boolean`

Determines whether the given element is interactive or is contained
within an interactive element.

The function uses Element.closest to check the element itself
and its ancestors against a set of CSS selectors.

## Parameters

### element

DOM element to test. If `null`, the function returns `false`.

`Element` | `null`

### options

[`InteractiveElementOptions`](../type-aliases/InteractiveElementOptions.md) = `{}`

Optional configuration for interactive element detection.

## Returns

`boolean`

`true` if the element matches or is inside an interactive element,
otherwise `false`.

## Examples

```ts
isInteractiveElement(event.target as Element);
```

```ts
isInteractiveElement(el, {
  selectors: [
    ...DEFAULT_INTERACTIVE_SELECTORS,
    "[role='button']",
  ],
});
```
