---
title: SyncFn
category: type
tags:
  - type
  - function
  - sync
  - synchronous
  - generic
since: 1.0.0
---


> **Category:** type
> **Since:** 1.0.0
> **Tags:** type, function, sync, synchronous, generic


# SyncFn

Represents a synchronous function.

## Usage

```ts
import type { SyncFn } from "@petr-ptacek/js-core"

const add: SyncFn<[a: number, b: number], number> = (a, b) => a + b
const isEven: SyncFn<[n: number], boolean> = (n) => n % 2 === 0
const format: SyncFn<[name: string, age: number], string> = 
  (name, age) => `${name} is ${age} years old`

// Generic utility functions
function map<T, U>(array: T[], fn: SyncFn<[T], U>): U[] {
  return array.map(fn)
}

function filter<T>(array: T[], predicate: SyncFn<[T], boolean>): T[] {
  return array.filter(predicate)
}
```

## Why This Type Exists

Synchronous functions are fundamental building blocks for data transformation, validation, and computation. `SyncFn` provides a standardized type for synchronous operations with proper argument and return type constraints, enabling type-safe utilities and functional programming patterns.

## Type Declaration

```ts
type SyncFn<TArgs extends unknown[] = unknown[], TResult = unknown> =
  (...args: TArgs) => TResult
```

## Type Parameters

- `<TArgs>`: Tuple type representing the function's parameter types (defaults to `unknown[]`).
- `<TResult>`: The type of value returned by the function (defaults to `unknown`).

## When To Use

Use `SyncFn` when building generic utilities for synchronous operations like mappers, validators, comparators, and other pure computation functions that require type safety.

## Summary

`SyncFn` provides a standardized type for synchronous functions with flexible parameter and return type constraints, enabling type-safe functional programming utilities and composition patterns.





