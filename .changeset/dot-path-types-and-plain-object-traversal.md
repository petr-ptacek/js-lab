---
"@petr-ptacek/js-core": major
---

Add `DotPathKeys` and `DotPathValue` types, restrict `get` and `has` to plain objects.

**New exports:**

- `DotPathKeys<T>` — generates a union of all valid dot-separated key paths for a plain object type
- `DotPathValue<T, P>` — resolves the type of the value at a given dot-separated path
- `has` — checks whether a dot-separated path exists in a plain object

**Breaking changes:**

- `get` and `has` no longer traverse arrays, `Date`, `Map`, `Set`, or other non-plain-object values — they are treated as leaves. Paths going through these types return `undefined`/`false` at runtime and are not accepted by the type system.
- Internal `Path` and `PathValue` types (from `object/get`) are removed and replaced by the public `DotPathKeys` and `DotPathValue`.
