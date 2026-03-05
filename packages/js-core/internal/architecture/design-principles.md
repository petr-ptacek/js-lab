# js-core Design Principles

This document defines the **design philosophy** of the
`@petr-ptacek/js-core` library.

It describes how utilities should be designed and what kinds of
utilities belong in the library.

These principles help maintain:

-   long-term API consistency
-   minimal complexity
-   predictable behavior
-   high code quality

------------------------------------------------------------------------

# Purpose of js-core

`js-core` provides **small, focused JavaScript utilities** designed to
solve common problems in a predictable and type-safe way.

The library focuses on:

-   practical utility functions
-   small composable primitives
-   zero or minimal dependencies
-   strong TypeScript support

The goal is **not to become a large general-purpose utility framework**.

------------------------------------------------------------------------

# Core Philosophy

## Small and Focused Utilities

Each utility should solve **one clear problem**.

Good examples:

    parseJSONSafe()
    createUUIDV4()
    withTryCatch()

Avoid utilities that combine multiple unrelated behaviors.

Bad example:

    processDataAndHandleErrors()

------------------------------------------------------------------------

## Prefer Platform APIs

Whenever possible, rely on **native JavaScript or Web APIs**.

Example:

``` ts
crypto.randomUUID()
```

instead of introducing external dependencies.

External libraries should only be used if they provide **significant
value**.

------------------------------------------------------------------------

## Zero or Minimal Dependencies

Utilities should avoid dependencies unless absolutely necessary.

Reasons:

-   smaller bundle size
-   easier maintenance
-   fewer breaking changes

If a dependency is required, it must provide clear benefits.

------------------------------------------------------------------------

## Predictable Behavior

Utilities should behave in a **simple and predictable way**.

Rules:

-   avoid hidden side effects
-   avoid implicit global state
-   prefer explicit inputs and outputs

Example:

    parseJSONSafe(string) -> Result

rather than throwing unexpected errors.

------------------------------------------------------------------------

## TypeScript First

Type safety is a primary design goal.

Utilities should:

-   provide accurate TypeScript types
-   support type inference
-   avoid `any` whenever possible

When applicable, prefer **type guards**:

    isDefined(value): value is NonNullable<T>

------------------------------------------------------------------------

## Composability

Utilities should be designed to **work well together**.

Example:

    withTryCatch(
      () => parseJSONSafe(data)
    )

Composable primitives allow building more complex behaviors without
increasing library complexity.

------------------------------------------------------------------------

# API Design Guidelines

## Clear Naming

Naming must follow the rules defined in:

    docs/architecture/naming-conventions.md

Function names must clearly describe behavior.

------------------------------------------------------------------------

## Avoid Over-engineering

Utilities should remain simple.

Avoid:

-   complex configuration objects
-   excessive abstraction
-   unnecessary options

Prefer simple APIs.

Good:

    parseJSONSafe(value)

Bad:

    parseJSONSafe(value, {
      throwOnError: false,
      logErrors: true,
      allowComments: false
    })

------------------------------------------------------------------------

## Stable Public API

Once a utility is exported, it becomes part of the **public API**.

Avoid breaking changes whenever possible.

If changes are necessary, follow semantic versioning.

------------------------------------------------------------------------

# When to Add a New Utility

A new utility should be added if:

-   the functionality is generally useful
-   the implementation is small
-   it solves a common problem
-   it improves developer experience
-   it fits the design principles of the library

------------------------------------------------------------------------

# When NOT to Add a Utility

Do not add utilities that:

-   duplicate native JavaScript APIs
-   introduce heavy dependencies
-   solve very specific edge cases
-   belong to a higher-level framework

Example utilities that do **not belong** in `js-core`:

-   UI helpers
-   DOM manipulation helpers
-   framework-specific logic

Those should belong to other packages such as `vue-core`.

------------------------------------------------------------------------

# Relationship to Other Packages

`js-core` should remain **framework-agnostic**.

Framework-specific utilities belong in separate packages such as:

    @petr-ptacek/vue-core

This separation keeps the core library portable and reusable.

------------------------------------------------------------------------

# Long-Term Goals

The long-term vision for `js-core` is to maintain:

-   a small but high-quality utility set
-   predictable API design
-   minimal maintenance overhead
-   strong TypeScript support

The library should prioritize **quality over quantity**.
