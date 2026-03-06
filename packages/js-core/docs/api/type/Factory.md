---
title: Factory
category: type
tags:
  - type
  - function
  - factory
  - creation
  - parameters
since: 1.0.0
---


> **Category:** type
> **Since:** 1.0.0
> **Tags:** type, function, factory, creation, parameters


# Factory

Represents a factory function.

## Usage

```ts
import type { Factory } from "@petr-ptacek/js-core"

interface User {
  name: string
  age: number
  id: string
}

// Factory with multiple parameters
const createUser: Factory<User, [name: string, age: number]> = (name, age) => ({
  name,
  age, 
  id: crypto.randomUUID()
})

// Parameterless factory
const createTimestamp: Factory<string> = () => new Date().toISOString()

// Factory with optional parameters
const createConfig: Factory<object, [env?: string]> = (env = "development") => ({
  environment: env,
  debug: env !== "production",
  apiUrl: env === "production" ? "https://api.com" : "http://localhost:3000"
})

const user = createUser("Alice", 30)
const timestamp = createTimestamp()
const config = createConfig("staging")
```

## Why This Type Exists

Factory functions are fundamental in object-oriented and functional programming for creating instances with specific parameters. `Factory<TResult, TArgs>` provides type-safe factory function signatures with proper argument typing and return type guarantees, enabling dependency injection, object creation patterns, and parameterized value generation.

## Type Declaration

```ts
type Factory<TResult, TArgs extends unknown[] = []> = (...args: TArgs) => TResult
```

## Type Parameters

- `<TResult>`: The type of value produced by the factory function.
- `<TArgs>`: Tuple type representing the factory function's parameter types (defaults to empty array).

## When To Use

Use `Factory<TResult, TArgs>` when:

- implementing object creation patterns
- building dependency injection systems
- creating parameterized value generators
- designing plugin or extension systems
- working with constructor-like functions

```ts
// Dependency injection example
interface Logger {
  log(message: string): void
}

type LoggerFactory = Factory<Logger, [level: string]>

const createConsoleLogger: LoggerFactory = (level) => ({
  log: (message) => console.log(`[${level.toUpperCase()}] ${message}`)
})

const createFileLogger: LoggerFactory = (level) => ({
  log: (message) => fs.appendFileSync(`${level}.log`, message + '\n')
})

// Factory registry
class FactoryRegistry<T, TArgs extends unknown[]> {
  private factories = new Map<string, Factory<T, TArgs>>()
  
  register(name: string, factory: Factory<T, TArgs>): void {
    this.factories.set(name, factory)
  }
  
  create(name: string, ...args: TArgs): T {
    const factory = this.factories.get(name)
    if (!factory) throw new Error(`Factory '${name}' not found`)
    return factory(...args)
  }
}

// Usage
const loggerRegistry = new FactoryRegistry<Logger, [string]>()
loggerRegistry.register("console", createConsoleLogger)
loggerRegistry.register("file", createFileLogger)

const logger = loggerRegistry.create("console", "debug")

// Configuration factory
type ConfigFactory<T> = Factory<T, [environment: string, overrides?: Partial<T>]>

const createDatabaseConfig: ConfigFactory<{ host: string; port: number }> = 
  (env, overrides = {}) => ({
    host: env === "production" ? "prod.db.com" : "localhost",
    port: env === "production" ? 5432 : 5433,
    ...overrides
  })
```

## When Not To Use

Avoid when:

- you don't need parameters (use `Getter<T>` instead)
- you need async creation (use async factory or `AsyncFn<TArgs, TResult>`)
- simple direct construction is sufficient (use constructors or object literals)
- the factory pattern adds unnecessary complexity

## Design Notes

Factory functions provide several benefits:

1. **Parameterization**: Accept arguments to customize created instances
2. **Encapsulation**: Hide complex construction logic
3. **Flexibility**: Enable different creation strategies
4. **Testing**: Easy to mock and substitute for testing
5. **Type safety**: Ensure correct argument types and return types

The type supports both simple and complex factory patterns while maintaining strong typing.

## Summary

`Factory<TResult, TArgs>` provides type-safe factory function signatures for parameterized object creation, enabling dependency injection, plugin systems, and flexible instance generation with proper argument and return type validation.





