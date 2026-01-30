# Function: isNaNValue()

> **isNaNValue**(`value`): `value is number`

Checks whether the given value is `NaN` (Not-a-Number).

Acts as a type guard and narrows the value to `number` when true.
This function only returns `true` for the numeric `NaN` value.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is number`

`true` if the value is `NaN`, otherwise `false`.

## Examples

```ts
isNaNNumber(NaN);        // true
isNaNNumber("NaN");     // false
isNaNNumber(undefined); // false
```

```ts
const value: unknown = NaN;

if (isNaNNumber(value)) {
  // value is number (NaN)
}
```
