# Type Alias: SyncFn()\<TArgs, TResult\>

> **SyncFn**\<`TArgs`, `TResult`\> = (...`args`) => `TResult`

Represents a synchronous function.

A generic function type that accepts a tuple of arguments and
returns a value immediately.

This type is intended for reusable synchronous contracts such as
mappers, predicates, comparators, and other pure computation helpers.

## Type Parameters

### TArgs

`TArgs` *extends* `unknown`[] = `unknown`[]

### TResult

`TResult` = `unknown`

## Parameters

### args

...`TArgs`

## Returns

`TResult`

## Example

```ts
const sum: SyncFn<[a: number, b: number], number> = (a, b) => a + b;
```

## Since

1.0.0
