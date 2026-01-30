# Type Alias: TryCatchResultFailure\<TResult, TError\>

> **TryCatchResultFailure**\<`TResult`, `TError`\> = [`TryCatchResultFailureWithData`](TryCatchResultFailureWithData.md)\<`TResult`, `TError`\> \| [`TryCatchResultFailureNoData`](TryCatchResultFailureNoData.md)\<`TError`\>

Failed result of [withTryCatch](../functions/withTryCatch.md).

This result is returned when the operation throws.
Depending on whether a fallback is provided, `data`
may or may not be present.

## Type Parameters

### TResult

`TResult`

Type of the fallback result.

### TError

`TError` = `unknown`

Type of the mapped error.
