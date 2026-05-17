# vue-core — Claude Instructions

Package-specific rules for `@petr-ptacek/vue-core`. Applies on top of the root `CLAUDE.md`.

## Module Structure

### Composables

```
src/composables/<composableName>/
  index.ts                     ← public API boundary only, no logic
  <composableName>.ts          ← implementation
  types.ts                     ← public + internal types
  use/                         ← internal sub-composables (only for complex cases)
    index.ts
    useXxx.ts
    __tests__/
      useXxx.test.ts
  __tests__/
    <composableName>.test.ts
  README.md
```

Minimal acceptable structure: `index.ts`, `<composableName>.ts`, `types.ts`, `__tests__/`.

### Components

```
src/components/<ComponentName>/
  index.ts                     ← public API boundary only
  <ComponentName>.vue          ← main component
  types/
    index.ts                   ← or a flat types.ts for simpler components
  useController.ts             ← internal orchestration composable (if needed)
  use/                         ← internal sub-composables (if needed)
    index.ts
    useXxx.ts
    __tests__/
      useXxx.test.ts
  utils/                       ← pure utility functions (if needed)
    index.ts
    xxx.ts
    __tests__/
      xxx.test.ts
  styles/                      ← CSS (one file per concern, composed via index.css)
    index.css
    _xxx.css
  README.md
```

### Vue-aware Utilities

Small utilities that wrap js-core behavior with Vue lifecycle awareness belong in `src/utils/`, not `src/composables/`.
Each utility lives in its own subdirectory (same as composables):

```
src/utils/
  index.ts
  <utilityName>/
    index.ts
    <utilityName>.ts
    types.ts
    meta.ts
    __tests__/
      <utilityName>.test.ts
```

Use `src/utils/` for factory functions and class wrappers. Use `src/composables/` for hooks that use Vue reactivity or
lifecycle APIs (`ref`, `computed`, `watch`, `onBeforeUnmount`, …).

### Types

Shared TypeScript type definitions (not runtime code) belong in `src/type/`, organized by logical group:

```
src/type/
  index.ts
  <groupName>/
    index.ts
    <groupName>.ts    ← type definitions with TSDoc
    meta.ts
    README.md
    snippets/         ← usage examples (optional)
```

Use `kind: "type"` in `meta.ts`. Tests are optional for pure type definitions (no runtime behavior to test).
Each group should be a coherent set of related types (e.g., all CSS class binding types together).

## Naming Conventions

| Category     | Convention      | Example                 |
| ------------ | --------------- | ----------------------- |
| Composable   | `useXxx`        | `usePointerDrag`        |
| Component    | `PascalCase`    | `SplitPane`             |
| Utility      | `camelCase`     | `createEmitter`         |
| Options type | `UseXxxOptions` | `UsePointerDragOptions` |
| Return type  | `UseXxxReturn`  | `UsePointerDragReturn`  |

Directory name = main file name = exported function/component name. Always.

Verb conventions for utilities (same as js-core):

| Prefix   | Use for                           |
| -------- | --------------------------------- |
| `create` | factory functions, class wrappers |
| `use`    | composables (Vue hook convention) |

**Never use:** `get`, `handle`, `do`, `make`, `build`, `process`.

## Vue Reactivity Rules

- Use `shallowRef` for primitive values and simple objects; `ref` only when deep reactivity is needed.
- Wrap all returned refs with `readonly()` — composables expose read-only state; callers must not mutate refs directly.
- Accept options as `MaybeRef<T>` when a value should be reactive at call site; use `toValue()` inside the composable to
  unwrap them.
- Prefer `computed` over manual `watch` + assignment when deriving values.
- Use `watch` with `{ immediate: true }` only when the initial value must be processed on mount.

## Lifecycle Integration

When a composable registers global listeners or side effects:

1. Check `getCurrentInstance()` before calling lifecycle hooks — composables may be used outside component context.
2. Clean up in `onBeforeUnmount`, never `onUnmounted`.
3. Expose a `cleanup()` / `destroy()` function if the composable can be used outside components.

```ts
if (getCurrentInstance()) {
  onBeforeUnmount(() => cleanup());
}
```

## Types

- All public types (options, return values, public event payloads) live in `types.ts` and are re-exported from
  `index.ts`.
- Internal types (e.g. sub-composable interfaces) live in `types.ts` but are NOT exported from `index.ts`.
- Use separate `types/` directory only when types are many (>80 lines) and logically groupable.
- Component-specific types: `Props`, `Emits`, `Slots`, `Expose`, `ModelValue` — all defined in `types.ts` (or
  `types/index.ts`).

## index.ts Pattern

```ts
// Composable: only re-exports
export type { UseXxxOptions, UseXxxReturn } from "./types";
export { useXxx } from "./useXxx";

// Component: only re-exports the component; internal types are not exposed
export { default as ComponentName } from "./ComponentName.vue";
export type { Props as ComponentNameProps } from "./types";
```

## Export Chain

```
src/composables/<name>/index.ts
  ↓ re-exported by
src/composables/index.ts
  ↓ re-exported by
src/index.ts
```

Same chain applies for `components/` and `utils/`. All three levels must be updated when adding a new item.

## TSDoc

Required on the exported function/component's implementation (not on overload signatures):

````ts
/**
 * One-line description.
 *
 * @param source - Description.
 * @param options - Description.
 * @returns Description.
 * @since 1.1.0
 *
 * @example
 * ```ts
 * const { loading } = useXxx(source)
 * ```

*/
````

For composables with complex timing or state machine behavior, add a `## Behavior` section in the JSDoc explaining state transitions (see `useStableLoading` as reference).

## CSS and Styles

- Component styles live in a `styles/` (or `style/`) directory.
- Split into logical partials: `_root.css`, `_content.css`, `_section.css`, etc.
- Compose partials via `styles/index.css` using `@import`.
- Import in the `.vue` file with `<style> @import "./styles/index.css"; </style>` — no `scoped`.
- Use BEM-like class names prefixed with `ui-`: `.ui-component-name__element`.
- CSS custom properties for theming — prefer data attributes over conditional classes for state (`data-collapsed`, `data-orientation`, etc.).

## Component Patterns

- Use `<script setup lang="ts">` — no Options API.
- Define prop types with `defineProps<Props>()`, use `withDefaults` for defaults.
- Expose only what is explicitly needed: `defineExpose<Expose>({ ... })`.
- Accept `ui` prop for class overrides (object of slot/element names to class strings) — do not expose internal class names as props.
- Use `data-*` attributes for state signaling (not `class`-based state) so consumers can style via CSS selectors.

### No logic in `.vue` files

**The `.vue` file is a pure template binding layer.** It must contain no business logic, no reactive computations, no event handling logic — only:

- `defineProps`, `defineEmits`, `defineSlots`, `defineExpose`
- A single call to `useController(props, emit)` (or equivalent)
- Template markup

All logic lives in `useController.ts`. If `useController` grows complex, decompose it into focused composables in `use/` — each handling one concern (e.g. `useResizeDrag`, `useResizeSizes`). The controller then orchestrates those sub-composables and exposes a flat API to the template.

```ts
// ✅ .vue script setup — correct
const props = withDefaults(defineProps<Props>(), { ... });
const emit  = defineEmits<Emits>();
const { betaStyle, alphaStyle, onPointerDown, expand, collapse } = useController({ props, emit });

// ❌ .vue script setup — wrong
const isOpen = ref(false);
function toggle() { isOpen.value = !isOpen.value; }
```

## Tests

- Location: `__tests__/<name>.test.ts` within the composable or component directory.
- Sub-composable tests: `use/__tests__/<subName>.test.ts`.
- Utility tests: `__tests__/<utilityName>.test.ts`.
- Test behavior, not implementation. No assertions on internal reactive state that is not returned.
- For DOM-dependent composables, use `@vue/test-utils` via `@petr-ptacek/vue-test-utils`.
- Use `vi.useFakeTimers()` / `vi.useRealTimers()` for time-dependent composables (`useStableLoading`).

```ts
import { describe, it, expect } from "vitest";
import { useXxx } from "../useXxx";

describe("useXxx", () => {
  it("...", () => { ... });
});
```

No coverage thresholds are enforced for vue-core, but all public code paths should have tests.

## README.md

Each composable and component needs a `README.md`. Standard section order (omit non-applicable):

1. Title (`# useXxx` or `# ComponentName`)
2. Short description
3. Motivation / Why this exists
4. What it does / What it does NOT do (for composables with subtle scope)
5. Basic usage (import + minimal example)
6. Timing behavior / State model (if applicable)
7. API (options, return value)
8. Design notes
9. When to use / When NOT to use
10. Typical pairing (with other composables or components)
11. Summary

Max ~200 lines. No marketing language.

## Documentation System

Documentation is generated by `docs/.vitepress/scripts/generateApiMetadata.ts` and powered by VitePress.

### meta.ts

Every composable, component, and utility must have a `meta.ts` alongside its `index.ts`:

```ts
import type { Meta } from "../../_internal/meta";

export const meta: Meta = {
  id: "useXxx",
  name: "useXxx",
  kind: "composable", // "composable" | "component" | "utility"
  description: "One sentence.",
  tags: ["tag1", "tag2"],
  snippets: false,
  demo: false,
  since: "1.0.0",
};
```

`meta` is internal — never export it from `index.ts`.

### Snippets

Add a `snippets/` directory with `.ts` or `.vue` usage examples. Filenames become section headings. Both extensions are supported — the generator uses the correct code fence automatically.

Always import from the package name in snippets — they represent consumer code, not internal usage:

```ts
// ✅ correct
import { useXxx } from "@petr-ptacek/vue-core";

// ❌ wrong
import { useXxx } from "../useXxx";
```

```
snippets/
  basic.ts
  with-options.ts
  template-usage.vue
```

Set `meta.snippets = true` when at least one snippet exists.

### Demos

Add a `demo/` directory with `.vue` files for interactive demos rendered inline on the docs page:

```
demo/
  basic.vue
  advanced.vue
```

- Demo files import from relative paths: `import { useXxx } from '../useXxx'`
- Multiple demo files are rendered sequentially with a heading per file
- VitePress renders these as live Vue components in the browser
- Set `meta.demo = true` when at least one demo exists

### Build commands

```bash
pnpm --filter @petr-ptacek/vue-core run docs:meta    # generate markdown + items.json
pnpm --filter @petr-ptacek/vue-core run docs:dev     # meta + VitePress dev server
pnpm --filter @petr-ptacek/vue-core run docs:build   # meta + static build
```

Generated files (`docs/api/`, `docs/.vitepress/dist/`) are gitignored. `docs/.vitepress/data/items.json` is auto-generated but committed as a placeholder (empty structure) so VitePress config can import it before the first run.

## When Adding New Composables, Components, or Utilities

1. Create the directory structure per module type (see Module Structure above)
2. Implement the logic
3. Write tests in `__tests__/`
4. Add `meta.ts`
5. Write `README.md`
6. Export from the category `index.ts` and from `src/index.ts`
7. Run `pnpm docs:meta` to verify the page generates correctly

## When Modifying Existing Composables or Components

After any change to behavior, options, or return values, always update:

1. **`README.md`** — signatures, behavior description, When To Use / When Not To Use
2. **`types.ts`** — type definitions and JSDoc on individual fields
3. **`__tests__/`** — remove tests for removed behavior, add tests for new behavior
4. **`snippets/`** — update examples to reflect current behavior
5. **`demo/`** — update if visual behavior changed

These are part of the definition of done, not optional.

## What Does NOT Belong in vue-core

- Framework-agnostic logic → belongs in `js-core`
- Application-specific business logic
- Utilities duplicating VueUse primitives without adding meaningful abstraction
- Components with hard-coded styles (use CSS custom properties / `ui` prop instead)
- Global state or stores (Pinia, Vuex)
