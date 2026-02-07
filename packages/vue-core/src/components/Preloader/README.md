# UiPreloader

`UiPreloader` is a flexible, non-intrusive loading indicator component designed for
**stable loading UX**, **composable styling**, and **predictable behavior**.

It combines a presentational component with the `useStableLoading` composable to
avoid flickering loaders and provide consistent loading feedback.

---

## Motivation

Naive loaders often suffer from two UX issues:

1. They appear for very short operations, causing visual noise.
2. They disappear immediately, resulting in brief flashes.

`UiPreloader` solves this by:
- delaying appearance of the loader
- enforcing a minimum visible duration once shown
- separating **behavior** from **presentation**

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import { UiPreloader } from "@petr-ptacek/vue-core";

const loading = ref(false);
</script>

<template>
  <div class="relative">
    <UiPreloader :visible="loading" />
    <!-- content -->
  </div>
</template>
```

The preloader is positioned absolutely and covers its nearest positioned ancestor.

---

## Stable Loading Behavior

Internally, the component uses `useStableLoading`.

Default timing:
- `delay`: 250 ms
- `minVisible`: 300 ms

```vue
<UiPreloader
  :visible="loading"
  :delay="400"
  :min-visible="600"
/>
```

Behavior summary:
- short operations never show the loader
- once visible, the loader stays visible for at least `minVisible`
- transitions are predictable and flicker-free

---

## Props

### `visible`

```ts
visible?: boolean;
```

Controls the source loading state.

---

### `delay`

```ts
delay?: number;
```

Delay (ms) before the loader becomes visible.

---

### `minVisible`

```ts
minVisible?: number;
```

Minimum time (ms) the loader stays visible once shown.

---

### `spinner`

```ts
spinner?: boolean;
```

Enables or disables the spinner entirely.

---

### `message`

```ts
message?: string;
```

Optional loading message.

---

### `backdrop`

```ts
backdrop?: boolean;
```

Enables a glass-like backdrop overlay that blocks pointer interaction.

---

### `size`

```ts
size?: "sm" | "md" | "lg" | string;
```

Defines default visual sizing via CSS variables.

See [Size API](./UiPreloader-size.md) for details.

---

### `ui`

```ts
ui?: {
  root?: CSSClassValue;
  content?: CSSClassValue;
  spinner?: CSSClassValue;
  message?: CSSClassValue;
}
```

Escape hatch for styling.  
Classes provided via `ui` **always take precedence** over size presets.

---

## Slots

### `spinner`

```ts
spinner(props: { size: PreloaderSize }): void;
```

Overrides the spinner content.

---

### `message`

```ts
message(): void;
```

Overrides the message rendering.

---

### `content`

```ts
content(props: { size: PreloaderSize; message?: string }): void;
```

Overrides the entire preloader content.

---

## Styling & Customization

### Overriding Size Without Changing Preset

```vue
<UiPreloader
  :visible="loading"
  :ui="{
    spinner: 'size-18!',
    message: 'text-xl!'
  }"
/>
```

---

### Custom Size Preset

```vue
<UiPreloader size="xl" />
```

```css
.ui-preloader[data-preloader-size="xl"] {
  --ui-preloader-spinner-size: 14rem;
  --ui-preloader-gap: 2rem;
  --ui-preloader-font-size: 1.25rem;
}
```

---

## Backdrop Behavior

When `backdrop` is enabled:
- a pseudo-element overlay is rendered
- pointer events are blocked
- a subtle glass (blur) effect is applied

The backdrop is implemented without additional DOM nodes.

---

## Positioning

`UiPreloader` uses `position: absolute` by default.

Typical patterns:
- wrap content in a `position: relative` container
- use fixed dimensions for block-level loaders
- combine with grid/flex layouts

The component itself does not enforce layout constraints.

---

## Accessibility

- Spinner animation respects `prefers-reduced-motion`
- Content remains screen-reader friendly
- No forced focus or ARIA traps are introduced

---

## Design Notes

- No `v-model` – the component does not emit state
- No special opt-out size values
- CSS-first styling
- Slot-first extensibility
- Stable loading handled separately via composable

---

## When to Use

Use `UiPreloader` when:
- you need consistent loading UX
- loading duration is unpredictable
- UI flicker must be avoided

Avoid when:
- loading is instantaneous and purely synchronous
- skeletons or inline placeholders are more appropriate

---

## Summary

- stable loading behavior by default
- composable and override-friendly styling
- minimal API surface
- suitable for both small widgets and large layouts
