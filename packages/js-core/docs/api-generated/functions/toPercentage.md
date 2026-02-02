# Function: toPercentage()

> **toPercentage**(`value`, `base`): `number`

Converts a numeric value to a percentage relative to a given base.

## Parameters

### value

`number`

The value to convert into a percentage.

### base

`number`

The base value representing 100%. Must not be 0.

## Returns

`number`

The calculated percentage value.

## Throws

Throws an error if `base` is 0.

## Since

1.0.0

## Example

```ts
toPercentage(1, 4); // 25
toPercentage(2, 4); // 50
toPercentage(3, 4); // 75
toPercentage(4, 4); // 100
```
