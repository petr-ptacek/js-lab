[**@petr-ptacek/js-core**](../../../README.md)

***

[@petr-ptacek/js-core](../../../README.md) / [math/clamp](../README.md) / clamp

# Function: clamp()

> **clamp**(`value`, `min`, `max`): `number`

Defined in: [math/clamp.ts:20](https://github.com/petr-ptacek/js-lab/blob/b8af6a5e28ed55129e4f160186c5aa9012c06563/packages/js-core/src/math/clamp.ts#L20)

Clamps a numeric value between a minimum and maximum boundary.

The function assumes `min` and `max` define a valid range.
If `min` is greater than `max`, the function throws an error.

## Parameters

### value

`number`

The value to clamp.

### min

`number`

The lower bound (inclusive).

### max

`number`

The upper bound (inclusive).

## Returns

`number`

The clamped value within the `[min, max]` range.

## Throws

If `min` is greater than `max`.

## Example

```ts
clamp(5, 0, 10); // 5
clamp(-5, 0, 10); // 0
clamp(20, 0, 10); // 10
```
