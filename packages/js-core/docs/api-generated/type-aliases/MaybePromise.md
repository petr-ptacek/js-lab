# Type Alias: MaybePromise\<T\>

> **MaybePromise**\<`T`\> = `T` \| `Promise`\<`T`\>

Represents a value that may be returned synchronously or as a Promise.

## Type Parameters

### T

`T`

## Example

```ts
const value: MaybePromise<string>;
// string | Promise<string>
```

## Since

1.0.0
