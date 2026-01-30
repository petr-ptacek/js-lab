# Function: isFiniteNumber()

> **isFiniteNumber**(`value`): `value is number`

Checks whether the given value is a finite number.

Acts as a type guard and narrows the value to `number` when true.
This excludes `NaN`, `Infinity`, and `-Infinity`.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is number`

`true` if the value is a finite number, otherwise `false`.

## Examples

```ts
isFiniteNumber(10);         // true
isFiniteNumber(NaN);        // false
isFiniteNumber(Infinity);  // false
isFiniteNumber("10");      // false
```

```ts
const value: unknown = 42;

if (isFiniteNumber(value)) {
  value.toFixed(2);
}
```
