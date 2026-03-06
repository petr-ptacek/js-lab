# getRandomNumber

Returns a random integer within the given inclusive range.

## Usage

```ts
import { getRandomNumber } from "@petr-ptacek/js-core"

// random number between 1 and 6 (dice roll)
const dice = getRandomNumber(1, 6)
console.log(dice) // 1, 2, 3, 4, 5, or 6

// random number from 0 to 100
const percentage = getRandomNumber(0, 100)
console.log(percentage) // 0 to 100

// using defaults (0 to MAX_SAFE_INTEGER)
const largeRandom = getRandomNumber()
console.log(largeRandom) // 0 to 9007199254740991
```

## Why This Utility Exists

JavaScript's `Math.random()` returns floating-point values between 0 and 1, requiring manual conversion and range calculations for integer ranges. `getRandomNumber` provides a simple, consistent API for generating random integers within inclusive bounds with proper validation and edge case handling.

## Signature

```ts
function getRandomNumber(from?: number, to?: number): number
```

## Parameters

- `from` (`number`, optional): Lower bound (inclusive). Defaults to `0`.
- `to` (`number`, optional): Upper bound (inclusive). Defaults to `Number.MAX_SAFE_INTEGER`.

## Return Type

Returns a `number` representing a random integer within the specified range (inclusive of both bounds).

## Throws

- Throws `Error` when `from` is greater than `to`.

## Design Notes

The implementation uses the standard formula for converting `Math.random()` to an integer range:

```ts
Math.floor(Math.random() * (to - from + 1)) + from
```

Key design decisions:

1. **Inclusive bounds**: Both `from` and `to` are included in the possible results
2. **Input validation**: Ensures `from <= to` to prevent invalid ranges
3. **Default values**: Provides sensible defaults (0 and MAX_SAFE_INTEGER)
4. **Integer output**: Always returns whole numbers using `Math.floor()`

The formula adds 1 to the range calculation `(to - from + 1)` to make the upper bound inclusive.

## When To Use

Use `getRandomNumber` when you need:

- dice rolls or game mechanics
- random array indices
- test data generation with specific ranges
- random sampling from discrete sets
- simulation or statistical applications

## When Not To Use

Avoid when:

- you need floating-point random values (use `Math.random()` directly)
- you need cryptographically secure randomness (use `crypto.getRandomValues()`)
- you need reproducible randomness with seeds (use a seeded PRNG library)
- working with very large ranges that exceed safe integer limits

## Summary

`getRandomNumber` provides a simple, validated way to generate random integers within inclusive bounds, eliminating the need for manual range conversion and ensuring consistent behavior across different random number generation scenarios.
