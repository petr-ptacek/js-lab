---
title: entries
category: object
tags:
  - object
  - entries
  - typed
  - key-value
  - iteration
since: 1.0.0
---


> **Category:** object
> **Since:** 1.0.0
> **Tags:** object, entries, typed, key-value, iteration


# entries

Returns the enumerable own property [key, value] pairs of an object with preserved key and value types.

## Usage

```ts
import { entries } from "@petr-ptacek/js-core"

const user = {
  id: 1,
  name: "John",
  isActive: true,
};

for (const [key, value] of entries(user)) {
  console.log(`${key}: ${value}`);
}
```

## Why This Utility Exists

The native `Object.entries()` loses TypeScript type information, returning `[string, any][]` which provides no type safety. This utility preserves the exact types of both keys and values, enabling better IntelliSense and compile-time error checking.

## Signature

```ts
function entries<T extends object>(obj: T): {
  [K in keyof T]: [K, T[K]];
}[keyof T][]
```

## Parameters

- `obj` (`T extends object`): The object whose key-value pairs to return.

## Type Parameters

- `<T extends object>`: The type of the input object.

## Return Type

Returns an array of tuples where each tuple contains a property key and its corresponding value, with full type preservation. Only enumerable own properties are included.


## Design Notes

The function is a typed wrapper around `Object.entries` that maintains TypeScript type safety. It only returns enumerable own properties, following the same behavior as the native method but with enhanced type information.

The key types are preserved as literal string types rather than generic `string`, and value types are preserved as their exact types rather than `any`.

## When To Use

Use `entries` when you need to:

- iterate over object properties with preserved types
- convert objects to arrays while maintaining type safety
- work with key-value pairs in a type-safe manner
- get better IntelliSense support when working with object entries

## When Not To Use

Avoid when:

- you need all properties including non-enumerable ones (use `Object.getOwnPropertyNames`)
- you need properties from the prototype chain (use `for...in` loop)  
- you only need keys (use the `keys` utility)
- you only need values (use the `values` utility)
- working with objects where type safety is not a concern

## Summary

`entries` provides a type-safe way to work with object key-value pairs while maintaining full type preservation and familiar `Object.entries` API.


## Snippets

### basic.ts

```ts
import { entries } from "@petr-ptacek/js-core";

const user = {
  id: 1,
  name: "John",
  isActive: true,
};

for (const [key, value] of entries(user)) {
  // key: "id" | "name" | "isActive"
  // value: number | string | boolean
  console.log(`${key}: ${value}`);
}

```

### filter.ts

```ts
import { entries } from "@petr-ptacek/js-core";

const data = {
  id: 1,
  name: "Product",
  price: 99.99,
  internal: true,
};

// Filter out internal properties
const publicData = Object.fromEntries(
  entries(data).filter(([key]) => key !== "internal")
);

console.log(publicData);
// Output: { id: 1, name: "Product", price: 99.99 }

```

### transform.ts

```ts
import { entries } from "@petr-ptacek/js-core";

const original = {
  a: 1,
  b: 2,
  c: 3,
};

// Transform object values while preserving types
const doubled = Object.fromEntries(
  entries(original).map(([key, value]) => [key, value * 2])
);

console.log(doubled);
// Output: { a: 2, b: 4, c: 6 }

```




