# createUUIDV4

Generate a UUID version 4 string.

## Usage

```ts
import { createUUIDV4 } from "@petr-ptacek/js-core"

const id = createUUIDV4()

console.log(id)
// example: "3c7b9b8a-92fa-4b91-9d8b-bbbd6e0c88d1"
```

## Why This Utility Exists

While modern environments support `crypto.randomUUID()`, there are still cases where older browsers do not implement it, some runtimes only expose `crypto.getRandomValues`, or certain environments (tests, legacy runtimes) lack `crypto`. `createUUIDV4` provides a consistent API that works across environments.

## Signature

```ts
function createUUIDV4(): string
```

## Return Type

Returns a string in standard UUID v4 format (`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`) that is compliant with RFC 4122 v4.

## Environment Strategy

The function progressively selects the strongest available source:

| Strategy                   | Security                         | Requirement            |
|----------------------------|----------------------------------|------------------------|
| `crypto.randomUUID()`      | cryptographically secure         | modern browsers / Node |
| `crypto.getRandomValues()` | cryptographically secure         | Web Crypto API         |
| `Math.random()`            | **not cryptographically secure** | universal fallback     |

The fallback exists purely to ensure the function never throws due to missing APIs.

## Design Notes

When `getRandomValues` is used, the implementation explicitly sets version bits (`0100`) and variant bits to ensure RFC 4122 v4 compliance:

```ts
bytes[6] = (bytes[6] & 0x0f) | 0x40
bytes[8] = (bytes[8] & 0x3f) | 0x80
```

The utility intentionally avoids external packages like `uuid` or `nanoid` to keep the library lightweight, dependency-free, and suitable for browser and server environments.

## When To Use

Use `createUUIDV4` when you need:

- a unique identifier
- cross-environment compatibility
- zero dependencies

## When Not To Use

Avoid when:

- you require cryptographic identifiers in environments without Web Crypto
- identifiers must be deterministic
- identifiers must follow a different format (ULID, NanoID, etc.)

## Summary

`createUUIDV4` provides a simple and reliable way to generate UUID v4 identifiers across environments while maintaining RFC 4122 compatibility, zero dependencies, and graceful fallbacks.
