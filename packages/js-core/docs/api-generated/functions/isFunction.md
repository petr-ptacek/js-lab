# Function: isFunction()

> **isFunction**(`value`): `value is Function`

Checks whether the given value is a function.

Acts as a type guard and narrows the value to `Function` when true.

Note: The `Function` type is intentionally used here to allow
any callable value without constraining its arguments or return type.

## Parameters

### value

`unknown`

The value to test.

## Returns

`value is Function`

`true` if the value is a function, otherwise `false`.

## Examples

```ts
isFunction(() => {});    // true
isFunction(class {});   // true
isFunction(123);        // false
```

```ts
const value: unknown = () => "hello";

if (isFunction(value)) {
  value();
}
```
