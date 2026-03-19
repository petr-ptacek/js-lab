# ValueOrGetter

Represents a value or a getter function that produces a value.

## Usage

```ts
import type { ValueOrGetter } from "@petr-ptacek/js-core"

function processConfig(config: ValueOrGetter<string>): string {
  // Handle both direct values and getter functions
  const value = typeof config === "function" ? config() : config
  return value.toUpperCase()
}

// Direct value
const staticConfig = processConfig("production")

// Getter function  
const dynamicConfig = processConfig(() => process.env.NODE_ENV || "development")

// Default value utility
function withDefault<T>(valueOrGetter: ValueOrGetter<T>, defaultValue: T): T {
  const value = typeof valueOrGetter === "function" ? valueOrGetter() : valueOrGetter
  return value ?? defaultValue
}
```

## Why This Type Exists

APIs often need to accept either static values or dynamic computed values. `ValueOrGetter<T>` provides flexibility by allowing callers to pass either a direct value or a function that computes the value, enabling both simple static configurations and complex dynamic behavior without requiring separate API methods.

## Type Declaration

```ts
type ValueOrGetter<TResult> = TResult | Getter<TResult>
```

## Type Parameters

- `<TResult>`: The type of the value or the type returned by the getter function.

## When To Use

Use `ValueOrGetter<TResult>` when:

- building flexible APIs that accept static or dynamic values
- implementing default value systems
- creating configuration objects with optional computation
- designing utilities that work with both immediate and lazy values
- providing fallback mechanisms

```ts
// Configuration system with flexible values
interface FlexibleConfig {
  apiUrl: ValueOrGetter<string>
  timeout: ValueOrGetter<number>
  retries: ValueOrGetter<number>
}

class ApiClient {
  constructor(private config: FlexibleConfig) {}
  
  private resolve<T>(valueOrGetter: ValueOrGetter<T>): T {
    return typeof valueOrGetter === "function" ? valueOrGetter() : valueOrGetter
  }
  
  async request(endpoint: string) {
    const url = this.resolve(this.config.apiUrl)
    const timeout = this.resolve(this.config.timeout)
    const retries = this.resolve(this.config.retries)
    
    // Use resolved values...
  }
}

// Usage examples
const staticConfig: FlexibleConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
}

const dynamicConfig: FlexibleConfig = {
  apiUrl: () => process.env.API_URL || "localhost:3000",
  timeout: () => Number(process.env.TIMEOUT) || 5000,
  retries: () => process.env.NODE_ENV === "production" ? 5 : 1
}

// Fallback utility
function createFallbackGetter<T>(
  primary: ValueOrGetter<T>, 
  fallback: ValueOrGetter<T>
): () => T {
  return () => {
    try {
      const value = typeof primary === "function" ? primary() : primary
      return value ?? (typeof fallback === "function" ? fallback() : fallback)
    } catch {
      return typeof fallback === "function" ? fallback() : fallback
    }
  }
}
```

## When Not To Use

Avoid when:

- you always need static values (use `T` directly)
- you always need computed values (use `Getter<T>`)
- you need parameters for computation (use `ValueOrFactory<T, Args>`)
- the distinction between static/dynamic is important for the API semantics

## Design Notes

This type enables flexible API design by:

1. **Static optimization**: Direct values avoid function call overhead
2. **Dynamic capability**: Functions enable runtime computation
3. **Type safety**: Consumers must handle both cases appropriately
4. **API simplicity**: Single parameter instead of overloaded methods

The pattern is commonly used in configuration systems, default value mechanisms, and flexible utility functions.

## Summary

`ValueOrGetter<TResult>` enables flexible APIs that accept either static values or dynamic getter functions, providing both performance optimization for static cases and runtime flexibility for computed values in a type-safe manner.
