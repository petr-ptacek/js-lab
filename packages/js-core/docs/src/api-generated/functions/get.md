# Function: get()

Safely gets a nested value from an object using a dot-separated path.

The path is strongly typed and validated at compile time.
If the resolved value is `undefined`, the provided default value is returned instead.

Supports:
- nested objects
- arrays via numeric indices

## Type Param

Object type

## Type Param

Valid path into the object

## Type Param

Default value type

## Param

The object to read from

## Param

Dot-separated path to the value

## Param

Optional default value returned when the path resolves to `undefined`

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
