---
title: isString
category: validation
tags:
  - validation
  - type-guard
  - string
  - typescript
since: 1.0.0
---


> **Category:** validation
> **Since:** 1.0.0
> **Tags:** validation, type-guard, string, typescript


# isString

Checks whether the given value is a string.

## Usage

```ts
import { isString } from "@petr-ptacek/js-core"

// Basic type checking
console.log(isString("hello"))     // true
console.log(isString(123))         // false
console.log(isString(null))        // false
console.log(isString(undefined))   // false

// Type guard usage
const value: unknown = "some text"

if (isString(value)) {
  // value is now typed as string
  console.log(value.toUpperCase())  // "SOME TEXT"
  console.log(value.length)         // 9
}
```

## Why This Utility Exists

While JavaScript provides `typeof value === "string"`, this utility adds TypeScript type guard functionality. It enables safe type narrowing in TypeScript while providing the same runtime behavior as the native type check, making it ideal for type-safe validation in generic functions and mixed-type scenarios.

## Signature

```ts
function isString(value: unknown): value is string
```

## Parameters

- `value` (`unknown`): The value to test for string type.

## Return Type

Returns a boolean indicating whether the value is a string. When `true`, TypeScript narrows the type to `string`.

## Design Notes

This utility is a wrapper around `typeof value === "string"` with TypeScript type guard enhancement:

1. **Runtime behavior**: Identical to native `typeof` check
2. **Type safety**: Provides type narrowing for TypeScript
3. **Zero overhead**: Compiles to direct `typeof` check
4. **Consistent API**: Matches other validation utilities in the library

The type guard enables safe string operations after validation without additional type assertions.

## When To Use

Use `isString` when you need:

- type-safe string validation in TypeScript
- generic functions that work with string types
- runtime type checking with compile-time type narrowing
- validation in APIs that accept mixed types
- type guards in discriminated union handling

## When Not To Use

Avoid when:

- you only need runtime checking without TypeScript benefits (use `typeof value === "string"`)
- working with known string types that don't require validation
- performance is critical and type checking is unnecessary
- you need to validate string content, not just string type

## Summary

`isString` provides type-safe string validation with TypeScript type guard functionality, enabling runtime type checking with compile-time type narrowing for safer string operations in generic and mixed-type scenarios.


## Snippets

### basic.ts

```ts
import { isString } from "@petr-ptacek/js-core";

// basic type checking examples
const testValues = [
  "hello world",
  "",
  "123",
  123,
  true,
  null,
  undefined,
  [],
  {}
];

testValues.forEach(value => {
  console.log(`${JSON.stringify(value)} is string:`, isString(value));
});

// Output:
// "hello world" is string: true
// "" is string: true
// "123" is string: true
// 123 is string: false
// true is string: false
// null is string: false
// undefined is string: false
// [] is string: false
// {} is string: false

```




