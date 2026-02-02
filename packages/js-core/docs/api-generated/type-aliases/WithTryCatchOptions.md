# Type Alias: WithTryCatchOptions\<TResult, TError\>

> **WithTryCatchOptions**\<`TResult`, `TError`\> = `object`

Configuration options for [withTryCatch](../functions/withTryCatch.md).

These options control:
- lifecycle callbacks
- error mapping
- optional fallback recovery behavior

Providing a `fallback` does **not** convert failure into success.
Instead, it allows returning recovery data while preserving
the failure state (`ok: false`).

## Since

1.0.0

## Type Parameters

### TResult

`TResult`

Type of the successful (or fallback) result.

### TError

`TError` = `unknown`

Type of the mapped error.

## Properties

### onSuccess()?

> `optional` **onSuccess**: (`result`) => `void`

Called when the operation succeeds.

Invoked after the result is resolved.
Not called when a fallback is used.

#### Parameters

##### result

`TResult`

#### Returns

`void`

***

### onError()?

> `optional` **onError**: (`e`) => `void`

Called when the operation fails.

Invoked even if a fallback value is provided.
Useful for side effects such as logging, reporting,
or user notifications.

#### Parameters

##### e

`TError`

#### Returns

`void`

***

### onFinally()?

> `optional` **onFinally**: () => `void`

Called after success or failure.

Invoked after all other lifecycle callbacks.

#### Returns

`void`

***

### fallback?

> `optional` **fallback**: `FallbackValue`\<`TResult`, `TError`\>

Fallback value or function used when `fn` throws.

When provided:
- the returned result will contain `data`
- the operation is still considered failed (`ok: false`)

This enables error recovery without hiding failures.

***

### mapError()?

> `optional` **mapError**: (`e`) => `TError`

Maps an unknown thrown value to a typed error.

Useful for normalizing errors coming from different sources.

#### Parameters

##### e

`unknown`

#### Returns

`TError`
