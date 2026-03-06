# MaybeNullable

Represents a value that may be `null` or `undefined`.

## Usage

```ts
import type { MaybeNullable } from "@petr-ptacek/js-core"

function processUserInput(input: MaybeNullable<string>): string {
  if (input != null) { // checks for both null and undefined
    return input.trim()
  }
  return "No input provided"
}

const result1 = processUserInput("hello") // "hello"
const result2 = processUserInput(null)    // "No input provided"  
const result3 = processUserInput(undefined) // "No input provided"
```

## Why This Type Exists

Many APIs and JavaScript operations can return either `null` or `undefined` to represent missing values. `MaybeNullable<T>` provides a unified type for handling both cases, making it clear that a value might be absent in either form and enabling consistent null-checking patterns.

## Type Declaration

```ts
type MaybeNullable<T> = T | null | undefined
```

## Type Parameters

- `<T>`: The base type that may also be `null` or `undefined`.

## When To Use

Use `MaybeNullable<T>` when:

- working with APIs that might return either `null` or `undefined`
- handling user input that could be missing in various ways
- dealing with optional properties that might be explicitly set to `null`
- you need to handle both `null` and `undefined` uniformly
- working with legacy code that uses both values inconsistently

```ts
// Form processing example
interface FormData {
  name: string;
  email: string;
  phone: MaybeNullable<string>; // could be null, undefined, or a value
  company: MaybeNullable<string>; // might be set to null explicitly
}

function processForm(data: FormData): string {
  let result = `${data.name} (${data.email})`;
  
  // Handle both null and undefined with single check
  if (data.phone != null) {
    result += `, Phone: ${data.phone}`;
  }
  
  const company = data.company ?? "No company";
  result += `, Company: ${company}`;
  
  return result;
}

// Legacy API integration
interface LegacyResponse {
  id: string;
  description: MaybeNullable<string>; // API sometimes returns null, sometimes undefined
  metadata: MaybeNullable<Record<string, any>>; // inconsistent nullability
}
```

## When Not To Use

Avoid when:

- you specifically need only `null` (use `MaybeNull<T>`)
- you specifically need only `undefined` (use `MaybeUndefined<T>`)
- you can control the API to use consistent null handling
- you need to distinguish between `null` and `undefined` semantically

## Design Notes

This type combines both `null` and `undefined` into a single union, allowing for:
- Unified null checking with `!= null` (checks both `null` and `undefined`)
- Consistent handling with nullish coalescing operator (`??`)
- Simplified type annotations for values that could be missing in either form

The type is equivalent to `T | null | undefined` and works well with JavaScript's loose equality checking.

## Summary

`MaybeNullable<T>` provides a unified approach to handling values that might be absent as either `null` or `undefined`, enabling consistent null-checking patterns and simplifying type annotations for APIs with mixed null/undefined semantics.
