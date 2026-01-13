# usePointerDrag

Low-level Vue composable for handling pointer-based drag interactions.

`usePointerDrag` provides a precise, framework-agnostic drag engine built on top
of Pointer Events. It exposes raw and interpreted drag data (delta, direction,
velocity) while leaving all rendering and layout logic to the consumer.

This composable is intended as **core infrastructure** for higher-level features
such as resize handles, splitters, sliders, or custom drag interactions.

---

## Features

- Pointer Events–based drag handling
- Axis restriction (`x`, `y`, `both`)
- Optional axis inversion
- Movement threshold (edge-triggered)
- Optional axis locking after threshold
- Drag direction detection
- Velocity calculation
- Multi-pointer safe
- No throttling or debouncing (raw & precise)

---

## Installation

```ts
import { usePointerDrag } from "@petr-ptacek/vue-core";
```

## Basic Usage

```vue

<script lang="ts" setup>
  import { usePointerDrag } from "@petr-ptacek/vue-core";

  const {
    onPointerDown,
    isDragging,
    deltaX,
    deltaY,
  } = usePointerDrag();

</script>

<template>
  <div @pointerdown="onPointerDown" />
</template>
```

## Options

```ts
usePointerDrag({
  disabled? : Ref<boolean> | boolean;
  axis? : "x" | "y" | "both";
  threshold? : number;
  invertAxis? : "x" | "y" | "both" | boolean;
  lockAxisAfterThreshold? : boolean;

  onStart? : (event) => void | false;
  onMove? : (event) => void;
  onEnd? : (event) => void;
})
;
```

## `Axis`

Restricts movement to a specific axis.

- "x" – horizontal only

- "y" – vertical only

- "both" (default)

## `threshold`

Minimum movement (in pixels) required before the drag becomes active.

- Edge-triggered (one-shot)
- Once passed, stays active until drag ends

## `lockAxisAfterThreshold`

When enabled and `axis === "both"`, the drag locks permanently to the dominant
axis (`x` or `y`) after the threshold is crossed.

## `invertAxis`

Inverts the delta sign on selected axes.

```ts
invertAxis: "x";      // invert horizontal direction
invertAxis: "y";      // invert vertical direction
invertAxis: "both";   // invert both axes
invertAxis: true;     // same as "both"
```

Commonly used for left / top resize handles.

## `direction`

Semantic drag direction derived from effective deltas:

- `"left"`
- `"right"`
- `"top"`
- `"bottom"`
- `null`

Horizontal direction has priority over vertical.

## Callbacks

## `onStart(event)`

Called on pointer down, before drag starts.
Returning false cancels the drag.

```ts
onStart: (e) => {
  if (e.evt.button !== 0) return false;
};
```

## `onMove(event)`

Called on every pointer move after the threshold is passed.

## `onEnd(event)`

Called once when the drag ends.

## `Event Data`

All callbacks receive the same event shape:

```ts
{
  evt: PointerEvent;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  velocityX: number;
  velocityY: number;
}
```

## Returned Values

```ts
const {
  onPointerDown,
  isDragging,

  axis,
  direction,
  invertAxis,

  startX,
  startY,
  deltaX,
  deltaY,

  velocityX,
  velocityY,
} = usePointerDrag();
```

## Performance Notes

- No throttling or debouncing is applied internally
- Pointer events are handled at native frequency
- All computations are lightweight and synchronous

If throttling is required, it should be applied by the consumer, not inside
`usePointerDrag`.

## Intended Use Cases

- Resize handles
- Splitters
- Sliders
- Timeline scrubbing
- Custom drag interactions

## Not Included (by design)

- Snapping
- Bounds / clamping
- Inertia or momentum
- Animations
- DOM manipulation

These belong in higher-level composables or components.
