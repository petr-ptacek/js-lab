# js-core Naming Conventions

This document defines naming conventions for utilities inside the
**@petr-ptacek/js-core** package.

The goal of these conventions is to ensure:

-   consistent and predictable API design
-   readable imports
-   easy code navigation
-   long‑term maintainability
-   good compatibility with AI coding assistants

Naming rules apply to:

-   exported functions
-   module names
-   implementation files
-   utility categories

------------------------------------------------------------------------

# Core Principles

## Action‑oriented naming

Function names should describe **what the function does**.

Examples:

    createUUIDV4()
    parseJSONSafe()
    withTryCatch()
    isPromise()

Avoid vague names.

Bad examples:

    handleUUID()
    doJSON()
    helperFunction()

------------------------------------------------------------------------

## File name = exported function name

The implementation file must match the exported function.

Example:

    createUUIDV4/
      createUUIDV4.ts
      index.ts

    export { createUUIDV4 } from './createUUIDV4'

Benefits:

-   easy code navigation
-   predictable structure
-   improved searchability
-   better AI tooling support

------------------------------------------------------------------------

## Module name = function name

The directory name must match the exported function name.

Example:

    createUUIDV4/
      index.ts
      createUUIDV4.ts

Avoid structures like:

    uuid/
      create.ts

------------------------------------------------------------------------

# Standard Naming Prefixes

Utilities should follow a **small and consistent vocabulary of
prefixes**.

------------------------------------------------------------------------

## create

Used for functions that **produce new values or objects**.

Examples:

    createUUIDV4
    createAbortController

Avoid:

    generateUUID
    makeUUID
    buildUUID

Use `create` as the default creation verb.

------------------------------------------------------------------------

## parse

Used when converting **text or external data into structured values**.

Examples:

    parseJSONSafe
    parseQueryString

------------------------------------------------------------------------

## to

Used for **type conversion utilities**.

Examples:

    toNumber
    toBoolean
    toArray

------------------------------------------------------------------------

## is

Used for **boolean validation checks**.

Prefer implementing these as **TypeScript type guards** when possible.

Examples:

    isPromise
    isDefined
    isPlainObject

------------------------------------------------------------------------

## has

Used for **existence checks**.

Examples:

    hasProperty
    hasOwnKey

------------------------------------------------------------------------

## assert

Used for **runtime validation that throws on failure**.

Examples:

    assertDefined
    assertNever

------------------------------------------------------------------------

## with

Used for **function wrappers or behavioral decorators**.

Examples:

    withTryCatch
    withTimeout
    withRetry

This naming pattern is common in functional utilities.

------------------------------------------------------------------------

# Suffix Conventions

Suffixes may be used to differentiate behavior variants.

Examples:

    withTryCatchSync
    parseJSONSafe

Guidelines:

-   prefer clear semantic suffixes
-   avoid cryptic abbreviations

------------------------------------------------------------------------

# Avoid These Naming Patterns

## get

Avoid `get` unless the function truly acts as a **getter for an existing
value**.

Bad:

    getUUID()

Better:

    createUUIDV4()

------------------------------------------------------------------------

## Generic names

Avoid generic terms such as:

    utils
    helpers
    common
    tools
    misc

These names lose semantic meaning and make searching difficult.

------------------------------------------------------------------------

## Unclear abbreviations

Avoid abbreviations unless they are industry standard.

Acceptable:

    UUID
    URL
    JSON
    HTML

Avoid:

    cfg
    obj
    val
    tmp

------------------------------------------------------------------------

# API Consistency Rules

When introducing a new utility:

1.  Choose the correct **prefix category**
2.  Ensure the name clearly describes the behavior
3.  Ensure the directory name matches the function
4.  Ensure the implementation file matches the function
5.  Avoid introducing new verbs unnecessarily

------------------------------------------------------------------------

# Example Module

    createUUIDV4/
      index.ts
      createUUIDV4.ts
      __tests__/
      README.md

Export:

``` ts
export { createUUIDV4 } from "./createUUIDV4"
```

Usage:

``` ts
import { createUUIDV4 } from "@petr-ptacek/js-core"

const uuid = createUUIDV4()
```

------------------------------------------------------------------------

# Summary

Key rules:

-   function names must describe behavior
-   directory name = function name
-   file name = function name
-   use a consistent set of prefixes
-   avoid generic helper names

Recommended prefixes:

    create
    parse
    to
    is
    has
    assert
    with
