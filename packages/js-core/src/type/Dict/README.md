# Dict

Represents a dictionary object with arbitrary keys and values.

## Usage

```ts
import type { Dict } from "@petr-ptacek/js-core"

// String values with string keys (default)
const userPreferences: Dict<string> = {
  theme: "dark",
  language: "en",
  timezone: "UTC"
}

// Number values with specific keys
const scores: Dict<number, "alice" | "bob" | "charlie"> = {
  alice: 95,
  bob: 87,
  charlie: 92
}

// Mixed values
const config: Dict<string | number | boolean> = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  enableLogging: true
}
```

## Why This Type Exists

While TypeScript's `Record<K, V>` is powerful, `Dict<TValue, TKey>` provides a more semantic and readable alternative specifically for dictionary-like objects. The parameter order (value first, key second with default) makes it more intuitive for common use cases where you primarily care about the value type.

## Type Declaration

```ts
type Dict<TValue = unknown, TKey extends string | number | symbol = string> = Record<TKey, TValue>
```

## Type Parameters

- `<TValue>`: The type of values stored in the dictionary (defaults to `unknown`).
- `<TKey>`: The type of keys in the dictionary (defaults to `string`, must extend `string | number | symbol`).

## When To Use

Use `Dict<TValue, TKey>` when:

- creating objects that serve as key-value mappings
- working with configuration objects or settings
- building lookup tables or caches
- handling dynamic object properties where all values share the same type
- you want more semantic naming than `Record<K, V>`

```ts
// Configuration management
interface AppSettings {
  database: Dict<string>; // connection strings, etc.
  features: Dict<boolean>; // feature flags
  limits: Dict<number>; // rate limits, timeouts, etc.
}

// Cache implementation  
class SimpleCache<T> {
  private data: Dict<T> = {};
  
  set(key: string, value: T): void {
    this.data[key] = value;
  }
  
  get(key: string): T | undefined {
    return this.data[key];
  }
}

// API response mapping
type ApiEndpoints = Dict<string, "users" | "posts" | "comments">;
const endpoints: ApiEndpoints = {
  users: "/api/users",
  posts: "/api/posts", 
  comments: "/api/comments"
};

// Translation/localization
type Translations = Dict<string>;
const messages: Translations = {
  "welcome": "Welcome!",
  "goodbye": "Goodbye!",
  "error.notFound": "Not found"
};
```

## When Not To Use

Avoid when:

- you need specific, known properties (use interfaces or type literals)
- you need different value types for different keys (use mapped types or unions)
- working with arrays or tuples (use `Array<T>` or tuple types)
- you need the full power of mapped types with transformations

## Design Notes

This type is essentially a semantic alias for `Record<TKey, TValue>` with:

1. **Parameter order**: Value type comes first as it's typically more important
2. **Default key type**: `string` is the most common key type
3. **Default value type**: `unknown` encourages explicit typing
4. **Semantic naming**: "Dict" clearly indicates dictionary/map usage

The type maintains full compatibility with `Record` while providing more intuitive parameter ordering for dictionary use cases.

## Summary

`Dict<TValue, TKey>` provides a semantic, readable alternative to `Record` for dictionary-like objects, with intuitive parameter ordering and sensible defaults for common key-value mapping scenarios.
