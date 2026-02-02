# Function: isUndefined()

> **isUndefined**(`value`): `value is undefined`

Checks whether the given value is `undefined`.

Acts as a type guard and narrows the value to `undefined` when true.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is undefined`

`true` if the value is `undefined`, otherwise `false`.

## Since

1.0.0

## Examples

```ts
isUndefined(undefined); // true
isUndefined(null);      // false
```

```ts
const value: unknown = undefined;

if (isUndefined(value)) {
  // value is undefined
}
```
