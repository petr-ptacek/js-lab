# Function: isString()

> **isString**(`value`): `value is string`

Checks whether the given value is a string.

Acts as a type guard and narrows the value to `string` when true.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is string`

`true` if the value is of type `string`, otherwise `false`.

## Examples

```ts
isString("text");   // true
isString(123);      // false
```

```ts
const value: unknown = "hello";

if (isString(value)) {
  value.toUpperCase();
}
```
