---
title: AsyncFn
category: type
tags:
  - type
  - function
  - async
  - promise
  - generic
since: 1.0.0
---


> **Category:** type
> **Since:** 1.0.0
> **Tags:** type, function, async, promise, generic


# AsyncFn

Represents an asynchronous function.

## Usage

```ts
import type { AsyncFn } from "@petr-ptacek/js-lab"

const fetchUser: AsyncFn<[id: string], User> = async (id) => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

const saveData: AsyncFn<[data: object, filename: string], void> = 
  async (data, filename) => {
    await fs.writeFile(filename, JSON.stringify(data))
  }

// Retry utility
async function withRetry<TArgs extends unknown[], TResult>(
  fn: AsyncFn<TArgs, TResult>,
  args: TArgs,
  maxAttempts = 3
): Promise<TResult> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn(...args)
    } catch (error) {
      if (attempt === maxAttempts) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
    }
  }
  throw new Error("Max attempts reached")
}
```

## Why This Type Exists

Asynchronous operations are fundamental in modern JavaScript applications. `AsyncFn` provides a standardized, generic type for async functions with proper argument and return type constraints, enabling type-safe composition, utilities, and higher-order async function patterns.

## Type Declaration

```ts
type AsyncFn<TArgs extends unknown[] = unknown[], TResult = unknown> =
  (...args: TArgs) => Promise<TResult>
```

## Type Parameters

- `<TArgs>`: Tuple type representing the function's parameter types (defaults to `unknown[]`).
- `<TResult>`: The type of value the Promise resolves to (defaults to `unknown`).

## When To Use

Use `AsyncFn` when building generic async utilities, middleware systems, or APIs that work with various async function signatures while maintaining type safety.

## Summary

`AsyncFn` provides a standardized type for asynchronous functions with flexible parameter and return type constraints, enabling type-safe async utilities and composition patterns.





