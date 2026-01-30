# Function: shuffle()

> **shuffle**\<`T`\>(`array`): `T`[]

Returns a new array with elements shuffled in random order.

Uses the Fisher–Yates shuffle algorithm.

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

[Wiki](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle/)
The original array is not mutated.

## Example

```ts
shuffle([1, 2, 3])
// → e.g. [2, 1, 3]
```

## Since

1.0.0
