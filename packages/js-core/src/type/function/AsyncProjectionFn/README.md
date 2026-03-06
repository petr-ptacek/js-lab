# AsyncProjectionFn

Represents an asynchronous projection function.

## Usage

```ts
import type { AsyncProjectionFn } from "@petr-ptacek/js-core"

interface User {
  id: string
  name: string
}

interface Profile {
  bio: string
  avatar: string
  followers: number
}

// Async data loading
const loadProfile: AsyncProjectionFn<User, Profile> = async (user) => {
  const response = await fetch(`/api/profiles/${user.id}`)
  return response.json()
}

const enrichUserData: AsyncProjectionFn<User, User & { isActive: boolean }> = 
  async (user) => {
    const status = await checkUserStatus(user.id)
    return { ...user, isActive: status.active }
  }

// Usage with Promise.all for parallel processing
async function processUsers(users: User[]): Promise<Profile[]> {
  return Promise.all(users.map(loadProfile))
}

async function checkUserStatus(id: string) {
  return { active: Math.random() > 0.5 }
}
```

## Why This Type Exists

Data projection often requires asynchronous operations like API calls, database queries, or file system operations. `AsyncProjectionFn` provides a standardized type for single-argument transformation functions that return Promises, enabling consistent APIs for async mapping, enrichment, and data loading operations.

## Type Declaration

```ts
type AsyncProjectionFn<TInput, TOutput> = (value: TInput) => Promise<TOutput>
```

## Type Parameters

- `<TInput>`: The type of the input value to be projected.
- `<TOutput>`: The type of the output value produced by the async projection.

## When To Use

Use `AsyncProjectionFn` when building utilities for async data transformation, API-based enrichment, database lookups, or any single-argument async mapping function that converts input to derived output asynchronously.

## Summary

`AsyncProjectionFn` provides a standardized type for single-argument asynchronous transformation functions, enabling type-safe async data projection and enrichment operations commonly used in data loading and processing scenarios.
