# isAbortError

Checks whether a value is a `DOMException` with `name === "AbortError"`.

## Usage

```ts
import { isAbortError } from "@petr-ptacek/js-core"

try {
  await fetch("/api/data", { signal });
} catch (error) {
  if (isAbortError(error)) {
    return; // request was cancelled — ignore
  }
  throw error;
}
```

## Why This Utility Exists

`AbortError` is not a dedicated class — it is a `DOMException` instance with `name === "AbortError"`. Checking this
inline is repetitive and error-prone. This utility provides a reusable, readable predicate that also acts as a
TypeScript type guard.

## Signature

```ts
function isAbortError(error: unknown): error is DOMException
```

## Parameters

- `error` (`unknown`): The value to test.

## Return Type

Returns `true` if `error` is a `DOMException` with `name === "AbortError"`, otherwise `false`.

When `true`, TypeScript narrows `error` to `DOMException`.

## Design Notes

`AbortError` is thrown by browser APIs that support cancellation via `AbortSignal` — most notably `fetch`. The check
requires both an `instanceof DOMException` guard and a `name` comparison, since `DOMException` uses the `name` property
to differentiate error subtypes rather than separate subclasses.

## When To Use

Use `isAbortError` when you need to:

- distinguish abort errors from other errors in a `catch` block
- silently ignore aborted requests in UI components
- handle cancellation cleanly without inline `instanceof` checks

## When Not To Use

Avoid when:

- you want to handle all errors uniformly without branching
- you need to detect timeouts or other `DOMException` subtypes (check `error.name` directly)

## Summary

`isAbortError` is a minimal type guard for identifying `AbortError` instances, eliminating repetitive inline checks in
async error handling.

