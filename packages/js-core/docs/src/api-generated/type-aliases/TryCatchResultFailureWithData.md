# Type Alias: TryCatchResultFailureWithData\<TResult, TError\>

> **TryCatchResultFailureWithData**\<`TResult`, `TError`\> = `object`

Failed result with fallback data.

Returned when the operation throws and a fallback is provided.
The operation is still considered failed (`ok: false`),
but recovery data is available.

## Type Parameters

### TResult

`TResult`

Type of the fallback result.

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

### data

> **data**: `TResult`
