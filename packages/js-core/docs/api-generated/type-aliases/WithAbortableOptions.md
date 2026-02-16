# Type Alias: WithAbortableOptions

> **WithAbortableOptions** = `object`

Configuration options for [withAbortable](../functions/withAbortable.md).

## Properties

### autoAbort?

> `optional` **autoAbort**: `boolean`

If `true` (default), the previous execution is aborted before a new one starts.

This enforces a single-active-execution model ("latest execution wins").

If `false`, multiple executions may run concurrently.

***

### timeoutMs?

> `optional` **timeoutMs**: `number`

Optional timeout in milliseconds.

If specified, the execution will be automatically aborted after
the given duration if it has not yet completed.

Timeout is implemented via `AbortController` and does not introduce
custom error types.
