# Function: isNullable()

> **isNullable**(`value`): value is null \| undefined

Checks whether the given value is `null` or `undefined`.

Acts as a type guard and narrows the value to `null | undefined` when true.

## Parameters

### value

`unknown`

The value to test.

## Returns

value is null \| undefined

`true` if the value is `null` or `undefined`, otherwise `false`.

## Since

1.0.0

## Examples

```ts
isNullable(null);        // true
isNullable(undefined);   // true
isNullable(0);           // false
```

```ts
const value: unknown = undefined;

if (isNullable(value)) {
  // value is null | undefined
}
```
