---
title: RoundValueFn
category: type
tags:
  - type
  - function
  - rounding
  - numeric
  - precision
  - math
since: 1.0.0
---


> **Category:** type
> **Since:** 1.0.0
> **Tags:** type, function, rounding, numeric, precision, math


# RoundValueFn

Function used to round a numeric value.

## Usage

```ts
import type { RoundValueFn } from "@petr-ptacek/js-core"

// Built-in rounding functions
const roundDown: RoundValueFn = Math.floor
const roundUp: RoundValueFn = Math.ceil
const roundNearest: RoundValueFn = Math.round

// Custom rounding functions
const roundToEven: RoundValueFn = (value) => {
  const rounded = Math.round(value)
  return rounded % 2 === 0 ? rounded : rounded + 1
}

const roundToDecimalPlaces = (places: number): RoundValueFn => {
  const factor = Math.pow(10, places)
  return (value) => Math.round(value * factor) / factor
}

// Usage in scaling operations
function scaleValue(original: number, factor: number, rounder: RoundValueFn): number {
  return rounder(original * factor)
}

const scaled1 = scaleValue(10.7, 1.5, Math.round) // 16
const scaled2 = scaleValue(10.7, 1.5, Math.floor) // 16
const scaled3 = scaleValue(10.7, 1.5, roundToDecimalPlaces(1)) // 16.1
```

## Why This Type Exists

Numerical calculations often produce floating-point results that need rounding for practical use. `RoundValueFn` provides a standardized interface for rounding strategies, allowing utilities to accept customizable rounding behavior while maintaining type safety and enabling different precision requirements across various use cases.

## Type Declaration

```ts
type RoundValueFn = (value: number) => number
```

## When To Use

Use `RoundValueFn` when:

- building scaling or mathematical utilities that need configurable rounding
- working with dimensions, coordinates, or measurements
- implementing financial calculations with specific precision requirements
- creating graphics or layout utilities that need pixel-perfect results
- providing customizable precision in data processing

```ts
// Dimension scaling with custom rounding
interface ScaleOptions {
  factor: number
  roundWidth?: RoundValueFn
  roundHeight?: RoundValueFn
}

function scaleDimensions(
  width: number, 
  height: number, 
  options: ScaleOptions
): { width: number; height: number } {
  const { factor, roundWidth = Math.round, roundHeight = Math.round } = options
  
  return {
    width: roundWidth(width * factor),
    height: roundHeight(height * factor)
  }
}

// Financial calculations
const roundToCents: RoundValueFn = (value) => Math.round(value * 100) / 100
const roundDownToCents: RoundValueFn = (value) => Math.floor(value * 100) / 100

function calculateTax(amount: number, rate: number, rounder: RoundValueFn): number {
  return rounder(amount * rate)
}

// Grid alignment
const snapToGrid = (gridSize: number): RoundValueFn => 
  (value) => Math.round(value / gridSize) * gridSize

const snapTo8px = snapToGrid(8)
const snapTo16px = snapToGrid(16)

// Position calculations
interface PositionOptions {
  x: number
  y: number
  roundX?: RoundValueFn
  roundY?: RoundValueFn
}

function calculatePosition(options: PositionOptions) {
  const { x, y, roundX = Math.round, roundY = Math.round } = options
  return {
    x: roundX(x),
    y: roundY(y)
  }
}

// Usage with different strategies
const pixelPerfect = calculatePosition({
  x: 10.7,
  y: 15.3,
  roundX: Math.round, // 11
  roundY: Math.floor  // 15
})

const gridAligned = calculatePosition({
  x: 10.7,
  y: 15.3,
  roundX: snapTo8px, // 8
  roundY: snapTo8px  // 16
})
```

## When Not To Use

Avoid when:

- you always use the same rounding strategy (use `Math.round` etc. directly)
- rounding is not needed (work with exact decimal values)
- you need complex mathematical transformations beyond simple rounding
- the overhead of function calls is significant for performance-critical code

## Design Notes

This type serves as a standardized interface for rounding operations:

1. **Flexibility**: Accepts any rounding strategy as a function
2. **Composability**: Can be combined with other mathematical operations
3. **Reusability**: Common rounding functions can be shared across utilities
4. **Type safety**: Ensures rounding functions have correct signature

The type is commonly used in graphics, layout, financial calculations, and any domain where precise control over numerical precision is important.

## Summary

`RoundValueFn` provides a standardized interface for numeric rounding operations, enabling customizable precision control in mathematical utilities while maintaining type safety and supporting various rounding strategies from simple to domain-specific requirements.





