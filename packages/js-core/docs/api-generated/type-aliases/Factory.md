# Type Alias: Factory()\<TResult, TArgs\>

> **Factory**\<`TResult`, `TArgs`\> = (...`args`) => `TResult`

Represents a factory function.

A factory is a function that accepts arguments and returns a value of type TResult.

## Type Parameters

### TResult

`TResult`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Parameters

### args

...`TArgs`

## Returns

`TResult`

## Example

```ts
const createUser: Factory<User, [name: string, age: number]> = (name, age) => ({ name, age });
```

## Since

1.0.0
