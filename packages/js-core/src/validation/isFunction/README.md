# isFunction

Checks whether the given value is a function.

## Usage

```ts
import { isFunction } from "@petr-ptacek/js-core"

// Functions
console.log(isFunction(() => {}));           // true
console.log(isFunction(function() {}));      // true
console.log(isFunction(Math.min));           // true
console.log(isFunction(class {}));           // true

// Not functions
console.log(isFunction("callback"));         // false
console.log(isFunction({} ));                // false
console.log(isFunction(null));               // false

// Type guard usage
const value: unknown = () => "hello";

if (isFunction(value)) {
  // value is now typed as Function
  const result = value();
}
```

## Why This Utility Exists

While `typeof value === 'function'` works, this utility provides TypeScript type guard functionality that properly narrows the type to `Function`. It's useful for callbacks, higher-order functions, and validation pipelines where you need reliable type narrowing for callable values.

## Signature

```typescript
function isFunction(value: unknown): value is Function
```

## Parameters

- `value` (`unknown`): The value to test.

## Return Type

Returns a boolean indicating whether the value is a function. When `true`, TypeScript narrows the type to `Function`.

## Design Notes

The implementation uses `typeof value === "function"` for runtime checking, which correctly identifies:

- Regular functions: `function() {}`
- Arrow functions: `() => {}`
- Class constructors: `class {}`
- Built-in functions: `Math.min`, `Array.isArray`, etc.

It excludes all non-callable values while properly handling edge cases across JavaScript environments.

## When To Use

Use `isFunction` when you need to:

- validate that a value is callable
- accept optional callbacks
- implement higher-order functions
- filter for functions in mixed collections
- type-narrow function parameters

## When Not To Use

Avoid when:

- you need more specific type information (check the function signature separately)
- you're checking for async functions specifically (check the function's behavior instead)
- you only need `typeof` for string comparison (use `typeof` directly if no narrowing needed)

## Summary

`isFunction` provides a type guard for function values, enabling safe type narrowing in TypeScript for any callable value.

See also: `isPrimitive` (check for primitive types).

