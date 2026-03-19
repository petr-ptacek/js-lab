# isPlainObject

Checks whether the given value is a plain object.

## Usage

```ts
import { isPlainObject } from "@petr-ptacek/js-core"

// Plain objects
console.log(isPlainObject({}));              // true
console.log(isPlainObject({ a: 1 }));       // true
console.log(isPlainObject(Object.create({}))); // true

// Not plain objects
console.log(isPlainObject([]));              // false (array)
console.log(isPlainObject(new Date()));      // false (Date instance)
console.log(isPlainObject(null));            // false (null)
console.log(isPlainObject(() => {}));        // false (function)

// Type guard usage
const value: unknown = { name: "John" };

if (isPlainObject(value)) {
  // value is now typed as Record<string, unknown>
  const name = value.name;
}
```

## Why This Utility Exists

JavaScript has many object-like types (arrays, Date, Map, functions, etc.). When you need to work with only plain objects (dictionaries/maps), checking `typeof value === 'object'` is insufficient. This utility precisely identifies plain objects created via object literals, `{}`, or `Object.create()`, excluding arrays, class instances, and other special objects.

## Signature

```typescript
function isPlainObject(value: unknown): value is Record<string, unknown>
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is a plain object. When `true`, TypeScript narrows the type to `Record<string, unknown>`.

## Design Notes

A plain object is defined as:

1. An object type (checked via `typeof value === 'object'`)
2. Not `null`
3. Not an array (checked via `Array.isArray`)
4. An instance of `Object` or has `Object` in its prototype chain

The implementation uses `Object.getPrototypeOf` to verify that the object's prototype chain originates from `Object`:

```typescript
const proto = Object.getPrototypeOf(value);
return proto === Object.prototype || proto === null;
```

This correctly identifies:
- **Plain objects**: `{}`, `{ a: 1 }`, `Object.create(null)`
- **Not plain**: arrays, Dates, Maps, Sets, DOM elements, class instances

## When To Use

Use `isPlainObject` when you need to:

- validate that a value is a plain dictionary/map
- process configuration objects
- validate JSON-like data structures
- distinguish plain objects from special types
- serialize or clone objects

## When Not To Use

Avoid when:

- you need any object type (use `isObject` instead)
- you specifically need arrays (use `isArray` instead)
- you need to accept class instances (use custom validation)
- you want to allow functions or other special types

## Summary

`isPlainObject` provides a precise type guard for plain objects, distinguishing them from arrays, class instances, and other special object types.

See also: `isObject` (any object including arrays and special types), `isArray` (arrays only).

