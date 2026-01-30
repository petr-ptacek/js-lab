# Function: isInteractiveElement()

> **isInteractiveElement**(`element`, `options`): `boolean`

Determines whether the given element is interactive or is contained
within an interactive element.

The function checks the element itself and its ancestors using
Element.closest against a set of CSS selectors.

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

## Remarks

Providing an empty `selectors` array disables interactive detection
and the function will always return `false`.

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

## Since

1.0.0
