# Type Alias: Identity()\<T\>

> **Identity**\<`T`\> = (`value`) => `T`

Represents an identity function.

An identity function returns the input value unchanged.
It is commonly used as a default projection or passthrough
in higher-order utilities.

## Type Parameters

### T

`T`

## Parameters

### value

`T`

## Returns

`T`

## Example

```ts
const identity: Identity<number> = (value) => value;
```

## Since

1.0.0
