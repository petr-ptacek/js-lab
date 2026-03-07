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
