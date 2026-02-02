# entries

`entries` is a **TypeScript-safe wrapper** around `Object.entries`. It preserves the relationship between keys and values at the type level, something the native API intentionally does not provide.

This utility is **not an atomic runtime helper** and does not change JavaScript behavior. Its sole purpose is to improve **type safety and developer experience** in TypeScript codebases.

---

## What problem it solves

The native `Object.entries` has the following signature:

```ts
Object.entries(obj: object): [string, any][]
```

This means:

- keys are widened to `string`
- values are widened to `any`
- the relationship between a key and its value is lost

As a result, even for well-defined objects, TypeScript cannot help you inside loops or reducers.

---

## What this utility does (and does not do)

### Does

- ✔ preserves **exact key union** (`keyof T`)
- ✔ preserves **exact value types** (`T[K]`)
- ✔ keeps key–value correlation intact

### Does not

- ❌ change runtime behavior
- ❌ add validation or guards
- ❌ make iteration safer at runtime

This is a **type-level utility**, not a runtime abstraction.

---

## Basic usage

```ts
const user = {
  id: 1,
  name: "John",
};

for (const [key, value] of entries(user)) {
  // key   → "id" | "name"
  // value → number | string
}
```

Compared to native `Object.entries`, this gives TypeScript enough information to reason about the code.

---

## Preserved key–value relationship

TypeScript understands that each key is paired with its corresponding value type:

```ts
for (const [key, value] of entries(user)) {
  if (key === "id") {
    // value is number
  }

  if (key === "name") {
    // value is string
  }
}
```

This is impossible to express with the native API without manual casting.

---

## Common use cases

### Mapping over object entries

```ts
const flags = {
  darkMode: true,
  debug: false,
};

const enabled = entries(flags)
  .filter(([, value]) => value)
  .map(([key]) => key);
// enabled: ("darkMode" | "debug")[]
```

---

### Reducers and transforms

```ts
type Config = {
  retries: number;
  verbose: boolean;
};

const config: Config = { retries: 3, verbose: true };

const result = entries(config).reduce((acc, [key, value]) => {
  acc[key] = String(value);
  return acc;
}, {} as Record<keyof Config, string>);
```

---

## Comparison with Object.entries

### Native API

```ts
for (const [key, value] of Object.entries(user)) {
  // key: string
  // value: any
}
```

Issues:

- ❌ loss of type information
- ❌ requires casting in non-trivial logic

---

### This `entries`

```ts
for (const [key, value] of entries(user)) {
  // key: "id" | "name"
  // value: number | string
}
```

Benefits:

- ✔ zero casts
- ✔ safe refactors
- ✔ works with `strict` TypeScript settings

---

## Design notes

- Implemented as a thin typed wrapper
- Uses a single `as` assertion internally
- No runtime overhead beyond `Object.entries`

This is a deliberate trade-off: **minimal runtime, maximum type signal**.

---

## When to use / when not to use

### Use when

- iterating over known object shapes
- writing reducers, mappers, or serializers
- building TypeScript-first libraries

### Avoid when

- object shape is unknown or dynamic
- data comes directly from untrusted sources
- runtime validation is required

---

## Summary

`entries` exists to close a long-standing gap in the TypeScript standard library:

- it does not add features
- it does not change behavior
- it **restores type information** that JavaScript loses

A small utility with a **high leverage** in strongly typed codebases.

## More

[➡️ Read more →](/api-generated/functions/entries)
