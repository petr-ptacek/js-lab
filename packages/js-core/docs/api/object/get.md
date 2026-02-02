# get

`get` is a **strongly typed utility** for safely reading nested values from objects using a dot-separated path. Unlike
most generic helpers, the path is **fully validated at compile time**, including support for nested arrays.

It is designed as a small, zero-dependency alternative to helpers like `lodash.get`, with a much stronger focus on *
*TypeScript correctness**.

---

## Why `get`

Most existing `get` utilities share the same limitations:

- paths are plain strings
- no compile-time validation
- incorrect paths fail silently at runtime
- return types are usually `any`

This implementation solves those problems by pushing as much logic as possible into the **type system**.

Key advantages:

- ✔ **Type-safe paths** – invalid paths fail at compile time
- ✔ **Accurate return types** inferred from the path
- ✔ **Array index support** (`"items.0.name"`)
- ✔ **No dependencies**
- ✔ **Predictable runtime behavior**

---

## Basic usage

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
```

The path is validated at compile time. Typos are caught immediately:

```ts
get(obj, "user.nam");
// ❌ TypeScript error – property does not exist
```

---

## Return type inference

The return type is derived directly from the path.

```ts
const name = get(obj, "user.name");
//    ^? string | undefined

const role = get(obj, "user.roles.0");
//    ^? string | undefined
```

This makes the function safe to use without additional casting.

---

## Default value

You can provide a default value that is returned **only when the resolved value is `undefined`**.

```ts
get(obj, "user.age", 30);
// → 30
```

TypeScript reflects this behavior precisely:

```ts
const age = get(obj, "user.age", 30);
//    ^? number
```

Important detail:

- `undefined` → default value is used
- `null` → returned as-is

---

## Working with arrays

Array indices are supported as numeric segments in the path.

```ts
const data = {
  items: [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
  ],
};

get(data, "items.1.name");
// → "B"
```

Invalid indices are rejected at runtime and result in `undefined`.

---

## Comparison with lodash.get

### lodash.get

```ts
import get from "lodash.get";

get(obj, "user.name");
// → any
```

Problems:

- ❌ path is not validated
- ❌ return type is `any`
- ❌ typos are silent runtime bugs

---

### This `get`

```ts
get(obj, "user.name");
// → string | undefined
```

Benefits:

- ✔ invalid paths fail at compile time
- ✔ return type matches the actual structure
- ✔ works naturally with strict TypeScript settings

---

## Design notes

- Path typing is implemented via recursive conditional types
- Runtime implementation is intentionally simple
- Uses `isArray` / `isObject` helpers for safe narrowing
- No optional chaining or `eval`

The complexity lives in the **type system**, not in runtime code.

---

## When to use / when not to use

### Use when

- you want **maximum type safety**
- object shape is known at compile time
- you are building libraries or core utilities

### Avoid when

- paths are fully dynamic user input
- you do not control the object shape
- bundle size is more important than type guarantees

---

## Summary

`get` is a strict, predictable alternative to generic deep-access helpers:

- compile-time validated paths
- precise return types
- no runtime magic

Ideal for TypeScript-first codebases where **correctness beats convenience**.

## More

[➡️ Read more →](/api-generated/functions/get)
