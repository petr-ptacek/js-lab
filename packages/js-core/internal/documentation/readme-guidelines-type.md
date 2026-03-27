# Type README Guidelines

This document defines the standard structure for **type definition README files** in the project. Types differ from
utilities in that they are TypeScript type definitions rather than runtime functions, requiring a slightly different
documentation approach.

Each complex type should contain its own `README.md` located in the type directory.

Example structure:

    src/type/`<category>`/`<type-name>`/README.md meta.ts index.ts

**Note: Types do NOT include snippets folders** - examples should be integrated directly into the README sections. The
Examples must be short and focused on demonstrating the type usage in practical scenarios.

------------------------------------------------------------------------

## 1. Title

The first line must be the type name.

Example:

# MaybeNull

------------------------------------------------------------------------

## 2. Short Description

A single concise sentence explaining what the type represents.

Example:

Represents a value that may be `null`.

------------------------------------------------------------------------

## 3. Usage

Basic usage example showing how to use the type in practice.

``` ts
import type { MaybeNull } from "@petr-ptacek/js-core"

function getUserName(): MaybeNull<string> {
  const user = getCurrentUser()
  return user ? user.name : null
}

const name: MaybeNull<string> = getUserName()
// Type: string | null
```

------------------------------------------------------------------------

## 4. Why This Type Exists

Explain why the type exists and what problem it solves in TypeScript/JavaScript development.

Example:

In JavaScript/TypeScript, values can often be `null` when they represent the intentional absence of a value.
`MaybeNull<T>` provides a clear, semantic way to express that a value might be either of type `T` or `null`.

------------------------------------------------------------------------

## 5. Type Declaration

Document the actual TypeScript type definition.

``` ts
type MaybeNull<T> = T | null
```

------------------------------------------------------------------------

## 6. Type Parameters (if applicable)

Describe type parameters for generic types.

Example:

- `<T>`: The base type that may also be `null`.
- `<K extends keyof T>`: The key type used for property access.

------------------------------------------------------------------------

## 7. When To Use

Describe when the type should be used, with practical scenarios.

Example:

Use `MaybeNull<T>` when:

- a value can be intentionally absent (represented by `null`)
- working with APIs that return `null` for missing values
- you need to distinguish between "no value" (`null`) and "uninitialized" (`undefined`)

------------------------------------------------------------------------

## 8. When Not To Use

Describe cases where the type is not appropriate.

Example:

Avoid when:

- you need to represent uninitialized state (use `MaybeUndefined<T>`)
- you need both `null` and `undefined` (use `MaybeNullable<T>`)
- the value should never be nullable (use `T` directly)

------------------------------------------------------------------------

## 9. Design Notes

Explain important design decisions and relationships to other types.

Example:

This type follows the semantic distinction where:

- `null` represents intentional absence of a value
- `undefined` represents uninitialized or missing properties

------------------------------------------------------------------------

## 10. Summary

Provide a short concluding summary.

Example:

`MaybeNull<T>` provides semantic clarity for values that can be intentionally absent, making nullable types explicit and
improving type safety.

------------------------------------------------------------------------

# Type-Specific Guidelines

## Examples Integration

Unlike utilities, types should integrate examples directly into README sections rather than using separate snippets
folders. Include:

1. **Usage section**: Basic type usage with imports
2. **Inline examples**: Within "When To Use" section
3. **Real-world scenarios**: Practical applications showing the type in context

## Type Categories

### Simple Types (recommended structure)

- `index.ts` - Type definition with TSDoc
- `README.md` - Full documentation
- `meta.ts` - Metadata

### Complex Type Collections (like maybe/)

- Main folder with `index.ts` exporting all types
- Subfolder for each type with full structure
- Individual README files for each type

------------------------------------------------------------------------

# Standard Section Order

Every type README should follow this order:

1. Title
2. Short Description
3. Usage
4. Why This Type Exists
5. Type Declaration
6. Type Parameters (optional)
7. When To Use
8. When Not To Use
9. Design Notes
10. Summary

------------------------------------------------------------------------

# What Should NOT Be in Type READMEs

- Runtime behavior (types have no runtime)
- Performance considerations (types are compile-time only)
- Implementation details of type checking
- Package installation instructions (belongs in library root)

------------------------------------------------------------------------

# File Structure Rules

## Required Files

- `index.ts` - Type definition with comprehensive TSDoc
- `README.md` - Full documentation following guidelines
- `meta.ts` - Metadata for tooling

## Prohibited Files

- `snippets/` folder - examples go directly in README
- Test files - types are validated through TypeScript compiler
- Implementation files - types are definitions only

## TSDoc Integration

Types should have rich inline documentation in `index.ts`:

```ts
/**
 * Represents a value that may be `null`.
 *
 * @example
 * ```ts
 * const value: MaybeNull<string>;
 * // null | string
 * ```

*
* @since 1.0.0
  */
  export type MaybeNull<T> = T | null;

```

This serves as the primary documentation source for IDE integration while README provides comprehensive usage guidance.
