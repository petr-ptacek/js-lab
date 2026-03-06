---
title: PrimitiveValue
category: type
tags:
  - type
  - primitive
  - javascript
  - union
  - value
since: 1.0.0
---


> **Category:** type
> **Since:** 1.0.0
> **Tags:** type, primitive, javascript, union, value


# PrimitiveValue

Represents a JavaScript primitive value.

## Usage

```ts
import type { PrimitiveValue } from "@petr-ptacek/js-core"

function isPrimitive(value: unknown): value is PrimitiveValue {
  const type = typeof value
  return type !== "object" || value === null
}

function processPrimitive(value: PrimitiveValue): string {
  if (value === null) return "null"
  if (value === undefined) return "undefined"
  return String(value)
}

const examples: PrimitiveValue[] = [
  "hello",      // string
  42,           // number  
  true,         // boolean
  Symbol("id"), // symbol
  123n,         // bigint
  null,         // null
  undefined     // undefined
]
```

## Why This Type Exists

JavaScript has seven primitive types, and distinguishing them from objects is fundamental for many operations like serialization, comparison, and type checking. `PrimitiveValue` provides a unified type that encompasses all primitive values including `null` and `undefined`, making it easier to write functions that work specifically with primitive data.

## Type Declaration

```ts
type PrimitiveValue =
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined
```

## When To Use

Use `PrimitiveValue` when:

- implementing serialization/deserialization logic
- creating type guards for primitive vs object values
- building utilities that work specifically with primitive data
- filtering or processing data based on primitive nature
- implementing deep comparison or cloning utilities

```ts
// Serialization example
function serializePrimitive(value: PrimitiveValue): string {
  if (value === null) return "null"
  if (value === undefined) return "undefined" 
  if (typeof value === "symbol") return value.toString()
  if (typeof value === "bigint") return value.toString() + "n"
  return JSON.stringify(value)
}

// Type guard example  
function isPrimitiveValue(value: unknown): value is PrimitiveValue {
  return value === null || typeof value !== "object"
}

// Data processing example
function extractPrimitives(obj: Record<string, unknown>): Record<string, PrimitiveValue> {
  const result: Record<string, PrimitiveValue> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (isPrimitiveValue(value)) {
      result[key] = value
    }
  }
  return result
}
```

## When Not To Use

Avoid when:

- you need to work with objects, arrays, or functions (use `object` or specific types)
- you need to exclude `null` and `undefined` (create a more specific union)
- you're working with a specific primitive type (use `string`, `number`, etc. directly)
- you need to distinguish between different object types

## Design Notes

This type includes all JavaScript primitive types as defined by the ECMAScript specification:

- **string**: Text data
- **number**: Numeric values (including `NaN` and `Infinity`)
- **boolean**: `true` or `false`
- **symbol**: Unique identifiers
- **bigint**: Arbitrary precision integers
- **null**: Intentional absence of value
- **undefined**: Uninitialized or missing value

The type is particularly useful for distinguishing primitives from objects, as `typeof null === "object"` in JavaScript but `null` is conceptually a primitive value.

## Summary

`PrimitiveValue` provides a comprehensive type for all JavaScript primitive values, enabling type-safe operations on primitive data while clearly distinguishing them from object types in TypeScript applications.





