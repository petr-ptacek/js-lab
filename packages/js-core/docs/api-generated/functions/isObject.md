# Function: isObject()

> **isObject**(`value`): `value is Record<string, unknown>`

Checks whether the given value is an object.

Acts as a type guard and narrows the value to `Record<string, unknown>` when true.

Note: This function returns `true` for plain objects, arrays, and other
non-null objects (e.g. `Date`, `Map`).

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is Record<string, unknown>`

`true` if the value is a non-null object, otherwise `false`.

## Since

1.0.0

## Examples

```ts
isObject({});        // true
isObject([]);        // true
isObject(null);      // false
isObject("text");   // false
```

```ts
const value: unknown = { a: 1 };

if (isObject(value)) {
  value["a"];
}
```
