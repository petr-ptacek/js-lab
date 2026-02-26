# UiContentFrame

`UiContentFrame` is a **structural UI component** for vertical content composed of three sections:

- `header`
- `content` (body)
- `footer`

The primary goal of this component is to **keep scrolling inside the content area**, while header and footer remain
visually separated and stable.

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

## Examples

### Simple layout with header and footer

```vue

<UiContentFrame>
  <template #header>
    <h1>Page Title</h1>
  </template>

  <p>This is the main content area.</p>

  <template #footer>
    <button>Action</button>
  </template>
</UiContentFrame>
```

### With custom styling using CSS variables

```vue

<UiContentFrame style="--ui-content-frame-padding: 2rem; --ui-content-frame-border: 2px solid blue;">
  <template #header>Custom Styled Header</template>
  <div>Content with custom padding</div>
  <template #footer>Footer</template>
</UiContentFrame>
```

### Non-scrollable mode for short content

```vue

<UiContentFrame :scrollable="false">
  <template #header>Short Page</template>
  <div>Short content that grows naturally.</div>
  <template #footer>Footer</template>
</UiContentFrame>
```

### Using additional slots

```vue

<UiContentFrame>
  <template #contentBefore>
    <div>Content before main slot</div>
  </template>

  <div>Main content</div>

  <template #contentAfter>
    <div>Content after main slot</div>
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

| Value   | Behavior                                        |
|---------|-------------------------------------------------|
| `true`  | internal scrolling inside the content section   |
| `false` | auto-grow layout, scrolling delegated to parent |

### `ui`

```ts
ui?: {
  root?: CSSClassValue;
  header?: CSSClassValue;
  content?: CSSClassValue;
  contentWrapper?: CSSClassValue;
  contentOverlay?: CSSClassValue;
  conntentScroll?: CSSClassValue;
  footer?: CSSClassValue;
}
```

Allows custom CSS classes for different parts of the component.

---

## Slots

| Slot             | Description                                                                                 | Type         |
|------------------|---------------------------------------------------------------------------------------------|--------------|
| `header`         | top section                                                                                 | `() => void` |
| `default`        | main content                                                                                | `() => void` |
| `footer`         | bottom section                                                                              | `() => void` |
| `overlay`        | overlay for absolutely positioned elements relative to the component root                   | `() => void` |
| `contentOverlay` | overlay layer rendered **above** the scrollable content area (covers the *visible viewport*, does not scroll with content) | `() => void` |

---

### `contentOverlay` example (preloader)

`contentOverlay` is useful for loaders/spinners or any UI that should visually cover the scrollable content area.

- The overlay layer covers the **visible** scroll viewport (so centered loaders stay centered even for very long content).
- The component only provides the overlay layer. Pointer/scroll behavior (e.g. `pointer-events`, scroll lock) is up to the consumer.

```vue
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

---

## Styling

The component uses CSS custom properties (variables) for easy customization:

- `--ui-content-frame-header-shadow`: Shadow for the header (default: `0 4px 10px rgba(0, 0, 0, 0.06)`)
- `--ui-content-frame-footer-shadow`: Shadow for the footer (default: `0 -4px 10px rgba(0, 0, 0, 0.06)`)
- `--ui-content-frame-border`: Border style (default: `1px solid #E5E5E5`)
- `--ui-content-frame-padding`: Padding for sections (default: `1rem`)

You can override these variables to customize the appearance:

```css
.ui-content-frame {
  --ui-content-frame-padding: 2rem;
  --ui-content-frame-border: 2px solid blue;
}
```

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
- supports customization via CSS variables

It is designed to be safe by default, while still allowing controlled escape when needed.
