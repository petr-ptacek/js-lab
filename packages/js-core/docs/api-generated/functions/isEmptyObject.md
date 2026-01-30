# Function: isEmptyObject()

> **isEmptyObject**(`value`): `value is Record<string, never>`

Checks whether a value is an empty plain object.

Returns `true` only if the value is a plain object
and has no own enumerable properties.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is Record<string, never>`

`true` if the value is an empty plain object,
otherwise `false`.

## Example

```ts
isEmptyObject({});                 // true
isEmptyObject(Object.create(null)) // true

isEmptyObject({ a: 1 });           // false
isEmptyObject([]);                 // false
isEmptyObject(null);               // false
```
