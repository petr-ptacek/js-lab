# MaybeUndefined

Represents a value that may be `undefined`.

## Usage

```ts
import type { MaybeUndefined } from "@petr-ptacek/js-core"

function getConfig(key: string): MaybeUndefined<string> {
  return process.env[key] // undefined if not set
}

const apiUrl: MaybeUndefined<string> = getConfig("API_URL")
// Type: string | undefined
```

## Why This Type Exists

In JavaScript/TypeScript, values are `undefined` when they haven't been initialized or when accessing non-existent object properties. `MaybeUndefined<T>` provides semantic clarity for values that might not exist yet or might be missing, making the optional nature explicit in type signatures.

## Type Declaration

```ts
type MaybeUndefined<T> = T | undefined
```

## Type Parameters

- `<T>`: The base type that may also be `undefined`.

## When To Use

Use `MaybeUndefined<T>` when:

- working with optional object properties
- handling uninitialized variables
- dealing with array methods that might not return a value (`find`, `pop`, etc.)
- representing values that might not be provided
- working with environment variables or configuration

```ts
// Configuration example
interface AppConfig {
  apiUrl: string;
  timeout: number;
  debugMode: MaybeUndefined<boolean>; // optional config
  logLevel: MaybeUndefined<string>; // might not be configured
}

const config: AppConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  debugMode: process.env.DEBUG === "true" ? true : undefined,
  logLevel: process.env.LOG_LEVEL // undefined if not set
};

// Array operations
function findUser(users: Array<{id: string}>, id: string): MaybeUndefined<{id: string}> {
  return users.find(user => user.id === id);
}

const foundUser = findUser(users, "123");
if (foundUser !== undefined) {
  console.log("Found:", foundUser.id);
}
```

## When Not To Use

Avoid when:

- you need to represent intentional absence (use `MaybeNull<T>` or `T | null`)
- you need both `null` and `undefined` (use `MaybeNullable<T>`)
- the value should always be defined (use `T` directly)
- you specifically need `null` for API consistency

## Design Notes

This type follows the semantic distinction where:
- `undefined` represents uninitialized, missing, or non-existent values
- `null` represents intentional absence of a value
- `MaybeUndefined<T>` specifically handles the `undefined` case

The type is equivalent to `T | undefined` and is often used with optional properties and parameters.

## Summary

`MaybeUndefined<T>` provides semantic clarity for values that might be uninitialized or missing, making optional types explicit and improving type safety in scenarios where `undefined` indicates the absence of initialization or assignment.
