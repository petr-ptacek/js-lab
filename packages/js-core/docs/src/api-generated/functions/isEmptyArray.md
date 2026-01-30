# Function: isEmptyArray()

> **isEmptyArray**\<`T`\>(`value`): `value is T[]`

Checks whether the given value is an empty array.

Acts as a type guard and narrows the value to an empty array of type `T[]`
when true.

## Type Parameters

### T

`T` = `unknown`

Type of array elements.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is T[]`

`true` if the value is an array with zero length, otherwise `false`.

## Examples

```ts
isEmptyArray([]);        // true
isEmptyArray([1, 2]);   // false
isEmptyArray("text");   // false
```

```ts
const value: unknown = [];

if (isEmptyArray<string>(value)) {
  value.length; // 0
}
```
