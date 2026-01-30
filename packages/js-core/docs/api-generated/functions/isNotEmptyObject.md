# Function: isNotEmptyObject()

> **isNotEmptyObject**(`value`): `value is Record<string, unknown>`

Checks whether a value is a non-empty plain object.

Returns `true` only if the value is a plain object
and has at least one own enumerable property.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is Record<string, unknown>`

`true` if the value is a non-empty plain object,
otherwise `false`.

## Example

```ts
isNotEmptyObject({ a: 1 }); // true
isNotEmptyObject({});      // false
isNotEmptyObject([]);      // false
isNotEmptyObject(null);    // false
```
