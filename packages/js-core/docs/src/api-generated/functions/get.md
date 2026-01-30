# Function: get()

Safely gets a nested value from an object using a dot-separated path.

The path is strongly typed and validated at compile time.
Supports nested objects and arrays via numeric indices.

If the resolved value is `undefined`, the provided default value
is returned instead.

## Param

The object to read from.

## Param

Dot-separated path to the value.

## Param

Value returned when the resolved value is `undefined`.

## Remarks

The default value is only used when the resolved value is `undefined`.
If the resolved value is `null`, it is returned as-is.

## Example

```ts
const obj = {
  user: {
    name: "John",
    roles: ["admin", "editor"],
  },
};

get(obj, "user.name");
// → "John"

get(obj, "user.roles.0");
// → "admin"

get(obj, "user.age", 30);
// → 30
```

## Since

1.0.0

## Call Signature

> **get**\<`T`, `P`\>(`obj`, `path`): `PathValue`\<`T`, `P`\> \| `undefined`

### Type Parameters

#### T

`T` *extends* `object`

#### P

`P` *extends* `` `${number}` ``

### Parameters

#### obj

`T`

#### path

`P`

### Returns

`PathValue`\<`T`, `P`\> \| `undefined`

## Call Signature

> **get**\<`T`, `P`, `D`\>(`obj`, `path`, `defaultValue`): `D` \| `Exclude`\<`PathValue`\<`T`, `P`\>, `undefined`\>

### Type Parameters

#### T

`T` *extends* `object`

#### P

`P` *extends* `` `${number}` ``

#### D

`D`

### Parameters

#### obj

`T`

#### path

`P`

#### defaultValue

`D`

### Returns

`D` \| `Exclude`\<`PathValue`\<`T`, `P`\>, `undefined`\>
