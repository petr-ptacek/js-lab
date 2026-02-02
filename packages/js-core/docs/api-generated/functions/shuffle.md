# Function: shuffle()

> **shuffle**\<`T`\>(`array`): `T`[]

Returns a new array with elements shuffled in random order.

Uses the Fisher–Yates shuffle algorithm.
The original array is not mutated.

## Type Parameters

### T

`T` = `unknown`

## Parameters

### array

readonly `T`[]

The array to shuffle.

## Returns

`T`[]

A new array with elements in random order.

## See

[Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle/)

## Since

1.0.0

## Example

```ts
shuffle([1, 2, 3])
// → e.g. [2, 1, 3]
```
