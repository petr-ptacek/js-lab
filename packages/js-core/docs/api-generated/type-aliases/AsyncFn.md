# Type Alias: AsyncFn()\<TArgs, TResult\>

> **AsyncFn**\<`TArgs`, `TResult`\> = (...`args`) => `Promise`\<`TResult`\>

Represents an asynchronous function.

A generic function type that accepts a tuple of arguments and
returns a `Promise` resolving to a result.

This type is intended for reusable async contracts such as
data fetching, retries, caching, debouncing, or safe execution
utilities.

## Type Parameters

### TArgs

`TArgs` *extends* `unknown`[] = `unknown`[]

### TResult

`TResult` = `unknown`

## Parameters

### args

...`TArgs`

## Returns

`Promise`\<`TResult`\>

## Example

```ts
const fetchUser: AsyncFn<[id: string], User> = async (id) => {
  return api.getUser(id);
};
```

## Since

1.0.0
