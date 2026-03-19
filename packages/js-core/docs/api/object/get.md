---
title: get
category: object
tags:
  - object
  - nested
  - path
  - safe-access
  - typed
  - dot-notation
since: 1.0.0
---


> **Category:** object
> **Since:** 1.0.0
> **Tags:** object, nested, path, safe-access, typed, dot-notation


# get

Safely gets a nested value from an object using a dot-separated path with full TypeScript type safety.

## Usage

```ts
import { get } from "@petr-ptacek/js-core"

const user = {
  profile: {
    name: "John",
    contacts: {
      email: "john@example.com"
    }
  }
};

const name = get(user, "profile.name");
console.log(name); // "John"
```

## Why This Utility Exists

Direct property access can throw runtime errors when intermediate properties are null or undefined. Optional chaining lacks type safety for deep paths and always returns potentially `any` types. This utility provides safe access with compile-time path validation and full type inference.

## Signature

```ts
// Without default value
function get<T extends object, P extends Path<T>>(
  obj: T,
  path: P,
): PathValue<T, P> | undefined

// With default value
function get<T extends object, P extends Path<T>, D>(
  obj: T,
  path: P,
  defaultValue: D,
): Exclude<PathValue<T, P>, undefined> | D
```

## Parameters

- `obj` (`T extends object`): The object to access.
- `path` (`P extends Path<T>`): The dot-separated path string.
- `defaultValue` (`D`, optional): Value to return if the path resolves to `undefined`.

## Type Parameters

- `<T extends object>`: The type of the input object.
- `<P extends Path<T>>`: The valid path type derived from the object structure.
- `<D>`: The type of the default value (when provided).

## Return Type

Returns the value at the specified path, or `undefined` if the path doesn't exist. When a default value is provided, returns the default value instead of `undefined` for missing paths. The return type is automatically inferred based on the path and object structure.

## Design Notes

The utility uses TypeScript's template literal types to validate paths at compile time. Only valid paths that exist in the object structure are accepted. The path traversal uses dot notation exclusively and supports array access via numeric indices.

The implementation uses `reduce()` for path traversal with graceful handling of missing properties.

## When To Use

Use `get` when you need:

- safe deep property access without runtime errors
- type-safe path strings validated at compile time
- fallback values for missing properties
- array element access via dot notation

## When Not To Use

Avoid when:

- shallow access where optional chaining (`obj?.prop`) is sufficient
- dynamic paths that cannot be known at compile time
- performance critical code where direct access is faster
- complex path syntax beyond simple dot notation

## Summary

`get` provides safe and type-safe access to nested object properties with compile-time path validation and graceful error handling.


## Snippets

### api-response.ts

```ts
import { get } from "@petr-ptacek/js-core";

const apiResponse = {
  data: {
    users: [
      {
        id: 1,
        profile: {
          email: "alice@example.com",
          preferences: { theme: "dark" }
        }
      }
    ]
  }
};

// Safely access nested API data
const userEmail = get(apiResponse, "data.users.0.profile.email");
console.log(userEmail); // "alice@example.com"

const userTheme = get(apiResponse, "data.users.0.profile.preferences.theme", "light");
console.log(userTheme); // "dark"

// Handle missing data gracefully
const missingUser = get(apiResponse, "data.users.1.profile.email", "No email");
console.log(missingUser); // "No email"

```

### basic.ts

```ts
import { get } from "@petr-ptacek/js-core";

const user = {
  profile: {
    name: "John",
    age: 30,
    contacts: {
      email: "john@example.com",
      phones: ["+1234567890", "+0987654321"]
    }
  }
};

// Get nested object property
const name = get(user, "profile.name");
console.log(name); // "John"

// Get array element
const firstPhone = get(user, "profile.contacts.phones.0");
console.log(firstPhone); // "+1234567890"

// Get with default value (existing property)
const age = get(user, "profile.age", 25);
console.log(age); // 30

```

### config.ts

```ts
import { get } from "@petr-ptacek/js-core";

const config = {
  server: {
    port: 3000,
    host: "localhost",
    ssl: true,
    database: {
      host: "db.example.com",
      credentials: {
        username: "admin",
        password: "secret123"
      }
    }
  }
};

// Access configuration values with sensible defaults
const port = get(config, "server.port", 8080);
const host = get(config, "server.host", "0.0.0.0");
const sslEnabled = get(config, "server.ssl", false);

// Access deeply nested configuration
const dbHost = get(config, "server.database.host", "localhost");
const dbUser = get(config, "server.database.credentials.username", "user");

console.log({
  port,
  host,
  sslEnabled,
  dbHost,
  dbUser
});

```




