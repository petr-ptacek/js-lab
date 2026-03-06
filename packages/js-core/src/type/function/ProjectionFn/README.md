# ProjectionFn

Represents a projection function.

## Usage

```ts
import type { ProjectionFn } from "@petr-ptacek/js-core"

interface User {
  id: string
  name: string
  email: string
  age: number
}

// Extract properties
const getId: ProjectionFn<User, string> = (user) => user.id
const getName: ProjectionFn<User, string> = (user) => user.name
const getAge: ProjectionFn<User, number> = (user) => user.age

// Transform data
const getDisplayName: ProjectionFn<User, string> = 
  (user) => `${user.name} (${user.email})`

const getAgeGroup: ProjectionFn<User, string> = (user) => {
  if (user.age < 18) return "minor"
  if (user.age < 65) return "adult"
  return "senior"
}

// Usage with array methods
const users: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com", age: 30 },
  { id: "2", name: "Bob", email: "bob@example.com", age: 25 }
]

const names = users.map(getName) // ["Alice", "Bob"]
const ageGroups = users.map(getAgeGroup) // ["adult", "adult"]
```

## Why This Type Exists

Data transformation often requires extracting or computing derived values from complex objects. `ProjectionFn` provides a standardized type for single-argument transformation functions, enabling consistent APIs for mapping, grouping, sorting, and other operations that need to project data from one form to another.

## Type Declaration

```ts
type ProjectionFn<TInput, TOutput> = (value: TInput) => TOutput
```

## Type Parameters

- `<TInput>`: The type of the input value to be projected.
- `<TOutput>`: The type of the output value produced by the projection.

## When To Use

Use `ProjectionFn` when building utilities for data transformation, property extraction, grouping operations, or any single-argument mapping function that converts input to derived output.

## Summary

`ProjectionFn` provides a standardized type for single-argument transformation functions, enabling type-safe data projection and extraction operations commonly used in functional programming and data processing scenarios.
