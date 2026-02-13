# Commit Message Policy

Monorepo: @petr-ptacek/js-core + @petr-ptacek/vue-core

## Purpose

This document defines strict commit message rules for maintaining a
clean, scalable, and automatable Git history across the monorepo.

Goals:

-   High signal-to-noise ratio in `git log`
-   Deterministic changelog generation
-   Compatibility with semantic versioning (semver)
-   Clear API change visibility
-   Automation readiness (semantic-release, CI pipelines)

------------------------------------------------------------------------

# 1. Commit Format (Conventional Commits)

We follow the Conventional Commits specification.

Format:

    <type>(<scope>): <short summary>

    <optional body>

    <optional footer>

Examples:

    feat(js-core): add scaleByAspectRatio utility
    fix(vue-core): correct ContentFrame slot rendering order
    refactor(vue-core/preloader): extract visibility logic to composable

------------------------------------------------------------------------

# 2. Allowed Types

Only the following types are allowed:

-   feat → New feature (affects public behavior)
-   fix → Bug fix
-   refactor → Internal refactor (no behavior change)
-   perf → Performance improvement
-   docs → Documentation only
-   test → Tests only
-   chore → Tooling, configuration, maintenance
-   build → Build system changes
-   ci → CI/CD changes
-   style → Formatting only (no logic change)

"change" is NOT allowed.

------------------------------------------------------------------------

# 3. Scope Rules

Scope must reflect either:

A)  Package level:

-   js-core
-   vue-core

B)  Specific module/component/composable:

-   js-core/scale
-   js-core/types
-   vue-core/preloader
-   vue-core/content-frame
-   vue-core/useElementOverflow

Examples:

    feat(vue-core/content-frame): add contentBefore and contentAfter slots
    refactor(js-core/scale): simplify rounding logic

------------------------------------------------------------------------

# 4. Subject Line Rules

The summary line MUST:

-   Use imperative mood (add, fix, remove, update)
-   Not end with a period
-   Be ≤ 72 characters
-   Be specific and concrete
-   Describe WHAT changed (not how)

Bad:

    fix: bug
    change(vue-core): ContentFrame

Good:

    feat(vue-core/content-frame): add contentBefore slot
    fix(js-core/scale): validate positive finite inputs

------------------------------------------------------------------------

# 5. Body Guidelines

Include a body when:

-   Behavior changes
-   Public API changes
-   Non-trivial design decisions
-   Important trade-offs

Structure:

    What changed
    Why it changed
    Any implications

Example:

    refactor(vue-core/preloader): extract spinner logic to composable

    Moves spinner state handling into usePreloader composable.
    Improves testability and reduces component complexity.
    No public API changes.

------------------------------------------------------------------------

# 6. Breaking Changes

Breaking changes must be explicitly marked.

Option A -- Exclamation mark:

    feat(js-core)!: rename scaleTo to scaleByAspectRatio

Option B -- Footer:

    BREAKING CHANGE: scaleTo has been removed. Use scaleByAspectRatio.

Breaking changes are mandatory for:

-   Removed exports
-   Renamed public APIs
-   Signature changes
-   Behavioral contract changes

------------------------------------------------------------------------

# 7. Atomic Commits

Rules:

-   One logical change per commit
-   Do not mix feature + refactor + test in one commit
-   Tests must accompany new features and bug fixes (js-core mandatory)

Bad:

    feat: add feature + refactor + fix tests

Good:

    refactor(js-core/scale): simplify validation logic
    test(js-core/scale): add edge case tests
    feat(js-core/scale): support custom rounding function

------------------------------------------------------------------------

# 8. Merge Strategy

-   Feature branches only
-   Squash merge into main
-   No WIP commits in main
-   Clean linear history

------------------------------------------------------------------------

# 9. Automation Strategy

The policy is designed for:

-   commitlint enforcement
-   semantic-release compatibility
-   automated changelog generation
-   per-package release automation

------------------------------------------------------------------------

# 10. Summary

Strict structure is required.

Every commit must:

-   Use approved type
-   Include valid scope
-   Be written in imperative form
-   Be precise and minimal
-   Explicitly mark breaking changes

This policy is mandatory for both js-core and vue-core.
