# UiContentFrame

`UiContentFrame` is a **structural UI component** for vertical content composed of three sections:

- `header`
- `content` (body)
- `footer`

The primary goal of this component is to **keep scrolling inside the content area**, while header and footer remain visually separated and stable.

The component **does not manage page or viewport layout**. It expects to receive its height from the application layout.

---

## What this component does

- provides a clear `header → content → footer` structure
- isolates scrolling inside the content section
- behaves predictably inside flex-based layouts
- defines an explicit contract for *scrollable* vs *auto-grow* behavior

---

## What this component does NOT do

- it does not define page or viewport height
- it does not manage global application layout
- it does not handle horizontal or directional layouts
- it does not deal with portals (dropdowns, tooltips, etc.)

---

## Basic usage

```vue
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

---

## Scroll behavior (default)

Default behavior:

- `scrollable = true`
- scrolling happens **inside the content section**
- header and footer remain fixed within the frame

```vue
<UiContentFrame>
  <template #header>Header</template>

  <div>
    Long content…
  </div>

  <template #footer>Footer</template>
</UiContentFrame>
```

---

## Height contract (important)

> **A scrollable element must have a constrained height.**

`UiContentFrame` does not create its own height.  
It expects height to be propagated from the layout above it.

Typical height propagation chain:

```
viewport / app layout
→ main container (flex-1, min-h-0)
→ page wrapper (h-full)
→ UiContentFrame (height: 100%)
```

If this chain is broken, scrolling will move to the parent (often `body`).

---

## Non-scrollable mode (`scrollable = false`)

In some situations it is desirable for the content to grow naturally and let the parent handle scrolling.

Examples:
- short or static pages
- pages with their own scrollable widgets
- virtual lists, maps, or canvas-based content

```vue
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
- footer is always rendered **after** the content

---

## Props

### `scrollable`

```ts
scrollable?: boolean; // default: true
```

| Value | Behavior |
|------|----------|
| `true` | internal scrolling inside the content section |
| `false` | auto-grow layout, scrolling delegated to parent |

---

## Slots

| Slot | Description |
|------|------------|
| `header` | top section |
| default | main content |
| `footer` | bottom section |

---

## When to use

- pages or panels with internal scrolling
- content areas with fixed header and footer
- layouts where scroll must be controlled explicitly

---

## When NOT to use

- purely horizontal layouts
- small cards without scrolling needs
- global application layout (sidebar + main)
- places without a clear height constraint

---

## Summary

`UiContentFrame` is a predictable content container that:

- keeps scrolling inside by default
- does not manage page height
- provides an explicit, opt-in auto-grow mode
- behaves consistently in complex flex layouts

It is designed to be safe by default, while still allowing controlled escape when needed.
