# Type Alias: ProjectionFn()\<TInput, TOutput\>

> **ProjectionFn**\<`TInput`, `TOutput`\> = (`value`) => `TOutput`

Represents a projection function.

A projection function maps an input value to a derived value.
It is commonly used to extract or compute a specific property
from a complex structure.

Typical use cases include mapping, grouping, sorting,
and key selection.

## Type Parameters

### TInput

`TInput`

### TOutput

`TOutput`

## Parameters

### value

`TInput`

## Returns

`TOutput`

## Example

```ts
const getId: ProjectionFn<User, string> = (user) => user.id;
```
