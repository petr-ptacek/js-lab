# ValueOrFactory

Represents a value or a factory function that produces a value.

## Usage

```ts
import type { ValueOrFactory } from "@petr-ptacek/js-core"

function processWithFallback<T>(
  primary: ValueOrFactory<T, [string]>, 
  context: string
): T {
  return typeof primary === "function" ? primary(context) : primary
}

// Direct value
const staticMessage = processWithFallback("Hello World", "greeting")

// Factory function
const dynamicMessage = processWithFallback(
  (context) => `Generated message for ${context}`, 
  "user123"
)

// Error handling with fallback
function withFallback<T>(
  valueOrFactory: ValueOrFactory<T, [Error]>,
  error: Error
): T {
  if (typeof valueOrFactory === "function") {
    return valueOrFactory(error)
  }
  return valueOrFactory
}
```

## Why This Type Exists

APIs often need to accept either static values or parameterized factory functions that generate values based on context. `ValueOrFactory<T, Args>` provides this flexibility, enabling both simple static configurations and sophisticated dynamic behavior that can respond to runtime parameters while maintaining type safety.

## Type Declaration

```ts
type ValueOrFactory<TResult, TArgs extends unknown[] = []> =
  TResult | Factory<TResult, TArgs>
```

## Type Parameters

- `<TResult>`: The type of the value or the type returned by the factory function.
- `<TArgs>`: Tuple type representing the factory function's parameter types (defaults to empty array).

## When To Use

Use `ValueOrFactory<TResult, TArgs>` when:

- building flexible APIs that accept static or parameterized dynamic values
- implementing fallback mechanisms that need context information
- creating configuration systems with conditional logic
- designing error recovery with context-aware defaults
- working with dependency injection that may need parameters

```ts
// Configuration with context-aware factories
interface ErrorConfig {
  message: ValueOrFactory<string, [Error, string]>
  shouldRetry: ValueOrFactory<boolean, [Error, number]>
  retryDelay: ValueOrFactory<number, [number]>
}

class ErrorHandler {
  constructor(private config: ErrorConfig) {}
  
  handleError(error: Error, operation: string, attemptCount: number): void {
    const message = this.resolveValue(this.config.message, [error, operation])
    const shouldRetry = this.resolveValue(this.config.shouldRetry, [error, attemptCount])
    const delay = this.resolveValue(this.config.retryDelay, [attemptCount])
    
    console.error(message)
    if (shouldRetry && attemptCount < 3) {
      setTimeout(() => this.retry(operation), delay)
    }
  }
  
  private resolveValue<T, TArgs extends unknown[]>(
    valueOrFactory: ValueOrFactory<T, TArgs>,
    args: TArgs
  ): T {
    return typeof valueOrFactory === "function" 
      ? (valueOrFactory as Factory<T, TArgs>)(...args)
      : valueOrFactory
  }
}

// Usage examples
const basicErrorConfig: ErrorConfig = {
  message: "An error occurred",
  shouldRetry: true,
  retryDelay: 1000
}

const advancedErrorConfig: ErrorConfig = {
  message: (error, operation) => `Failed to ${operation}: ${error.message}`,
  shouldRetry: (error, attemptCount) => 
    !error.message.includes("unauthorized") && attemptCount < 3,
  retryDelay: (attemptCount) => Math.pow(2, attemptCount) * 1000 // exponential backoff
}

// Validation system
type ValidatorConfig<T> = {
  defaultValue: ValueOrFactory<T, [ValidationError]>
  formatError: ValueOrFactory<string, [ValidationError, T]>
}

function createValidator<T>(config: ValidatorConfig<T>) {
  return (value: T, isValid: boolean): T => {
    if (isValid) return value
    
    const error = new ValidationError("Invalid value")
    const defaultValue = typeof config.defaultValue === "function"
      ? config.defaultValue(error)
      : config.defaultValue
      
    const errorMessage = typeof config.formatError === "function"
      ? config.formatError(error, value)
      : config.formatError
      
    console.warn(errorMessage)
    return defaultValue
  }
}
```

## When Not To Use

Avoid when:

- you always need static values (use `T` directly)
- you don't need parameters (use `ValueOrGetter<T>`)
- you always need factory functions (use `Factory<T, Args>`)
- the API complexity outweighs the flexibility benefits

## Design Notes

This type extends `ValueOrGetter` by adding parameter support:

1. **Static optimization**: Direct values avoid function overhead
2. **Parameterized computation**: Factories receive context for decisions
3. **Type safety**: Both value and parameter types are enforced
4. **Flexible fallbacks**: Error handling can use error context

The pattern is particularly useful in error handling, configuration, and dependency injection scenarios.

## Summary

`ValueOrFactory<TResult, TArgs>` enables flexible APIs that accept either static values or parameterized factory functions, providing both performance optimization for static cases and context-aware dynamic behavior for complex scenarios.
