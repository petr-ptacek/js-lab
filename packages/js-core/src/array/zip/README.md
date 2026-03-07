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
