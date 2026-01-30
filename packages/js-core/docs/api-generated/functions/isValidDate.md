# Function: isValidDate()

> **isValidDate**(`value`): `value is Date`

Checks whether the given value is a valid `Date` instance.

Acts as a type guard and narrows the value to `Date` when true.

A date is considered valid if it is a `Date` instance and its internal
time value is a finite number (i.e. not `NaN`).

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is Date`

`true` if the value is a valid `Date`, otherwise `false`.

## Examples

```ts
isValidDate(new Date());                // true
isValidDate(new Date("invalid"));       // false
isValidDate("2024-01-01");              // false
```

```ts
const value: unknown = new Date("2024-01-01");

if (isValidDate(value)) {
  value.toISOString();
}
```
