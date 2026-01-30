# Function: isBigint()

> **isBigint**(`value`): `value is bigint`

Checks whether the given value is a `bigint`.

Acts as a type guard and narrows the value to `bigint` when true.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is bigint`

`true` if the value is a bigint, otherwise `false`.

## Examples

```ts
isBigint(10n);    // true
isBigint(10);     // false
isBigint("10");   // false
```

```ts
const value: unknown = 42n;

if (isBigint(value)) {
  value + 1n;
}
```
