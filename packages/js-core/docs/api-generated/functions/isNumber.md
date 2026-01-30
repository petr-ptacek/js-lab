# Function: isNumber()

> **isNumber**(`value`): `value is number`

Checks whether the given value is a number.

Acts as a type guard and narrows the value to `number` when true.
This includes `NaN`, `Infinity`, and `-Infinity`.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is number`

`true` if the value is of type `number`, otherwise `false`.

## Examples

```ts
isNumber(42);        // true
isNumber(NaN);       // true
isNumber(Infinity);  // true
isNumber("42");      // false
```

```ts
const value: unknown = 3.14;

if (isNumber(value)) {
  value.toFixed(2);
}
```
