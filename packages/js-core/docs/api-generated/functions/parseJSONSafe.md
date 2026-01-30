# Function: parseJSONSafe()

Safely parses a JSON string and returns the parsed value.

If parsing fails (invalid JSON), the provided `fallback` value is returned instead.
When no fallback is provided, `undefined` is returned.

## Type Param

Expected type of the parsed JSON value.

## Type Param

Fallback value type.

## Param

JSON string to parse.

## Param

Fallback value returned when parsing fails.

## Example

```ts
parseJSONSafe<{ foo: string }>('{"foo":"bar"}');
// => { foo: "bar" }

parseJSONSafe('invalid json', { foo: "fallback" });
// => { foo: "fallback" }

parseJSONSafe<number>('123');
// => 123

parseJSONSafe('invalid');
// => undefined
```

## Call Signature

> **parseJSONSafe**\<`T`\>(`value`, `fallback`): `T`

### Type Parameters

#### T

`T`

### Parameters

#### value

`string`

#### fallback

`T`

### Returns

`T`

## Call Signature

> **parseJSONSafe**\<`T`\>(`value`): `T` \| `undefined`

### Type Parameters

#### T

`T`

### Parameters

#### value

`string`

### Returns

`T` \| `undefined`
