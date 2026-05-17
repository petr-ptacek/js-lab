# useElementOverflow

Reactively detects whether a DOM element overflows its bounds.

Tracks horizontal, vertical, or both directions and updates automatically when the element is resized
or its content changes.

---

## Motivation

Knowing whether an element overflows is needed for:

- showing/hiding scroll indicators or fade gradients
- conditionally rendering "show more" controls
- adjusting layout when content exceeds available space

Reading `scrollWidth > clientWidth` manually means wiring up ResizeObservers and cleanup by hand.
`useElementOverflow` wraps this into a reactive composable — just pass a ref to the element and read
the overflow state.

---

## Basic usage

```ts
import { useTemplateRef } from "vue";
import { useElementOverflow } from "@petr-ptacek/vue-core";

const container = useTemplateRef<HTMLElement>("container");

const { hasOverflow, direction } = useElementOverflow(container);
```

```vue
<template>
  <div
    ref="container"
    style="overflow: auto; height: 200px;"
  >
    <!-- long content -->
  </div>

  <span v-if="hasOverflow">Scroll to see more</span>
</template>
```

---

## How it works

The composable observes two things:

1. **Element size** — via `useElementSize` from VueUse. Triggers recalculation when the element's
   layout dimensions change (e.g. window resize, flex reflow).
2. **Content size** — via `ResizeObserver` (when `observeContent: true`, which is the default).
   Catches content-driven changes such as async data loading or slot updates that don't affect
   the element's own dimensions.

Overflow is determined by comparing `scrollWidth / scrollHeight` against `clientWidth / clientHeight`.
Recalculations are debounced (default 16 ms — one animation frame) to avoid excessive reads.

---

## API

### `useElementOverflow(target, options?)`

#### Parameters

**`target`**

```ts
MaybeComputedElementRef<HTMLElement | null>;
```

A reactive reference to the target element. Accepts `ref<HTMLElement>`, `useTemplateRef`, or a getter
returning an element.

---

**`options`**

```ts
{
  disabled ? : MaybeRef<boolean>;
  observeContent ? : MaybeRef<boolean>;
  debounceDelay ? : number;
}
```

| Option           | Type                | Default | Description                                                                   |
| ---------------- | ------------------- | ------- | ----------------------------------------------------------------------------- |
| `disabled`       | `MaybeRef<boolean>` | `false` | Disables detection. Overflow state is reset to `false` while disabled.        |
| `observeContent` | `MaybeRef<boolean>` | `true`  | Observe content size changes via `ResizeObserver` in addition to layout size. |
| `debounceDelay`  | `number`            | `16`    | Debounce delay in ms for layout-based recalculations (~1 animation frame).    |

---

### Return value

```ts
{
  hasOverflow:    Readonly<Ref<boolean>>;
  hasHorizontal:  Readonly<Ref<boolean>>;
  hasVertical:    Readonly<Ref<boolean>>;
  direction:      Readonly<Ref<OverflowDirection>>;
  update:         () => void;
  reset:          () => void;
}
```

| Field           | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| `hasOverflow`   | `true` if the element overflows in any direction.                         |
| `hasHorizontal` | `true` if `scrollWidth > clientWidth`.                                    |
| `hasVertical`   | `true` if `scrollHeight > clientHeight`.                                  |
| `direction`     | `"none"` \| `"horizontal"` \| `"vertical"` \| `"both"`                    |
| `update()`      | Forces an immediate overflow recalculation outside of the observer cycle. |
| `reset()`       | Resets all overflow state to `false` without recalculating.               |

---

## Conditional scroll indicator

```ts
const { direction } = useElementOverflow(container);
```

```vue
<template>
  <div class="wrapper">
    <div
      ref="container"
      class="content"
    >
      ...
    </div>
    <div
      v-if="direction === 'vertical' || direction === 'both'"
      class="fade-bottom"
    />
  </div>
</template>
```

---

## Disabling detection

The `disabled` option accepts a `MaybeRef<boolean>` — it can be toggled reactively at runtime.
When disabled, overflow state is immediately reset to `false`.

```ts
const enabled = ref(true);

const { hasOverflow } = useElementOverflow(container, {
  disabled: computed(() => !enabled.value),
});
```

---

## Design Notes

- `observeContent: true` covers cases where content changes without the element itself being resized —
  for example, a list populated from an API after initial render.
- Setting `observeContent: false` reduces observer count when only layout-driven changes matter
  (e.g. a fixed-size container whose content is always static).
- `update()` is exposed for cases where the composable cannot detect a change automatically —
  for example, after programmatically scrolling or modifying content via a direct DOM call.

---

## When to use

- Showing scroll hints, fade overlays, or "read more" controls based on content overflow
- Reacting to layout changes that cause content to overflow a container
- Any case where `scrollWidth > clientWidth` or `scrollHeight > clientHeight` drives UI logic

## When NOT to use

- Tracking scroll position — use `useScroll` from VueUse instead
- Detecting overflow on the `<body>` or `<html>` element — use `useWindowSize`
- Overflow caused by CSS `overflow: hidden` with no scrollable area — `scrollWidth/clientWidth`
  comparisons still reflect content size, but the user cannot scroll regardless
