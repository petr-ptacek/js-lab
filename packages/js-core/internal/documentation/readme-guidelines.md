# Utility README Guidelines

This document defines the standard structure for **utility README
files** in the project. Its purpose is to ensure that all utilities are
documented consistently.

Each utility must contain its own `README.md` located in the utility
directory.

Example structure:

src/`<category>`{=html}/`<utility>`{=html}/ README.md meta.ts index.ts

The README structure must follow the sections defined below.

------------------------------------------------------------------------

## 1. Title

The first line must be the utility name.

Example:

# createUUIDV4

------------------------------------------------------------------------

## 2. Short Description

A single concise sentence explaining what the utility does.

Example:

Generate a UUID version 4 string.

------------------------------------------------------------------------

## 3. Usage

Basic usage example.

``` ts
import { createUUIDV4 } from "@petr-ptacek/js-core"

const id = createUUIDV4()
```

------------------------------------------------------------------------

## 4. Why This Utility Exists

Explain why the utility exists and what problem it solves.

Example:

JavaScript environments provide different ways to generate UUIDs. This
utility provides a consistent cross-environment solution.

------------------------------------------------------------------------

## 5. Signature

Document the function signature and return type.

``` ts
function createUUIDV4(): string
```

------------------------------------------------------------------------

## 6. Parameters (if applicable)

Describe input parameters. If there are no parameters, you may omit this
section.

Guidelines: - Use a bullet list with **parameter name**, type, and a
short description. - If a parameter is optional, explicitly say so. -
Include default values when relevant.

Example:

-   `options` (`CreateUUIDOptions`, optional): Configuration options.
    -   `secure` (`boolean`, default `true`): Prefer cryptographically
        secure sources when available.

------------------------------------------------------------------------

## 7. Type Parameters (if applicable)

If the utility is generic, document type parameters (`<T>`,
`<K extends ...>`).

Example:

-   `<T>`: The item type.
-   `<K extends keyof T>`: The key type used for selection.

------------------------------------------------------------------------

## 8. Return Type

Describe what the function returns and any important details about the return value.

Example:

Returns a string containing a UUID v4 identifier in standard format (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx).

------------------------------------------------------------------------

## 9. Type Declarations (if applicable)

Document important TypeScript type definitions that are exported alongside the utility. This section should include complex types that users need to understand to effectively use the utility.

Example:

```ts
type WithAbortableOptions = {
  autoAbort?: boolean;
  timeoutMs?: number;
}

type WithAbortableReturn<Args extends unknown[], R> = {
  execute: (...args: Args) => Promise<R>;
  abort: () => void;
  readonly signal: AbortSignal | null;
  readonly isRunning: boolean;
}
```

------------------------------------------------------------------------

## 10. Throws / Errors (if applicable)

If the function can throw (synchronously) or reject (async), document it
clearly.

Example:

-   Throws `TypeError` when input is not a valid URL.
-   Rejects when `fetch` fails or the request is aborted.

------------------------------------------------------------------------

## 11. Environment Strategy (if relevant)

Describe environment-specific behavior or fallbacks.

Example:

1.  `crypto.randomUUID`
2.  `crypto.getRandomValues`
3.  `Math.random` fallback (non-cryptographic)

------------------------------------------------------------------------

## 12. Design Notes

Explain important design decisions.

Example:

The implementation prefers Web Crypto APIs when available.

------------------------------------------------------------------------

## 13. When To Use

Describe when the utility should be used.

Example:

Use this utility when you need:

-   a unique identifier
-   cross-environment compatibility
-   zero dependencies

------------------------------------------------------------------------

## 14. When Not To Use

Describe cases where the utility is not appropriate.

Example:

Avoid when:

-   deterministic identifiers are required
-   ULID or NanoID format is needed

------------------------------------------------------------------------

## 15. Summary

Provide a short concluding summary.

Example:

createUUIDV4 provides a simple cross-environment UUID generator.

------------------------------------------------------------------------

# Optional Sections

These sections may be included if relevant.

## Examples

Additional usage examples (beyond the basic `Usage` section).

## Performance

Performance notes or benchmarks.

## Security

Security considerations if applicable.

## Alternatives

Compare briefly with native APIs or common libs (e.g. native
`crypto.randomUUID`, `uuid`, lodash).

------------------------------------------------------------------------

# README Rules

1.  Maximum recommended length: \~200--300 lines
2.  Avoid marketing-style language
3.  Focus on practical developer information
4.  Keep section structure consistent

------------------------------------------------------------------------

# Standard Section Order

Every README should follow this order (omit sections that are not
applicable):

1.  Title
2.  Short Description
3.  Usage
4.  Why This Utility Exists
5.  Signature
6.  Parameters (optional)
7.  Type Parameters (optional)
8.  Return Type
9.  Type Declarations (optional)
10. Throws / Errors (optional)
11. Environment Strategy (optional)
12. Design Notes
13. When To Use
14. When Not To Use
15. Summary

------------------------------------------------------------------------

# What Should NOT Be in Utility READMEs

The following information belongs in the **library root README**, not in
individual utilities:

-   package installation instructions
-   global library configuration
-   duplicated project documentation
