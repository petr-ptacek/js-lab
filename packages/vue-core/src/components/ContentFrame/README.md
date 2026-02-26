# UiContentFrame

`UiContentFrame` is a **structural UI component** for vertical content
composed of three sections:

- `header`
- `content` (body)
- `footer`

The primary goal of this component is to **keep scrolling inside the
content area**, while header and footer remain visually separated and
stable.

The component **does not manage page or viewport layout**. It expects to
receive its height from the application layout.

------------------------------------------------------------------------

## What this component does

- provides a clear `header → content → footer` structure
- isolates scrolling inside the content section
- behaves predictably inside flex-based layouts
- supports nested usage (multiple levels deep)
- provides a controlled scroll API via `expose`
- defines an explicit contract for *scrollable* vs *auto-grow*
  behavior

------------------------------------------------------------------------

## What this component does NOT do

- it does not define page or viewport height
- it does not manage global application layout
- it does not handle horizontal or directional layouts
- it does not deal with portals (dropdowns, tooltips, etc.)
- it does not automatically block pointer events for overlays

------------------------------------------------------------------------

## Basic usage

``` vue
<UiContentFrame>
  <template #header>
    Header
  </template>

  <div>
    Content
  </div>

  <template #footer>
    Footer
  </template>
</UiContentFrame>
```

------------------------------------------------------------------------

## Scroll behavior (default)

Default behavior:

- `scrollable = true`
- scrolling happens **inside the content section**
- header and footer remain fixed within the frame

``` vue
<UiContentFrame>
  <template #header>Header</template>

  <div>
    Long content…
  </div>

  <template #footer>Footer</template>
</UiContentFrame>
```

------------------------------------------------------------------------

## Height contract (important)

> **A scrollable element must have a constrained height.**

`UiContentFrame` does not create its own height.\
It expects height to be propagated from the layout above it.

Typical height propagation chain:

    viewport / app layout
    → main container (flex-1, min-h-0)
    → page wrapper (h-full)
    → UiContentFrame (height: 100%)

If this chain is broken, scrolling will move to the parent (often
`body`).

------------------------------------------------------------------------

## Non-scrollable mode (`scrollable = false`)

In some situations it is desirable for the content to grow naturally and
let the parent handle scrolling.

``` vue
<UiContentFrame :scrollable="false">
  <template #header>Header</template>

  <div>
    Content that grows…
  </div>

  <template #footer>Footer</template>
</UiContentFrame>
```

### Behavior in this mode

- the component switches to an auto-height layout
- content grows naturally
- the entire component grows with the content
- footer is always rendered after the content

------------------------------------------------------------------------

## Slots

-----------------------------------------------------------------------

| Slot             | Description                                                                   |
|------------------|-------------------------------------------------------------------------------|
| `header`         | top section                                                                   |
| `default`        | main content                                                                  |
| `footer`         | bottom section                                                                |
| `overlay`        | overlay positioned relative to the component root                             |
| `contentOverlay` | overlay rendered above the scrollable viewport (does not scroll with content) |

------------------------------------------------------------------------

### `contentOverlay` example (preloader)

`contentOverlay` is useful for loaders/spinners or UI that should
visually cover the scrollable content area.

- The overlay layer covers the **visible scroll viewport**
- It does **not scroll** with content
- Pointer behavior (`pointer-events`) is controlled by the consumer

``` vue
<UiContentFrame>
  <template #contentOverlay>
    <div class="absolute inset-0 grid place-items-center bg-white/70">
      Loading...
    </div>
  </template>

  <div>
    Long content...
  </div>
</UiContentFrame>
```

------------------------------------------------------------------------

## Exposed API

`UiContentFrame` exposes internal elements and scroll utilities via
`ref`.

``` vue
<script setup lang="ts">
import { ref, onMounted } from "vue";

const frame = ref<InstanceType<typeof UiContentFrame> | null>(null);

onMounted(() => {
  frame.value?.scrollToTop({ behavior: "smooth" });
});
</script>

<template>
  <UiContentFrame ref="frame">
    <template #header>Header</template>
    <div>Long content...</div>
  </UiContentFrame>
</template>
```

### Exposed properties

``` ts
type Expose = {
  contentWrapper: ReadonlyRef<HTMLElement | null>;
  contentOverlay: ReadonlyRef<HTMLElement | null>;
  contentScroll: ReadonlyRef<HTMLElement | null>;
  content: ReadonlyRef<HTMLElement | null>;

  scrollTo(options: ScrollToOptions): boolean;
  scrollToTop(options?: Omit<ScrollToOptions, "top">): boolean;
  scrollToBottom(options?: Omit<ScrollToOptions, "top">): boolean;
}
```

### Scroll methods

#### `scrollTo(options)`

Low-level scroll method that proxies to the internal scroll container.

Returns `false` if:

- component is in `scrollable = false` mode
- scroll container is not mounted yet

#### `scrollToTop(options?)`

Scrolls to the top of the content.

#### `scrollToBottom(options?)`

Scrolls to the bottom of the content.

All scroll methods return a `boolean` indicating whether the scroll was
executed.

------------------------------------------------------------------------

## Props

### `scrollable`

```ts
scrollable?: boolean; // default: true
```

Value Behavior
  --------- -------------------------------------------------
`true`    internal scrolling inside the content section
`false`   auto-grow layout, scrolling delegated to parent

------------------------------------------------------------------------

### `ui`

``` ts
ui?: {
  root?: CSSClassValue;
  header?: CSSClassValue;
  content?: CSSClassValue;
  contentWrapper?: CSSClassValue;
  contentOverlay?: CSSClassValue;
  contentScroll?: CSSClassValue;
  footer?: CSSClassValue;
}
```

Allows custom CSS classes for different parts of the component.

------------------------------------------------------------------------

## Styling

The component uses CSS custom properties for customization:

- `--ui-content-frame-header-shadow`
- `--ui-content-frame-footer-shadow`
- `--ui-content-frame-border`
- `--ui-content-frame-padding`

Example:

``` css
.ui-content-frame {
  --ui-content-frame-padding: 2rem;
  --ui-content-frame-border: 2px solid blue;
}
```

------------------------------------------------------------------------

## When to use

- pages or panels with internal scrolling
- nested layout containers
- fixed header + footer content areas
- situations where scroll must be explicitly controlled

------------------------------------------------------------------------

## When NOT to use

- purely horizontal layouts
- small cards without scrolling needs
- global application layout (sidebar + main)
- places without a height constraint

------------------------------------------------------------------------

## Summary

`UiContentFrame` is a predictable, nested-safe content container that:

- keeps scrolling inside by default
- does not manage page height
- provides a controlled scroll API via `expose`
- supports overlay layers
- behaves consistently in complex flex layouts

It is designed to be safe by default, while still allowing controlled
extension when needed.
