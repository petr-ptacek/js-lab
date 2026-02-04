# Type Alias: Comparator()\<T\>

> **Comparator**\<`T`\> = (`a`, `b`) => `number`

Represents a comparison function.

A comparator compares two values of the same type and returns
a numeric result indicating their relative order.

The returned value follows this convention:
- a negative number if `a` is less than `b`
- zero if `a` and `b` are considered equal
- a positive number if `a` is greater than `b`

## Type Parameters

### T

`T`

## Parameters

### a

`T`

### b

`T`

## Returns

`number`

## Example

```ts
const compareNumbers: Comparator<number> = (a, b) => a - b;
```
