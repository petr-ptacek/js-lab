# Function: getRandomNumber()

> **getRandomNumber**(`from`, `to`): `number`

Returns a random integer within the given inclusive range.

The returned value is always an integer between `from` and `to`,
including both boundary values.

## Parameters

### from

`number` = `0`

Lower bound (inclusive). Defaults to `0`.

### to

`number` = `Number.MAX_SAFE_INTEGER`

Upper bound (inclusive). Defaults to `Number.MAX_SAFE_INTEGER`.

## Returns

`number`

A random integer between `from` and `to` (inclusive).

## Throws

Error If `from` is greater than `to`.

## Examples

```ts
getRandomNumber(0, 20) // → 0, 5, 20, ...
```

```ts
getRandomNumber(5, 5) // → 5
```

```ts
getRandomNumber(-10, 10)
```
