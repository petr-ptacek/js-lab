# UiPreloader – Size API

This document describes the `size` API of the `UiPreloader` component, including
default presets, customization options, and override mechanisms.

---

## Overview

The `size` prop controls the **default visual sizing** of the preloader:
- spinner dimensions
- spacing between elements
- message typography

Sizing is implemented via **CSS variables**, making it flexible and easily overridable.

```vue
<UiPreloader size="md" :visible="true" />
```

---

## Default Size Presets

The component provides three built-in size presets:

| Size | Description |
|-----|------------|
| `sm` | Compact size, suitable for small containers |
| `md` | Default size, balanced for most use cases |
| `lg` | Large size, suitable for full-page or prominent loaders |

Each preset defines internal CSS variables such as:

```css
--ui-preloader-spinner-size
--ui-preloader-gap
--ui-preloader-font-size
```

---

## Custom Sizes

The `size` prop also accepts **custom string values**:

```vue
<UiPreloader size="xl" :visible="true" />
```

Custom sizes are exposed via the `data-preloader-size` attribute:

```html
<div class="ui-preloader" data-preloader-size="xl">
```

This allows consumers to define their own sizing rules:

```css
.ui-preloader[data-preloader-size="xl"] {
  --ui-preloader-spinner-size: 14rem;
  --ui-preloader-gap: 2rem;
  --ui-preloader-font-size: 1.25rem;
}
```

---

## Overriding Size via `ui` Prop

The `ui` prop acts as an **escape hatch** and always takes precedence over size presets.

It allows overriding individual parts of the component using classes:

```vue
<UiPreloader
  :visible="loading"
  :ui="{
    spinner: 'size-18!',
    message: 'text-2xl!'
  }"
/>
```

This approach:
- does not require changing the `size` prop
- works with utility-first CSS (e.g. Tailwind)
- allows per-instance customization

---

## Precedence Rules

1. `ui` prop overrides everything
2. `size` preset defines defaults
3. component internal styles act as fallback

This ensures predictable and composable styling behavior.

---

## When to Use `size`

Use `size` when:
- you want consistent sizing across the application
- defaults are sufficient or only lightly customized
- you want semantic size presets

Prefer `ui` overrides when:
- you need per-instance control
- sizing is tightly coupled to layout
- you want to override only a single part (e.g. spinner only)

---

## Summary

- `size` defines default visual presets
- built-in: `sm`, `md`, `lg`
- custom sizes supported via string values
- `ui` prop always has final authority
- no special opt-out values are required

This design keeps the API minimal while remaining fully extensible.
