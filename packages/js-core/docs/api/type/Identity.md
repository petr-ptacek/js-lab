---
title: Identity
category: type
tags:
  - type
  - function
  - identity
  - passthrough
  - neutral
since: 1.0.0
---


> **Category:** type
> **Since:** 1.0.0
> **Tags:** type, function, identity, passthrough, neutral


# Identity

Represents an identity function.

## Usage

```ts
import type { Identity } from "@petr-ptacek/js-core"

// Basic identity functions
const identityNumber: Identity<number> = (value) => value
const identityString: Identity<string> = (value) => value
const identityUser: Identity<User> = (user) => user

// Default projections
function processItems<T, U>(
  items: T[],
  projection: (item: T) => U = identityNumber as any
): U[] {
  return items.map(projection)
}

// Passthrough in pipelines
function createPipeline<T>() {
  const transformers: Array<(value: T) => T> = []
  
  return {
    add(transformer: Identity<T> = (x) => x) {
      transformers.push(transformer)
      return this
    },
    
    execute(value: T): T {
      return transformers.reduce((acc, fn) => fn(acc), value)
    }
  }
}

// Usage examples
const numberPipeline = createPipeline<number>()
  .add((x) => x * 2)
  .add((x) => x) // identity - no transformation
  .add((x) => x + 1)

const result = numberPipeline.execute(5) // ((5 * 2) * 1) + 1 = 11
```

## Why This Type Exists

Identity functions are fundamental in functional programming as neutral elements for composition and default values for optional transformations. `Identity<T>` provides a clear, typed representation for functions that pass values through unchanged, commonly used in higher-order functions, pipelines, and as default parameters.

## Type Declaration

```ts
type Identity<T> = (value: T) => T
```

## Type Parameters

- `<T>`: The type of both the input and output value (they are the same).

## When To Use

Use `Identity<T>` when:

- providing default transformation functions in utilities
- building functional pipelines that may skip certain steps
- creating no-op transformations in conditional logic
- implementing neutral elements in composition patterns
- working with higher-order functions that need passthrough options

```ts
// Conditional transformation
function conditionalTransform<T>(
  value: T,
  condition: boolean,
  transform: Identity<T>
): T {
  return condition ? transform(value) : value
}

// Utility with optional transformation
function mapWithOptionalTransform<T>(
  array: T[],
  transform?: Identity<T>
): T[] {
  const fn = transform || ((x: T) => x)
  return array.map(fn)
}

// Composition with neutral element
function compose<T>(...fns: Identity<T>[]): Identity<T> {
  return (value: T) => fns.reduce((acc, fn) => fn(acc), value)
}

const composed = compose<number>(
  (x) => x * 2,
  (x) => x, // identity - neutral element
  (x) => x + 1
)
```

## When Not To Use

Avoid when:

- you need transformation between different types (use `ProjectionFn<T, U>`)
- the function should never be called (use `never` or omit the parameter)
- you need complex logic beyond simple passthrough
- performance is critical and function call overhead matters

## Design Notes

Identity functions serve as:

1. **Neutral elements**: Don't change values in composition
2. **Default parameters**: Safe fallback for optional transformations  
3. **Type preservation**: Maintain input type as output type
4. **Functional purity**: No side effects, referentially transparent

The type is particularly useful in functional programming patterns and generic utilities.

## Summary

`Identity<T>` provides a clear type for functions that return input values unchanged, serving as neutral elements in functional composition and default transformations in higher-order utilities.





