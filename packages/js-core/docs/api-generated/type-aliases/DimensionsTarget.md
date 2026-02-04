# Type Alias: DimensionsTarget

> **DimensionsTarget** = \{ `width`: `number`; `height?`: `never`; \} \| \{ `height`: `number`; `width?`: `never`; \}

Defines a target dimension using a single axis.

Exactly one property must be provided:
- `width` to target the horizontal dimension
- `height` to target the vertical dimension

This type enforces an exclusive choice between dimensions and
prevents invalid states where both or neither are specified.

## Since

1.0.0
