# Function: isBoolean()

> **isBoolean**(`value`): `value is boolean`

Checks whether the given value is a `boolean`.

Acts as a type guard and narrows the value to `boolean` when true.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is boolean`

`true` if the value is a boolean, otherwise `false`.

## Since

1.0.0

## Examples

```ts
isBoolean(true);    // true
isBoolean(null);     // false
isBoolean("10");   // false
```

```ts
const value: unknown = 42n;

if (isBoolean(value)) {
  // logic
}
```
