# useStableLoading

Composable for stabilizing a boolean loading state to prevent UI flicker.

`useStableLoading` solves a common UX problem where loading indicators appear briefly during short async operations, causing distracting flashes or inconsistent behavior.
Instead of reacting immediately to a raw `boolean`, this composable introduces predictable timing rules.

---

## Motivation

In real-world applications, many async operations complete very quickly:

- cached requests
- local computations
- fast API responses

If a loader is shown immediately, this often results in:

- loaders flashing for a few milliseconds
- UI elements “blinking”
- inconsistent perceived performance

`useStableLoading` addresses this by:

- delaying the appearance of the loading state
- enforcing a minimum visible duration once it appears

The result is a **stable, predictable loading signal** suitable for UI components.

---

## What this composable does

- Delays the appearance of a loading indicator
- Prevents loaders from appearing for very short operations
- Ensures a minimum visible duration once shown
- Produces a single, stable `loading` ref intended for UI usage

---

## What this composable does NOT do

- It does not render any UI
- It does not manage async operations or promises
- It does not handle animations or transitions
- It does not debounce or throttle events

This composable only stabilizes **time-based behavior of a boolean state**.

---

## Basic usage

```ts
import { ref } from "vue";
import { useStableLoading } from "@petr-ptacek/vue-core";

const isFetching = ref(false);

const { loading } = useStableLoading(isFetching, {
  delay: 250,
  minVisible: 300,
});
```

```vue
<UiPreloader :visible="loading" />
```

The UI reacts only to `loading`, not to the raw source state.

---

## Timing behavior

With the default configuration:

- `delay = 250 ms`
- `minVisible = 300 ms`

### Short operation (e.g. 100 ms)

- Loader is never shown
- No flicker

### Medium operation (e.g. 400 ms)

- Loader appears after delay
- Remains visible for at least `minVisible`
- Smooth UX

### Long operation (e.g. 2 seconds)

- Loader behaves as expected
- No artificial delay when hiding

---

## API

### `useStableLoading(source, options?)`

#### Parameters

**`source`**

```ts
Ref<boolean>
```

Reactive boolean indicating whether an operation is currently in progress.

---

**`options`**

```ts
{
  delay?: number;
  minVisible?: number;
}
```

- `delay`
  Time in milliseconds to wait before showing the loading state.
  Default: `250`

- `minVisible`
  Minimum time in milliseconds that the loading state must remain visible once shown.
  Default: `300`

These values are treated as **static configuration**, not reactive state.

---

### Return value

```ts
{
  loading: Readonly<Ref<boolean>>;
  isDelaying: Readonly<Ref<boolean>>;
  isHolding: Readonly<Ref<boolean>>;
}
```

- `loading`
  The stabilized loading state.
  **This is the only value intended for UI consumption.**

- `isDelaying`
  Indicates that the composable is waiting for the delay to elapse.

- `isHolding`
  Indicates that the loading state is being kept visible to satisfy `minVisible`.

The additional flags are primarily intended for diagnostics, testing, or advanced use cases.

---

## Design notes

- This composable is deterministic and side-effect free
- It does not depend on any UI components
- It can be reused for spinners, preloaders, skeletons, or overlays
- It is designed to be easily testable with fake timers

The goal is **stable UX**, not reactive complexity.

---

## When to use

- You want to avoid loader flicker
- You need consistent loading behavior across components
- You separate timing logic from presentation logic

---

## When NOT to use

- You want to show a loader immediately
- You need progress-based indicators
- You are handling promise lifecycles directly

---

## Typical pairing

`useStableLoading` is commonly used together with UI components such as:

- preloaders
- loading overlays
- skeleton wrappers

The composable controls **when**, the component controls **how**.

---

## Summary

`useStableLoading` provides a small but important UX improvement by stabilizing loading signals over time.
It keeps UI logic simple while preventing common visual issues caused by short-lived async operations.
