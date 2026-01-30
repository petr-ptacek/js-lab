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

## Examples

```ts
toPercentage(50, 200); // 25
```

```ts
toPercentage(1, 4); // 25
```
