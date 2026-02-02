# Function: isNull()

> **isNull**(`value`): `value is null`

Checks whether the given value is `null`.

Acts as a type guard and narrows the value to `null` when true.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is null`

`true` if the value is `null`, otherwise `false`.

## Since

1.0.0

## Examples

```ts
isNull(null);       // true
isNull(undefined); // false
```

```ts
const value: unknown = null;

if (isNull(value)) {
  // value is null
}
```
