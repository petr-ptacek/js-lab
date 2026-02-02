# Function: isPrimitive()

> **isPrimitive**(`value`): `value is PrimitiveValue`

Checks whether the given value is a JavaScript primitive.

Acts as a type guard and narrows the value to `PrimitiveValue` when true.

A primitive value is one of:
`string`, `number`, `boolean`, `symbol`, `bigint`, `null`, or `undefined`.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is PrimitiveValue`

`true` if the value is a primitive value, otherwise `false`.

## Since

1.0.0

## Examples

```ts
isPrimitive("text");     // true
isPrimitive(42);         // true
isPrimitive(null);       // true
isPrimitive({});         // false
isPrimitive([]);         // false
```

```ts
const value: unknown = Symbol("id");

if (isPrimitive(value)) {
  // value is PrimitiveValue
}
```

## Link
