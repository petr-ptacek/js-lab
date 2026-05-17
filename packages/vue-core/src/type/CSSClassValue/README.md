# CSSClassValue

A full CSS class binding value — a single [`CSSClassAtom`](../CSSClassAtom/) or an array of atoms.

```ts
type CSSClassValue = CSSClassAtom | CSSClassAtom[];
```

Use `CSSClassValue` as the type for `ui` prop entries in components that accept external class overrides.
It is the widest form of class binding Vue accepts — pass it directly to `:class` or process it with `normalizeClass`.

---

## Usage

### Component `ui` prop definition

```ts
import type { CSSClassValue } from "@petr-ptacek/vue-core";

type UI = {
  root?: CSSClassValue;
  header?: CSSClassValue;
  content?: CSSClassValue;
};

type Props = {
  ui?: UI;
};
```

### Template

```vue
<template>
  <div :class="normalizeClass(ui?.root)">
    <header :class="normalizeClass(ui?.header)">...</header>
  </div>
</template>
```

### Consumer

```vue
<MyComponent
  :ui="{
    root: 'custom-root',
    header: ['sticky-header', { 'is-active': isActive }],
  }"
/>
```

---

## Design Notes

`CSSClassValue` is intentionally the broadest class binding type Vue supports.
Prefer `CSSClassValue` over `CSSClassAtom` in component `ui` props — consumers may want to pass arrays combining
static class names and conditional objects, which `CSSClassAtom` alone does not cover.
