# Type Alias: TryCatchResultFailureNoData\<TError\>

> **TryCatchResultFailureNoData**\<`TError`\> = `object`

Failed result without fallback data.

Returned when the operation throws and no fallback is provided.

## Type Parameters

### TError

`TError` = `unknown`

Type of the mapped error.

## Properties

### ok

> **ok**: `false`

***

### error

> **error**: `TError`

***

### data?

> `optional` **data**: `never`
