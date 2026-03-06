# Getter

Represents a getter function.

## Usage

```ts
import type { Getter } from "@petr-ptacek/js-core"

const getCurrentTime: Getter<number> = () => Date.now()
const getRandomId: Getter<string> = () => Math.random().toString(36)

// Configuration getter
const getApiUrl: Getter<string> = () => process.env.API_URL || "localhost:3000"

// Lazy initialization
let cachedValue: string | undefined
const getExpensiveValue: Getter<string> = () => {
  if (!cachedValue) {
    cachedValue = performExpensiveComputation()
  }
  return cachedValue
}

function performExpensiveComputation(): string {
  return "computed result"
}
```

## Why This Type Exists

Many operations need parameterless functions that produce values on demand. `Getter<T>` provides a clear, semantic type for zero-argument functions that return values, commonly used for lazy evaluation, configuration access, and dynamic value generation without external dependencies.

## Type Declaration

```ts
type Getter<TResult> = () => TResult
```

## Type Parameters

- `<TResult>`: The type of value returned by the getter function.

## When To Use

Use `Getter<TResult>` when:

- implementing lazy evaluation or delayed computation
- accessing configuration values that might change
- creating factory patterns without parameters
- building APIs that need parameterless value providers
- working with dynamic or computed properties

```ts
// Lazy evaluation example
class LazyLoader<T> {
  constructor(private getter: Getter<T>) {}
  
  getValue(): T {
    return this.getter()
  }
}

const lazyConfig = new LazyLoader(() => loadConfigFromFile())

// Configuration system
interface AppConfig {
  getDbUrl: Getter<string>
  getLogLevel: Getter<string>
  getFeatureFlags: Getter<Record<string, boolean>>
}

const config: AppConfig = {
  getDbUrl: () => process.env.DATABASE_URL!,
  getLogLevel: () => process.env.LOG_LEVEL || "info",
  getFeatureFlags: () => JSON.parse(process.env.FEATURES || "{}")
}

// Dynamic value generation
const generators = {
  timestamp: () => new Date().toISOString(),
  uuid: () => crypto.randomUUID(),
  sessionId: () => `session_${Date.now()}`
}
```

## When Not To Use

Avoid when:

- you need functions with parameters (use `Factory<T, Args>` instead)
- the value is static and doesn't need computation (use the value directly)
- you need async computation (use `() => Promise<T>` or async getter)
- complex initialization logic is required (use dedicated initialization functions)

## Design Notes

This type represents the simplest form of a function type - parameterless and synchronous. It's commonly used in:

1. **Lazy evaluation**: Computing values only when needed
2. **Configuration access**: Reading environment or dynamic config
3. **Factory patterns**: Creating instances without parameters  
4. **Plugin systems**: Providing extension points for value generation

The type encourages functional patterns and makes parameterless value providers explicit in APIs.

## Summary

`Getter<TResult>` provides a clear, semantic type for parameterless functions that return values, enabling lazy evaluation, configuration access, and dynamic value generation in functional programming patterns.
