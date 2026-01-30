# Function: isPlainObject()

> **isPlainObject**(`value`): `value is Record<string, unknown>`

Checks whether a value is a plain object.

A plain object is an object created by `{}` or `new Object()`,
or an object with a `null` prototype.

This excludes arrays, class instances, and built-in objects
such as `Date`, `Map`, or `Set`.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is Record<string, unknown>`

`true` if the value is a plain object, otherwise `false`.

## Example

```ts
isPlainObject({});                 // true
isPlainObject({ a: 1 });           // true
isPlainObject(Object.create(null)) // true

isPlainObject([]);                 // false
isPlainObject(new Date());         // false
isPlainObject(null);               // false
```
