# useProxyValue

Creates a buffered proxy ref that stages changes before committing back to a source ref.

The core idea: instead of writing directly to a `v-model` ref, you write to an internal buffer first.
The buffer can then be committed (`sync`) or discarded (`reset`) at any point — or committed automatically on every change.

---

## Motivation

Direct two-way binding via `v-model` is fine for simple inputs. But many real-world cases need more control:

- A form where changes should only apply on submit
- A controlled input that needs debouncing before updating the parent
- A component that must work without a parent binding (controlled + uncontrolled)

`useProxyValue` handles all three with a single composable.

---

## State model

```
sourceValue (external v-model ref)
    ↓ read / written back via sync()
  buffer (internal mutable ref — staged changes live here)
    ↓ read by
   value (writable computed — the public proxy)
```

- `value` reads from `buffer` when unsynced, from `sourceValue` when synced
- writing to `value` updates `buffer`; if `autoSync` is on, also calls `sync()` immediately
- `sync()` writes `buffer` back to `sourceValue`
- `reset()` overwrites `buffer` from `sourceValue` (or `defaultValue` if source is `undefined`)

---

## Basic usage — v-model wrapper

```ts
import { computed } from "vue";
import { useProxyValue } from "@petr-ptacek/vue-core";

// inside <script setup>
const props = defineProps<{ modelValue?: string }>();
const emit = defineEmits<(e: "update:modelValue", v: string) => void>();

const { value } = useProxyValue(
  computed({
    get: () => props.modelValue,
    set: (v) => {
      if (v !== undefined) emit("update:modelValue", v);
    },
  }),
  () => "", // defaultValue factory — used when modelValue is undefined
  { autoSync: true } // default; every write to value immediately syncs back
);
```

```vue
<template>
  <input v-model="value" />
</template>
```

---

## Form staging — commit on submit

```ts
const { value, sync, reset, isSynced } = useProxyValue(source, () => "", {
  autoSync: false, // changes stay in buffer until sync() is called
});
```

```vue
<template>
  <input v-model="value" />
  <button
    :disabled="isSynced"
    @click="sync"
  >
    Save
  </button>
  <button @click="reset">Cancel</button>
</template>
```

---

## Debounced input

```ts
const { debouncedValue } = useProxyValue(source, () => "", {
  debounce: 300, // writes to buffer are debounced 300 ms
  autoSync: true,
});
```

```vue
<template>
  <!-- UI updates immediately; buffer (and source) update after 300 ms idle -->
  <input v-model="debouncedValue" />
</template>
```

---

## API

### `useProxyValue(sourceValue, defaultValue, options?)`

#### Parameters

**`sourceValue`**

```ts
Ref<TValue | undefined>;
```

The external reactive ref — typically a computed wrapping `props.modelValue` + `emit`.
When `sourceValue.value` is `undefined`, the `defaultValue` is used instead.
`null` is treated as a valid value and does **not** trigger the default.

---

**`defaultValue`**

```ts
TValue | (() => TValue);
```

Fallback value used when `sourceValue.value` is `undefined`. Accepts a plain value or a factory function.
The factory is re-evaluated on every `reset()` call, making it suitable for producing fresh objects.

```ts
// plain value — same reference reused
useProxyValue(source, []);

// factory — new array on every reset
useProxyValue(source, () => []);
```

---

**`options`**

```ts
{
  autoSync?: boolean;    // default: true — sync on every write to value
  debounce?: number;     // ms — debounce writes to buffer via debouncedValue
  syncDebounce?: number; // ms — debounce calls to syncDebounced()
}
```

---

### Return value

| Field               | Type                     | Description                                                      |
| ------------------- | ------------------------ | ---------------------------------------------------------------- |
| `value`             | `WritableComputedRef<T>` | The main proxy ref. Read from it; write to it.                   |
| `debouncedValue`    | `WritableComputedRef<T>` | Debounced version of `value` — writes are delayed.               |
| `buffer`            | `Ref<T>`                 | The internal mutable buffer. Prefer `value` in templates.        |
| `isSynced`          | `Readonly<Ref<boolean>>` | `true` when buffer matches `sourceValue`.                        |
| `isAutoSync`        | `Readonly<Ref<boolean>>` | Reflects current auto-sync state.                                |
| `sync()`            | `() => void`             | Commits buffer to `sourceValue`. No-op if source is `undefined`. |
| `syncDebounced()`   | `() => void`             | Debounced version of `sync`.                                     |
| `reset()`           | `() => void`             | Restores buffer from `sourceValue` or `defaultValue`.            |
| `enableAutoSync()`  | `() => void`             | Turns on auto-sync at runtime.                                   |
| `disableAutoSync()` | `() => void`             | Turns off auto-sync at runtime.                                  |

---

## Design Notes

- `sync()` is a no-op when `sourceValue.value === undefined` — this prevents writing `undefined` back to a parent that has not yet provided a value.
- `reset()` always re-evaluates a factory `defaultValue`, making it safe to use with mutable defaults (arrays, objects).
- `disableAutoSync()` only affects writes to `value`. External changes to `sourceValue` always update the buffer regardless of auto-sync state.
- `buffer` is exposed mainly for diagnostic use. Direct writes to `buffer` bypass the sync mechanism — prefer `value`.

---

## When to use

- Wrapping `v-model` in a component that needs buffering or debouncing
- Forms where changes should only apply on explicit user action
- Components that must work in both controlled (with `modelValue`) and uncontrolled mode

## When NOT to use

- Simple pass-through `v-model` with no buffering — just use a computed with get/set
- Global or cross-component state — use a store instead
