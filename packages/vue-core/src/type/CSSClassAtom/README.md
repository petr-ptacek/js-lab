# CSSClassAtom

A single CSS class binding unit.

```ts
type CSSClassAtom = string | Record<string, boolean> | null | undefined;
```

Matches one of the shapes Vue's `:class` binding and `normalizeClass` accept:

- `string` — plain class name or space-separated list
- `Record<string, boolean>` — object where keys are class names and values toggle them
- `null | undefined` — explicitly absent, treated as no class

---

## Usage

Use `CSSClassAtom` as the type for individual class override fields in a component's `ui` prop:

```ts
import type { CSSClassAtom } from "@petr-ptacek/vue-core";

type UI = {
  root?: CSSClassAtom;
  header?: CSSClassAtom;
};
```

For props that accept both a single atom and an array of atoms, use [`CSSClassValue`](../CSSClassValue/) instead.

---

## Design Notes

This type mirrors Vue's internal class binding primitives intentionally.
Pass the value directly to `:class` or convert to a string with `normalizeClass` from `vue`.
