---
title: MaybeNull
category: type
tags:
  - type
  - null
  - union
  - nullable
  - optional
since: 1.0.0
---


> **Category:** type
> **Since:** 1.0.0
> **Tags:** type, null, union, nullable, optional


# MaybeNull

Represents a value that may be `null`.

## Usage

```ts
import type { MaybeNull } from "@petr-ptacek/js-core"

function getUserName(): MaybeNull<string> {
  const user = getCurrentUser()
  return user ? user.name : null
}

const name: MaybeNull<string> = getUserName()
// Type: string | null
```

## Why This Type Exists

In JavaScript/TypeScript, values can often be `null` when they represent the intentional absence of a value. `MaybeNull<T>` provides a clear, semantic way to express that a value might be either of type `T` or `null`, making the nullable nature explicit in type signatures and improving code readability.

## Type Declaration

```ts
type MaybeNull<T> = T | null
```

## Type Parameters

- `<T>`: The base type that may also be `null`.

## When To Use

Use `MaybeNull<T>` when:

- a value can be intentionally absent (represented by `null`)
- working with APIs that return `null` for missing values
- you need to distinguish between "no value" (`null`) and "uninitialized" (`undefined`)
- following patterns where `null` represents explicit absence

```ts
// API responses with nullable fields
interface UserProfile {
  id: string;
  name: string;
  avatar: MaybeNull<string>; // null when user has no avatar
  bio: MaybeNull<string>; // null when user has no bio
}

// Database-style operations
class UserRepository {
  findById(id: string): MaybeNull<User> {
    const user = this.users.get(id);
    return user ?? null; // explicit null for "not found"
  }
}

// Safe null checking
const user = repo.findById("123");
if (user !== null) {
  console.log("Found user:", user.name);
} else {
  console.log("User not found");
}

// Using nullish coalescing
const avatarUrl = user.avatar ?? "https://example.com/default-avatar.jpg";
```

## When Not To Use

Avoid when:

- you need to represent uninitialized state (use `MaybeUndefined<T>` or `T | undefined`)
- you need both `null` and `undefined` (use `MaybeNullable<T>`)
- the value should never be nullable (use `T` directly)
- working in a codebase that prefers `undefined` over `null`

## Design Notes

This type follows the semantic distinction where:
- `null` represents intentional absence of a value
- `undefined` represents uninitialized or missing properties
- `MaybeNull<T>` specifically handles the `null` case

The type is a simple union that preserves all properties of the base type `T` while adding the possibility of `null`.

## Summary

`MaybeNull<T>` provides semantic clarity for values that can be intentionally absent, represented by `null`, making nullable types explicit and improving type safety in scenarios where `null` is used to indicate missing or unavailable data.





