# js-core Module Creation Checklist

This checklist defines the **standard process for adding a new utility
module** to the `@petr-ptacek/js-core` package.

The goal is to guarantee:

-   consistent project structure
-   predictable API design
-   proper test coverage
-   documentation for every utility
-   maintainable long‑term architecture

Every new utility should follow this process.

------------------------------------------------------------------------

# 1. Choose a Proper Name

Follow the rules defined in:

    docs/architecture/naming-conventions.md

The name should:

-   describe the behavior
-   follow the allowed prefix vocabulary
-   be unique within the library

Examples:

    createUUIDV4
    parseJSONSafe
    withTryCatch
    isPromise

------------------------------------------------------------------------

# 2. Create Module Directory

Create a directory inside:

    packages/js-core/src/

Example:

    src/createUUIDV4/

------------------------------------------------------------------------

# 3. Create Canonical Module Structure

Inside the directory create the following files:

    createUUIDV4/
      index.ts
      createUUIDV4.ts
      __tests__/
      README.md

Optional files when needed:

    types.ts
    utils.ts

Final example:

    createUUIDV4/
      index.ts
      createUUIDV4.ts
      types.ts
      utils.ts
      __tests__/
        createUUIDV4.test.ts
      README.md

------------------------------------------------------------------------

# 4. Implement the Utility

Create the main implementation file:

    createUUIDV4.ts

Example:

``` ts
export function createUUIDV4(): string {
  return crypto.randomUUID()
}
```

Guidelines:

-   implementation should be small and focused
-   avoid unnecessary dependencies
-   prefer platform APIs when possible

------------------------------------------------------------------------

# 5. Define the Public API

Edit:

    index.ts

Only export the public API.

Example:

``` ts
export { createUUIDV4 } from "./createUUIDV4"
```

Rules:

-   no implementation logic
-   no internal helpers
-   export only stable public API

------------------------------------------------------------------------

# 6. Add Tests

Create test file:

    __tests__/createUUIDV4.test.ts

Example:

``` ts
import { describe, it, expect } from "vitest"
import { createUUIDV4 } from "../createUUIDV4"

describe("createUUIDV4", () => {
  it("returns a string", () => {
    const uuid = createUUIDV4()
    expect(typeof uuid).toBe("string")
  })
})
```

Guidelines:

-   test behavior, not implementation details
-   include edge cases
-   aim for deterministic tests

------------------------------------------------------------------------

# 7. Write Documentation

Create:

    README.md

Recommended structure:

    # createUUIDV4

    Short description.

    ## Usage

    Code example.

    ## Why this utility exists

    Explain motivation.

    ## Design notes

    Explain trade-offs and decisions.

    ## When to use

    Explain typical use cases.

Documentation should focus on:

-   purpose of the utility
-   usage examples
-   design reasoning
-   limitations

------------------------------------------------------------------------

# 8. Export From Package Root

Add export to:

    src/index.ts

Example:

``` ts
export * from "./createUUIDV4"
```

This makes the utility available via:

``` ts
import { createUUIDV4 } from "@petr-ptacek/js-core"
```

------------------------------------------------------------------------

# 9. Run Tests

Run the project test suite:

    pnpm run test

Ensure:

-   all tests pass
-   no regressions occur

------------------------------------------------------------------------

# 10. Create Changeset

Create a changeset describing the new utility.

Example:

    pnpm changeset

Select:

    patch

Describe the change.

Example message:

    Add createUUIDV4 utility

------------------------------------------------------------------------

# Summary

Adding a new utility always requires:

-   module directory
-   implementation
-   public API export
-   tests
-   documentation
-   root export
-   changeset

Following this checklist guarantees that every utility in `js-core`
meets the same quality and structure standards.
