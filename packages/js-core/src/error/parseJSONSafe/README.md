# parseJSONSafe

Safely parses a JSON string with optional fallback handling.

## Usage

```ts
import { parseJSONSafe } from "@petr-ptacek/js-core"

// with fallback
const data = parseJSONSafe('{"name": "Alice"}', { name: "Unknown" })
console.log(data) // { name: "Alice" }

// invalid JSON with fallback
const fallbackData = parseJSONSafe('invalid json', { name: "Unknown" })
console.log(fallbackData) // { name: "Unknown" }

// without fallback
const result = parseJSONSafe<{name: string}>('{"name": "Alice"}')
console.log(result) // { name: "Alice" } or undefined if invalid
```

## Why This Utility Exists

JSON parsing with `JSON.parse()` throws exceptions on invalid input, requiring try-catch blocks for safe handling. `parseJSONSafe` provides a simple, non-throwing alternative that returns fallback values or `undefined` on parsing failures, eliminating the need for explicit error handling while maintaining type safety.

## Signature

```ts
function parseJSONSafe<T>(value: string, fallback: T): T
function parseJSONSafe<T>(value: string): T | undefined
```

## Parameters

- `value` (`string`): JSON string to parse.
- `fallback` (`T`, optional): Fallback value returned when parsing fails. When provided, the return type is guaranteed to be `T`.

## Type Parameters

- `<T>`: The expected type of the parsed JSON value.

## Return Type

- **With fallback**: Returns `T` - either the parsed value or the provided fallback
- **Without fallback**: Returns `T | undefined` - either the parsed value or `undefined` if parsing fails

## Design Notes

The utility is built on top of `withTryCatchSync`, leveraging its structured error handling while providing a simplified API focused specifically on JSON parsing. The implementation:

1. Uses function overloads to provide type-safe behavior based on whether a fallback is provided
2. Always returns `result.data` from the underlying `withTryCatchSync` call
3. Handles `SyntaxError` exceptions thrown by `JSON.parse()` gracefully

The overloaded signatures ensure compile-time type safety - when a fallback is provided, the return type is guaranteed to be `T`, eliminating the need for undefined checks.

## When To Use

Use `parseJSONSafe` when you need:

- JSON parsing without exception handling
- fallback values for invalid JSON
- simple API without result objects or error details
- type-safe parsing with compile-time guarantees

## When Not To Use

Avoid when:

- you need detailed error information about parsing failures
- you want to distinguish between different types of errors
- you need the full result object with `ok`/`error` properties (use `withTryCatchSync` directly)
- you're parsing JSON that should always be valid (use `JSON.parse` with proper validation)

## Summary

`parseJSONSafe` provides a simple, safe alternative to `JSON.parse()` with optional fallback handling, built on structured error handling principles while maintaining a clean, focused API for common JSON parsing scenarios.
