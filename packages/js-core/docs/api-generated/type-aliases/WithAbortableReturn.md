# Type Alias: WithAbortableReturn\<Args, R\>

> **WithAbortableReturn**\<`Args`, `R`\> = `object`

Return type of [withAbortable](../functions/withAbortable.md).

Provides execution control and lifecycle state access.

## Type Parameters

### Args

`Args` *extends* `unknown`[]

### R

`R`

## Properties

### execute()

> **execute**: (...`args`) => `Promise`\<`R`\>

Executes the wrapped function with the provided arguments.

If `autoAbort` is enabled, any currently running execution
is aborted before starting a new one.

#### Parameters

##### args

...`Args`

#### Returns

`Promise`\<`R`\>

#### Throws

Will propagate any error thrown by the wrapped function,
including abort-related errors.

***

### abort()

> **abort**: () => `void`

Aborts the currently active execution, if any.

If no execution is active, this method has no effect.

#### Returns

`void`

***

### signal

> `readonly` **signal**: `AbortSignal` \| `null`

The `AbortSignal` of the currently active execution,
or `null` if no execution is in progress.

***

### isRunning

> `readonly` **isRunning**: `boolean`

Indicates whether an execution is currently in progress.
