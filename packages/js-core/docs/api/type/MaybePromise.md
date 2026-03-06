---
title: MaybePromise
category: type
tags:
  - type
  - promise
  - async
  - sync
  - union
  - flexible
since: 1.0.0
---


> **Category:** type
> **Since:** 1.0.0
> **Tags:** type, promise, async, sync, union, flexible


# MaybePromise

Represents a value that may be returned synchronously or as a Promise.

## Usage

```ts
import type { MaybePromise } from "@petr-ptacek/js-core"

function getData(useCache: boolean): MaybePromise<string> {
  if (useCache) {
    return "cached data" // synchronous
  }
  return fetch("/api/data").then(r => r.text()) // asynchronous
}

// Handle both sync and async cases
async function processData(useCache: boolean) {
  const data = await getData(useCache) // works for both cases
  console.log(data)
}
```

## Why This Type Exists

Many functions can return values either synchronously (when cached or computed immediately) or asynchronously (when requiring I/O operations). `MaybePromise<T>` provides a unified type that allows functions to be flexible in their execution model while maintaining type safety for consumers who need to handle both cases.

## Type Declaration

```ts
type MaybePromise<T> = T | Promise<T>
```

## Type Parameters

- `<T>`: The base type that may be wrapped in a Promise or returned directly.

## When To Use

Use `MaybePromise<T>` when:

- implementing functions that can operate synchronously or asynchronously
- working with caching systems that return immediate values or async operations
- creating flexible APIs that adapt based on data availability
- building plugins or middleware that might be sync or async
- handling conditional async behavior based on runtime conditions

```ts
// Caching system example
class DataCache {
  private cache = new Map<string, any>();

  getData<T>(key: string, fetcher: () => Promise<T>): MaybePromise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key); // synchronous
    }
    return fetcher().then(data => { // asynchronous
      this.cache.set(key, data);
      return data;
    });
  }
}

// Plugin system example
interface Plugin {
  process: (data: any) => MaybePromise<any>;
}

const syncPlugin: Plugin = {
  process: (data) => ({ ...data, validated: true }) // sync
};

const asyncPlugin: Plugin = {
  process: async (data) => { // async
    await new Promise(resolve => setTimeout(resolve, 100));
    return { ...data, enriched: true };
  }
};

// Usage - await works for both
const result = await plugin.process(inputData);
```

## When Not To Use

Avoid when:

- you always need synchronous behavior (use `T` directly)
- you always need asynchronous behavior (use `Promise<T>`)
- the sync/async distinction is important for callers to know at compile time
- you need different return types for sync vs async cases

## Design Notes

This type enables flexible function implementations that can:
- Return cached values synchronously for better performance
- Fall back to async operations when needed
- Maintain a consistent interface regardless of execution path

The type works seamlessly with `await`, which handles both sync values and Promises uniformly.

## Summary

`MaybePromise<T>` enables flexible APIs that can return values either synchronously or asynchronously based on runtime conditions, providing performance benefits when possible while maintaining type safety and consistent interfaces for consumers.





