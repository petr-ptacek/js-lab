# Type Alias: Predicate()\<T\>

> **Predicate**\<`T`\> = (`value`) => `boolean`

Represents a predicate function.

A predicate is a synchronous function that evaluates a value
and returns a boolean result.

Predicates are commonly used for filtering, validation,
conditional checks, and guard logic.

## Type Parameters

### T

`T`

## Parameters

### value

`T`

## Returns

`boolean`

## Example

```ts
const isPositive: Predicate<number> = (value) => value > 0;
```
