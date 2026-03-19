---
title: range
category: array
tags:
  - array
  - range
  - numbers
  - sequence
  - python
  - iteration
since: 1.0.0
---


> **Category:** array
> **Since:** 1.0.0
> **Tags:** array, range, numbers, sequence, python, iteration


# range

Creates an array of numbers following the same semantics as Python's range.

## Usage

```ts
import { range } from "@petr-ptacek/js-core"

// Single argument - generates 0 to n-1
const numbers = range(5);
console.log(numbers); // [0, 1, 2, 3, 4]

// Two arguments - start to stop-1
const slice = range(2, 6);
console.log(slice); // [2, 3, 4, 5]

// Three arguments - with custom step
const evens = range(0, 10, 2);
console.log(evens); // [0, 2, 4, 6, 8]
```

## Why This Utility Exists

JavaScript lacks a built-in range function for generating numeric sequences. Common workarounds like `Array(n).fill().map((_, i) => i)` are verbose and less intuitive. This utility provides Python's familiar `range()` API with identical semantics.

## Signature

```ts
function range(stop: number): number[]
function range(start: number, stop: number): number[]
function range(start: number, stop: number, step: number): number[]
```

## Parameters

- `stop` (`number`): The end value (exclusive) when called with one argument.
- `start` (`number`, optional): The start value (inclusive) when called with two or three arguments.
- `step` (`number`, optional): The increment between values. Defaults to 1.

## Return Type

Returns an array of numbers generated according to the specified range parameters. The array length is determined by the range bounds and step size.

## Throws

- Throws `Error` when `step` is 0.


## Design Notes

The function follows Python's `range()` semantics exactly:
- Single argument: `range(stop)` generates [0, 1, ..., stop-1]
- Two arguments: `range(start, stop)` generates [start, start+1, ..., stop-1]
- Three arguments: `range(start, stop, step)` generates [start, start+step, ..., last] where last < stop

Negative steps are supported for countdown sequences. The function validates that step is not zero to prevent infinite loops.

## When To Use

Use `range` when you need:

- sequential number arrays for loops or indexing
- mathematical sequences with regular intervals
- Python-like range semantics in JavaScript
- array indices generation

## When Not To Use

Avoid when:

- working with very large ranges that could cause memory issues
- needing decimal precision (floating-point arithmetic limitations)
- requiring complex sequences that don't follow regular intervals
- single-use iteration where traditional for loops are more efficient

## Summary

`range` provides a Python-compatible way to generate numeric sequences in JavaScript with familiar API and identical behavior to Python's `range()`.


## Snippets

### basic.ts

```ts
import { range } from "@petr-ptacek/js-core";

// Single argument - generates 0 to n-1
const numbers = range(5);
console.log(numbers); // [0, 1, 2, 3, 4]

// Two arguments - start to stop-1
const slice = range(2, 6);
console.log(slice); // [2, 3, 4, 5]

// Three arguments - with custom step
const evens = range(0, 10, 2);
console.log(evens); // [0, 2, 4, 6, 8]

// Negative step for countdown
const countdown = range(5, 0, -1);
console.log(countdown); // [5, 4, 3, 2, 1]

```

### math-sequences.ts

```ts
import { range } from "@petr-ptacek/js-core";

// Generate multiples of 3
const multiplesOf3 = range(0, 30, 3);
console.log(multiplesOf3); // [0, 3, 6, 9, 12, 15, 18, 21, 24, 27]

// Generate odd numbers
const odds = range(1, 20, 2);
console.log(odds); // [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

// Create squares using map
const squares = range(1, 6).map((x: number) => x * x);
console.log(squares); // [1, 4, 9, 16, 25]

// Generate Fibonacci-like sequence using reduce
const fibonacci = range(10).reduce((acc, i) => {
  if (i === 0) {
    acc.push(0);
  } else if (i === 1) {
    acc.push(1);
  } else {
    const prev1 = acc[i - 1];
    const prev2 = acc[i - 2];
    if (prev1 !== undefined && prev2 !== undefined) {
      acc.push(prev1 + prev2);
    }
  }
  return acc;
}, [] as number[]);
console.log(fibonacci); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

```

### practical-usage.ts

```ts
import { range } from "@petr-ptacek/js-core";

// Generate array indices for iteration
const items = ["apple", "banana", "cherry", "date", "elderberry"];
const indices = range(items.length);

console.log("Items with indices:");
indices.forEach((i: number) => {
  console.log(`${i}: ${items[i]}`);
});

// Create pagination numbers
const totalPages = 10;
const pageNumbers = range(1, totalPages + 1);

console.log("Page numbers:", pageNumbers);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Generate test data
const testUsers = range(1, 6).map((id: number) => ({
  id,
  name: `User ${id}`,
  email: `user${id}@example.com`,
  active: id % 2 === 0
}));

console.log("Test users:", testUsers);
// [
//   { id: 1, name: "User 1", email: "user1@example.com", active: false },
//   { id: 2, name: "User 2", email: "user2@example.com", active: true },
//   ...
// ]

// Create time slots (hours)
const businessHours = range(9, 18).map((hour: number) => `${hour}:00`);
console.log("Business hours:", businessHours);
// ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

```




