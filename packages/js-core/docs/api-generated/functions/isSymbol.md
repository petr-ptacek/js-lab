# Function: isSymbol()

> **isSymbol**(`value`): `value is symbol`

Checks whether the given value is a `symbol`.

Acts as a type guard and narrows the value to `symbol` when true.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is symbol`

`true` if the value is of type `symbol`, otherwise `false`.

## Since

1.0.0

## Examples

```ts
isSymbol(Symbol("id")); // true
isSymbol("id");        // false
```

```ts
const value: unknown = Symbol.iterator;

if (isSymbol(value)) {
  value.toString();
}
```
