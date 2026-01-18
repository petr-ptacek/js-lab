[**@petr-ptacek/js-core**](../../../README.md)

***

[@petr-ptacek/js-core](../../../README.md) / [math/toPercentage](../README.md) / toPercentage

# Function: toPercentage()

> **toPercentage**(`value`, `base`): `number`

Defined in: [math/toPercentage.ts:16](https://github.com/petr-ptacek/js-lab/blob/b8af6a5e28ed55129e4f160186c5aa9012c06563/packages/js-core/src/math/toPercentage.ts#L16)

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
