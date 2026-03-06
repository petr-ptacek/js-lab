---
title: zip
category: object
tags:
  - array
  - zip
  - combine
  - pairs
  - mapping
  - transform
since: 1.0.0
---


> **Category:** object
> **Since:** 1.0.0
> **Tags:** array, zip, combine, pairs, mapping, transform


# zip

Combines two arrays element-wise into pairs or applies a mapping function to each pair.

## Usage

```ts
import { zip } from "@petr-ptacek/js-core"

// Basic pairing
const numbers = [1, 2, 3];
const letters = ["a", "b", "c"];
const pairs = zip(numbers, letters);
console.log(pairs); // [[1, "a"], [2, "b"], [3, "c"]]

// With mapper function
const sums = zip([1, 2, 3], [10, 20, 30], (a, b) => a + b);
console.log(sums); // [11, 22, 33]
```

## Why This Utility Exists

JavaScript lacks a built-in zip function for combining arrays element-wise. Common workarounds require verbose loops or
complex array manipulations. This utility provides a clean API for pairing elements from two arrays with optional
transformation.

## Signature

```ts
// Without mapper - returns tuples
function zip<T, U>(
  arrayOne: readonly T[],
  arrayTwo: readonly U[],
): [T, U][]

// With mapper - returns transformed values
function zip<T, U, R>(
  arrayOne: readonly T[],
  arrayTwo: readonly U[],
  mapper: (a: T, b: U) => R,
): R[]
```

## Parameters

- `arrayOne` (`readonly T[]`): The first array to zip.
- `arrayTwo` (`readonly U[]`): The second array to zip.
- `mapper` (`(a: T, b: U) => R`, optional): Function to transform each pair into a single value.

## Type Parameters

- `<T>`: The element type of the first array.
- `<U>`: The element type of the second array.
- `<R>`: The return type when using a mapper function.

## Return Type

Returns an array of tuples `[T, U][]` when no mapper is provided, or an array of transformed values `R[]` when a mapper
function is used. The resulting array length equals the shorter of the two input arrays.

## Design Notes

The resulting array length is determined by the shorter input array - excess elements from the longer array are ignored.
The input arrays are never mutated.

The function uses function overloads to provide different return types based on whether a mapper is provided, ensuring
proper type safety in both use cases.

## When To Use

Use `zip` when you need to:

- combine elements from two arrays at matching indices
- transform pairs of elements with a mapping function
- iterate over two arrays simultaneously
- merge data from parallel arrays

## When Not To Use

Avoid when:

- working with more than two arrays (consider multiple zip calls)
- arrays have significantly different lengths and you need all elements
- you need to preserve information about which array was longer
- simple array concatenation is sufficient

## Summary

`zip` provides a clean way to combine two arrays element-wise with optional transformation, handling type safety and
length differences automatically.


## Snippets

### basic.ts

```ts
import { zip } from "@petr-ptacek/js-core";

// Basic array pairing
const numbers = [1, 2, 3, 4];
const letters = ["a", "b", "c"];
const pairs = zip(numbers, letters);

console.log(pairs); // [[1, "a"], [2, "b"], [3, "c"]]
// Note: 4 is ignored because letters array is shorter

// Different types
const ids = [1, 2, 3];
const names = ["Alice", "Bob", "Charlie"];
const users = zip(ids, names);

console.log(users);
// [[1, "Alice"], [2, "Bob"], [3, "Charlie"]]

// Destructuring in loops
for (const [id, name] of users) {
  console.log(`User ${id}: ${name}`);
}

```

### practical-usage.ts

```ts
import { zip } from "@petr-ptacek/js-core";

// Coordinate operations
const xCoords = [1, 2, 3, 4, 5];
const yCoords = [10, 20, 30, 40, 50];

// Create point objects
const points = zip(xCoords, yCoords, (x, y) => ({ x, y }));
console.log(points);
// [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }, ...]

// Calculate distances from origin
const distances = zip(xCoords, yCoords, (x, y) => Math.sqrt(x * x + y * y));
console.log(distances); // [10.05, 20.1, 30.15, ...]

// Data merging from parallel arrays
const userIds = [1, 2, 3];
const userEmails = ["alice@example.com", "bob@example.com", "charlie@example.com"];
const userRoles = ["admin", "user", "moderator"];

// Merge into user objects (using nested zip)
const users = zip(userIds, userEmails).map(([id, email], index) => ({
  id,
  email,
  role: userRoles[index]
}));

console.log(users);
// [
//   { id: 1, email: "alice@example.com", role: "admin" },
//   { id: 2, email: "bob@example.com", role: "user" },
//   { id: 3, email: "charlie@example.com", role: "moderator" }
// ]

// Form validation - check field values against rules
const formValues = ["john@email.com", "password123", "John"];
const validationRules = [
  (val: string) => val.includes("@"),
  (val: string) => val.length >= 8,
  (val: string) => val.length > 0
];

const validationResults = zip(formValues, validationRules, (value, rule) => ({
  value,
  isValid: rule(value)
}));

console.log(validationResults);
// [
//   { value: "john@email.com", isValid: true },
//   { value: "password123", isValid: true },
//   { value: "John", isValid: true }
// ]

```

### with-mapper.ts

```ts
import { zip } from "@petr-ptacek/js-core";

// Mathematical operations
const values1 = [1, 2, 3, 4];
const values2 = [10, 20, 30, 40];

// Addition
const sums = zip(values1, values2, (a, b) => a + b);
console.log(sums); // [11, 22, 33, 44]

// Multiplication
const products = zip(values1, values2, (a, b) => a * b);
console.log(products); // [10, 40, 90, 160]

// String operations
const firstNames = ["John", "Jane", "Bob"];
const lastNames = ["Doe", "Smith", "Johnson"];
const fullNames = zip(firstNames, lastNames, (first, last) => `${first} ${last}`);
console.log(fullNames); // ["John Doe", "Jane Smith", "Bob Johnson"]

// Creating objects
const prices = [10.99, 25.50, 7.25];
const quantities = [2, 1, 3];
const totals = zip(prices, quantities, (price, qty) => ({
  unitPrice: price,
  quantity: qty,
  total: price * qty
}));

console.log(totals);
// [
//   { unitPrice: 10.99, quantity: 2, total: 21.98 },
//   { unitPrice: 25.50, quantity: 1, total: 25.50 },
//   { unitPrice: 7.25, quantity: 3, total: 21.75 }
// ]

```




