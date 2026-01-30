# Function: isArray()

> **isArray**\<`T`\>(`value`): `value is T[]`

Checks whether the given value is an array.

Acts as a type guard and narrows the value to `T[]` when true.

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

`true` if the value is an array, otherwise `false`.

## Examples

```ts
isArray([1, 2, 3]); // true
isArray("text");   // false
```

```ts
const value: unknown = ["a", "b"];

if (isArray<string>(value)) {
  value.map(v => v.toUpperCase());
}
```
