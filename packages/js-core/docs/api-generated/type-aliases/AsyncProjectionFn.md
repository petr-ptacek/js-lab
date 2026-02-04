# Type Alias: AsyncProjectionFn()\<TInput, TOutput\>

> **AsyncProjectionFn**\<`TInput`, `TOutput`\> = (`value`) => `Promise`\<`TOutput`\>

Represents an asynchronous projection function.

Similar to [ProjectionFn](ProjectionFn.md), but returns a Promise.

Useful when the projected value requires asynchronous computation.

## Type Parameters

### TInput

`TInput`

### TOutput

`TOutput`

## Parameters

### value

`TInput`

## Returns

`Promise`\<`TOutput`\>

## Example

```ts
const loadProfile: AsyncProjectionFn<User, Profile> = async (user) => {
  return api.loadProfile(user.id);
};
```
