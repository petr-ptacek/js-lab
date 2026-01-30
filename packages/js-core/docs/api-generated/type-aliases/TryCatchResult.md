# Type Alias: TryCatchResult\<TResult, TError\>

> **TryCatchResult**\<`TResult`, `TError`\> = [`TryCatchResultSuccess`](TryCatchResultSuccess.md)\<`TResult`\> \| [`TryCatchResultFailure`](TryCatchResultFailure.md)\<`TResult`, `TError`\>

Discriminated union representing the result of [withTryCatch](../functions/withTryCatch.md).

- `ok: true` indicates a successful operation and always includes `data`
- `ok: false` indicates a failure and always includes `error`
- `data` may still be present on failure if a fallback was used

## Type Parameters

### TResult

`TResult`

Type of the successful (or fallback) result.

### TError

`TError` = `unknown`

Type of the mapped error.
