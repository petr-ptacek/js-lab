# shuffle

Returns a new array with elements shuffled in random order using the Fisher–Yates shuffle algorithm.

## Usage

```ts
import { shuffle } from "@petr-ptacek/js-core"

const numbers = [1, 2, 3, 4, 5];
const shuffled = shuffle(numbers);

console.log(shuffled); // [3, 1, 5, 2, 4] (random order)
```

## Why This Utility Exists

JavaScript doesn't provide a built-in shuffle method, and common approaches like `array.sort(() => Math.random() - 0.5)` are mathematically incorrect and produce biased results. This utility implements the Fisher–Yates shuffle algorithm which guarantees uniform distribution where each permutation has equal probability.

## Signature

```ts
function shuffle<T>(array: readonly T[]): T[]
```

## Parameters

- `array` (`readonly T[]`): The array to shuffle.

## Type Parameters

- `<T>`: The type of elements in the array.

## Return Type

Returns a new array containing all elements from the input array in randomized order. The original array is not modified.

## Design Notes

The implementation uses the modern Fisher–Yates shuffle algorithm:
- Creates a copy of the input array to maintain immutability
- Iterates from the last element backward
- For each position, selects a random element from the remaining unshuffled portion
- Swaps the current element with the randomly selected one


## When To Use

Use `shuffle` when you need:

- random ordering of array elements
- mathematically correct uniform distribution
- immutable shuffling without modifying the original array
- type-safe randomization with TypeScript

## When Not To Use

Avoid when:

- cryptographically secure randomness is required (uses `Math.random()`)
- you need to shuffle in-place to save memory
- deterministic "random" ordering with seeds is needed
- working with extremely large arrays where memory is constrained

## Summary

`shuffle` provides a mathematically correct way to randomize array elements using the Fisher–Yates algorithm while preserving immutability and type safety.
