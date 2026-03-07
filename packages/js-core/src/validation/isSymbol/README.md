# isSymbol

Checks whether the given value is a symbol.

## Usage

```ts
import { isSymbol } from "@petr-ptacek/js-core"

// Symbols
console.log(isSymbol(Symbol("id")));      // true
console.log(isSymbol(Symbol.iterator));   // true

// Not symbols
console.log(isSymbol("id"));              // false
console.log(isSymbol(null));              // false
console.log(isSymbol({}));                // false

// Type guard usage
const value: unknown = Symbol("unique");

if (isSymbol(value)) {
  // value is now typed as symbol
  const desc = value.toString();
}
```

## Why This Utility Exists

While `typeof value === 'symbol'` works, this utility provides TypeScript type guard functionality that properly narrows the type to `symbol`. It's useful in validation pipelines and generic functions where you need reliable type narrowing for symbols.

## Signature

```typescript
function isSymbol(value: unknown): value is symbol
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is a symbol. When `true`, TypeScript narrows the type to `symbol`.

## Design Notes

The implementation uses `typeof value === "symbol"` for runtime checking, which correctly identifies symbol values while excluding all other types.

Symbols are unique and immutable identifiers, commonly used for:
- Private property keys
- Well-known symbols (`Symbol.iterator`, `Symbol.hasInstance`, etc.)
- Unique object keys

## When To Use

Use `isSymbol` when you need to:

- validate that a value is a symbol
- type-narrow unknown values
- filter for symbols in mixed collections
- work with symbol-keyed properties

## When Not To Use

Avoid when:

- you only need to check for well-known symbols (use specific symbol comparisons)
- you're checking `typeof` directly (use `typeof` if no narrowing needed)
- you need to validate symbol properties

## Summary

`isSymbol` provides a type guard for symbol values, enabling safe type narrowing in TypeScript.

See also: `isPrimitive` (check for any primitive type).

