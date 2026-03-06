---
title: parseJSONSafe
category: error
tags:
  - json
  - parse
  - safe
  - fallback
  - error-handling
since: 1.0.0
---


> **Category:** error
> **Since:** 1.0.0
> **Tags:** json, parse, safe, fallback, error-handling


# parseJSONSafe

Safely parses a JSON string with optional fallback handling.

## Usage

```ts
import { parseJSONSafe } from "@petr-ptacek/js-core"

// with fallback
const data = parseJSONSafe('{"name": "Alice"}', { name: "Unknown" })
console.log(data) // { name: "Alice" }

// invalid JSON with fallback
const fallbackData = parseJSONSafe('invalid json', { name: "Unknown" })
console.log(fallbackData) // { name: "Unknown" }

// without fallback
const result = parseJSONSafe<{name: string}>('{"name": "Alice"}')
console.log(result) // { name: "Alice" } or undefined if invalid
```

## Why This Utility Exists

JSON parsing with `JSON.parse()` throws exceptions on invalid input, requiring try-catch blocks for safe handling. `parseJSONSafe` provides a simple, non-throwing alternative that returns fallback values or `undefined` on parsing failures, eliminating the need for explicit error handling while maintaining type safety.

## Signature

```ts
function parseJSONSafe<T>(value: string, fallback: T): T
function parseJSONSafe<T>(value: string): T | undefined
```

## Parameters

- `value` (`string`): JSON string to parse.
- `fallback` (`T`, optional): Fallback value returned when parsing fails. When provided, the return type is guaranteed to be `T`.

## Type Parameters

- `<T>`: The expected type of the parsed JSON value.

## Return Type

- **With fallback**: Returns `T` - either the parsed value or the provided fallback
- **Without fallback**: Returns `T | undefined` - either the parsed value or `undefined` if parsing fails

## Design Notes

The utility is built on top of `withTryCatchSync`, leveraging its structured error handling while providing a simplified API focused specifically on JSON parsing. The implementation:

1. Uses function overloads to provide type-safe behavior based on whether a fallback is provided
2. Always returns `result.data` from the underlying `withTryCatchSync` call
3. Handles `SyntaxError` exceptions thrown by `JSON.parse()` gracefully

The overloaded signatures ensure compile-time type safety - when a fallback is provided, the return type is guaranteed to be `T`, eliminating the need for undefined checks.

## When To Use

Use `parseJSONSafe` when you need:

- JSON parsing without exception handling
- fallback values for invalid JSON
- simple API without result objects or error details
- type-safe parsing with compile-time guarantees

## When Not To Use

Avoid when:

- you need detailed error information about parsing failures
- you want to distinguish between different types of errors
- you need the full result object with `ok`/`error` properties (use `withTryCatchSync` directly)
- you're parsing JSON that should always be valid (use `JSON.parse` with proper validation)

## Summary

`parseJSONSafe` provides a simple, safe alternative to `JSON.parse()` with optional fallback handling, built on structured error handling principles while maintaining a clean, focused API for common JSON parsing scenarios.


## Snippets

### basic.ts

```ts
import { parseJSONSafe } from "@petr-ptacek/js-core";

// basic JSON parsing without fallback
const jsonString = '{"name": "Alice", "age": 30}';

const result = parseJSONSafe<{name: string; age: number}>(jsonString);

if (result) {
  console.log("Name:", result.name);
  console.log("Age:", result.age);
} else {
  console.log("Failed to parse JSON");
}

// invalid JSON without fallback
const invalidJson = '{"name": "Alice", "age":}'; // missing value
const invalidResult = parseJSONSafe(invalidJson);
console.log(invalidResult); // undefined

```

### data-types.ts

```ts
import { parseJSONSafe } from "@petr-ptacek/js-core";

// parsing different data types
const numberJson = "42";
const number = parseJSONSafe<number>(numberJson);
console.log("Number:", number); // 42

const booleanJson = "true";
const boolean = parseJSONSafe<boolean>(booleanJson);
console.log("Boolean:", boolean); // true

const arrayJson = '["apple", "banana", "orange"]';
const fruits = parseJSONSafe<string[]>(arrayJson, []);
console.log("Fruits:", fruits); // ["apple", "banana", "orange"]

// complex nested object
const userJson = `{
  "id": 123,
  "profile": {
    "name": "Alice",
    "preferences": {
      "theme": "dark",
      "notifications": true
    }
  },
  "roles": ["user", "editor"]
}`;

interface User {
  id: number;
  profile: {
    name: string;
    preferences: {
      theme: string;
      notifications: boolean;
    };
  };
  roles: string[];
}

const user = parseJSONSafe<User>(userJson);

if (user) {
  console.log("User ID:", user.id);
  console.log("Name:", user.profile.name);
  console.log("Theme:", user.profile.preferences.theme);
  console.log("Roles:", user.roles.join(", "));
}

```

### with-fallback.ts

```ts
import { parseJSONSafe } from "@petr-ptacek/js-core";

// configuration loading with fallback
const configJson = localStorage.getItem("userConfig");

const config = parseJSONSafe(configJson || "", {
  theme: "light",
  language: "en",
  notifications: true
});

// config is always defined due to fallback
console.log("Theme:", config.theme);
console.log("Language:", config.language);
console.log("Notifications:", config.notifications);

// API response parsing with fallback
type User = {
  id: number;
  name: string;
};

const apiResponse = '{"users": [{"id": 1, "name": "Alice"}]}';

const data = parseJSONSafe(apiResponse, { users: [] as User[] });

// data.users is always an array, even if parsing fails
data.users.forEach(user => {
  console.log(`User: ${user.name} (ID: ${user.id})`);
});

```




