# Function: withTryCatchSync()

Executes a synchronous function and returns its outcome
as a discriminated union.

This utility is responsible only for:
- executing the provided synchronous function
- converting its outcome into a typed [TryCatchResult](../type-aliases/TryCatchResult.md)

The returned result is fully determined **before** any lifecycle
callbacks are invoked.

---

## Result semantics

### Success
- If `fn` completes successfully, the result is:
  `{ ok: true, data }`

### Failure
- If `fn` throws:
  - the thrown value is mapped using `mapError` (if provided)
  - the result is always considered a failure (`ok: false`)

#### Failure without fallback
- If no `fallback` is provided, the result is:
  `{ ok: false, error }`

#### Failure with fallback
- If a `fallback` is provided, the result is:
  `{ ok: false, error, data }`

In this case, recovery data is available, but the operation
is still considered failed.

---

## Callbacks

Lifecycle callbacks are invoked **after** the result has been resolved:

- `onSuccess` is called only when `fn` succeeds
- `onError` is called whenever `fn` throws, even if a fallback is used
- `onFinally` is always called last

Errors thrown inside callbacks are **not caught** and will propagate
to the caller.

Callbacks do **not** influence the returned result.

---

## Overload behavior

- When `fallback` is provided, the returned result is guaranteed
  to contain a `data` property
- When `fallback` is not provided, `data` exists only on success

## Param

Synchronous function to execute.

## Param

Configuration object controlling error mapping,
fallback behavior, and lifecycle callbacks.

## Example

```ts
const result = withTryCatchSync(
  () => {
    if (Math.random() < 0.5) throw new Error("fail")
    return 100
  },
  {
    fallback: null,
    onError: () => toast.error("Operation failed"),
  }
)

if (result.ok) {
  console.log(result.data)
} else {
  // result.data is available because a fallback was provided
  console.log(result.data)
}
```

## Since

1.0.0

## Call Signature

> **withTryCatchSync**\<`TResult`, `TError`\>(`fn`, `options`): [`TryCatchResultSuccess`](../type-aliases/TryCatchResultSuccess.md)\<`TResult`\> \| [`TryCatchResultFailureWithData`](../type-aliases/TryCatchResultFailureWithData.md)\<`TResult`, `TError`\>

### Type Parameters

#### TResult

`TResult`

#### TError

`TError` = `unknown`

### Parameters

#### fn

() => `TResult`

#### options

[`WithTryCatchOptions`](../type-aliases/WithTryCatchOptions.md)\<`TResult`, `TError`\> & `object`

### Returns

[`TryCatchResultSuccess`](../type-aliases/TryCatchResultSuccess.md)\<`TResult`\> \| [`TryCatchResultFailureWithData`](../type-aliases/TryCatchResultFailureWithData.md)\<`TResult`, `TError`\>

## Call Signature

> **withTryCatchSync**\<`TResult`, `TError`\>(`fn`, `options?`): [`TryCatchResultSuccess`](../type-aliases/TryCatchResultSuccess.md)\<`TResult`\> \| [`TryCatchResultFailureNoData`](../type-aliases/TryCatchResultFailureNoData.md)\<`TError`\>

### Type Parameters

#### TResult

`TResult`

#### TError

`TError` = `unknown`

### Parameters

#### fn

() => `TResult`

#### options?

[`WithTryCatchOptions`](../type-aliases/WithTryCatchOptions.md)\<`TResult`, `TError`\>

### Returns

[`TryCatchResultSuccess`](../type-aliases/TryCatchResultSuccess.md)\<`TResult`\> \| [`TryCatchResultFailureNoData`](../type-aliases/TryCatchResultFailureNoData.md)\<`TError`\>
