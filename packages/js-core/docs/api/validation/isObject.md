---
title: isObject
category: validation
tags:
  - validation
  - type-guard
  - object
  - typescript
since: 1.0.0
---


> **Category:** validation
> **Since:** 1.0.0
> **Tags:** validation, type-guard, object, typescript


# isObject

Checks whether the given value is an object (including arrays, but excluding null).

## Usage

```ts
import { isObject } from "@petr-ptacek/js-core"

// Type checking
console.log(isObject({}));              // true
console.log(isObject({ a: 1 }));        // true
console.log(isObject([]));              // true
console.log(isObject(new Date()));      // true
console.log(isObject(() => {}));        // true

console.log(isObject(null));            // false (null is not an object)
console.log(isObject(42));              // false
console.log(isObject("text"));          // false

// Type guard usage
const value: unknown = {};

if (isObject(value)) {
  // value is now typed as object
  // Can iterate properties or access as needed
}
```

## Why This Utility Exists

In JavaScript, `typeof null === 'object'` (a historical quirk), making the native typeof check misleading. This utility fixes that by properly excluding `null` while including all other object types (plain objects, arrays, functions, dates, etc.).

## Signature

```typescript
function isObject(value: unknown): value is object
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is an object. When `true`, TypeScript narrows the type to `object`.

## Design Notes

The implementation correctly distinguishes between:

- **Objects (true)**: `{}`, arrays, functions, dates, regexes, custom objects
- **Not objects (false)**: `null`, primitives (string, number, boolean, symbol, bigint, undefined)

The `null` check is essential because `typeof null === 'object'` in JavaScript.

## When To Use

Use `isObject` when you need to:

- distinguish objects from primitives and null
- validate that a value has properties to iterate
- separate complex types from simple ones
- type-narrow in generic functions

## When Not To Use

Avoid when:

- you specifically need plain objects (use `isPlainObject` instead)
- you only need to check for arrays (use `isArray` instead)
- you need to validate object structure (use dedicated validation libraries)
- you want to exclude functions or arrays (use `isPlainObject`)

## Summary

`isObject` provides a precise type guard for any object type while correctly excluding `null` and primitives, making it ideal for distinguishing complex from simple types.

See also: `isPlainObject` (plain objects only), `isArray` (arrays only), `isNull` (null specifically).






