# isEmptyString

Checks whether the provided value is the empty string literal.

## Usage

```ts
import { isEmptyString } from "@petr-ptacek/js-core"

const values = ["", "text", null, undefined]

values.forEach(value => {
  console.log(`${JSON.stringify(value)} is empty string:`, isEmptyString(value))
})
```

## Why This Utility Exists

Native runtime checks (`value === ""`) are trivial, but without a helper you lose
TypeScript type narrowing. `isEmptyString` provides a dedicated type guard that keeps
type information straight in generic code, validation flows, and unknown inputs.

## Signature

```ts
function isEmptyString(value: unknown): value is ""
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns `true` when the input is exactly `""`, `false` otherwise. When the function
returns `true`, TypeScript infers the literal type `""`.

## Design Notes

1. Based on the strict equality check (`value === ""`), so it keeps zero runtime
   overhead and behaves identically to vanilla JS.
2. Acts as a TypeScript type guard allowing downstream code to work with the empty
   string literal without additional assertions.

## When To Use

- When you need to ensure a value is literally the empty string before calling
  string-specific APIs.
- In form validation or normalization helpers where empty strings must be treated
  differently from `null`/`undefined`.
- When typing branches that depend on empty-string-specific logic for TypeScript.

## When Not To Use

- When you already statically know the value is a string.
- When you only care about truthiness/falsiness rather than the literal `""`.

## Summary

`isEmptyString` keeps validation readable while giving TypeScript the literal type
information it needs for empty-string-specific paths.
