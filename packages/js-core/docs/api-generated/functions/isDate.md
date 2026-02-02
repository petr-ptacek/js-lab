# Function: isDate()

> **isDate**(`value`): `value is Date`

Checks whether the given value is a `Date` instance.

Acts as a type guard and narrows the value to `Date` when true.

Note: This function does **not** verify whether the date is valid
(i.e. `new Date("invalid")` is still a `Date` instance).

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is Date`

`true` if the value is a `Date` instance, otherwise `false`.

## Since

1.0.0

## Examples

```ts
isDate(new Date());          // true
isDate("2024-01-01");        // false
```

```ts
const value: unknown = new Date();

if (isDate(value)) {
  value.getTime();
}
```
