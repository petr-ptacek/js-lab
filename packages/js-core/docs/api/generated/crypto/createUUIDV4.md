---
title: createUUIDV4
category: crypto
tags:
  - uuid
  - v4
  - random
  - string
  - crypto
since: 1.0.0
---


> **Category:** crypto
> **Since:** 1.0.0
> **Tags:** uuid, v4, random, string, crypto


# createUUIDV4

Generate a **UUID version 4** string.

The function returns a randomly generated identifier compliant with **RFC 4122 v4**.

It uses the best available randomness source in the current environment:

1. `crypto.randomUUID()` when available
2. `crypto.getRandomValues()` fallback
3. `Math.random()` as a **last-resort non-cryptographic fallback**

## Usage

```ts
import { createUUIDV4 } from "@petr-ptacek/js-core"

const id = createUUIDV4()

console.log(id)
// example: "3c7b9b8a-92fa-4b91-9d8b-bbbd6e0c88d1"
```

## Return Type

```ts
function createUUIDV4(): string
```

The function always returns a string in standard UUID format:

```
xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
```

Example:

```
550e8400-e29b-41d4-a716-446655440000
```

## Why This Utility Exists

While modern environments support:

```ts
crypto.randomUUID()
```

there are still cases where:

- older browsers do not implement it
- some runtimes only expose `crypto.getRandomValues`
- certain environments (tests, legacy runtimes) lack `crypto`

`createUUIDV4` provides a **consistent API** that works across environments.

## Environment Strategy

The function progressively selects the strongest available source:

| Strategy                   | Security                         | Requirement            |
|----------------------------|----------------------------------|------------------------|
| `crypto.randomUUID()`      | cryptographically secure         | modern browsers / Node |
| `crypto.getRandomValues()` | cryptographically secure         | Web Crypto API         |
| `Math.random()`            | **not cryptographically secure** | universal fallback     |

The fallback exists purely to ensure the function **never throws due to missing APIs**.

## Design Notes

### RFC 4122 Compliance

When `getRandomValues` is used, the implementation explicitly sets:

- **version bits** (`0100`)
- **variant bits**

```ts
bytes[6] = (bytes[6] & 0x0f) | 0x40
bytes[8] = (bytes[8] & 0x3f) | 0x80
```

This ensures the resulting UUID conforms to **RFC 4122 v4**.

### No Dependencies

The utility intentionally avoids external packages such as:

- `uuid`
- `nanoid`

This keeps the library:

- lightweight
- dependency-free
- suitable for browser and server environments.

## When To Use

Use `createUUIDV4` when you need:

- a **unique identifier**
- **cross-environment compatibility**
- **zero dependencies**

## When Not To Use

Avoid using it when:

- you require **cryptographic identifiers in environments without Web Crypto**
- identifiers must be **deterministic**
- identifiers must follow a **different format** (ULID, NanoID, etc.)

## Summary

`createUUIDV4` provides a simple and reliable way to generate UUID v4 identifiers across environments while maintaining:

- RFC 4122 compatibility
- zero dependencies
- graceful fallbacks


## Snippets

### basic.ts

```ts
import { createUUIDV4 } from "@petr-ptacek/js-core";

// generate a UUID v4 identifier
const id = createUUIDV4();

console.log(id);
// example output:
// "7f3c9c7e-0c52-4c6c-8a6a-8c6e8f1b5f0a"

```

### object-id.ts

```ts
import { createUUIDV4 } from "@petr-ptacek/js-core";

const user = {
  id: createUUIDV4(),
  name: "Alice",
};

console.log(user);

```




