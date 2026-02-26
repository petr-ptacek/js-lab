# Changesets Workflow -- js-lab Monorepo

This document defines the standardized release workflow using Changesets
for the `js-lab` monorepo.

Packages: - @petr-ptacek/js-core - @petr-ptacek/vue-core

------------------------------------------------------------------------

## 1. Purpose

Changesets is used for:

-   Controlled semantic versioning
-   Automatic changelog generation
-   Coordinated publishing of multiple packages
-   Safe handling of internal package dependencies

It replaces manual version bumps and manual changelog editing.

------------------------------------------------------------------------

## 2. Core Concept

The workflow has three phases:

1)  Create a changeset (declare the change)
2)  Run version step (bump versions + generate changelog)
3)  Publish packages (npm + git tags)

------------------------------------------------------------------------

## 3. Creating a Changeset

After completing a feature or fix:

``` bash
pnpm changeset
```

The CLI will ask:

-   Which package was modified?
-   What type of change? (patch / minor / major)
-   Short description of the change

It creates a file inside:

    .changeset/<random-name>.md

Example:

``` md
---
"@petr-ptacek/js-core": minor
---

Add new type guard isNonEmptyString
```

Commit this file:

``` bash
git add .
git commit -m "chore: add changeset for new feature"
```

This does NOT bump the version yet.

------------------------------------------------------------------------

## 4. Change Types (SemVer)

### patch

-   Bug fixes
-   Internal improvements
-   No API changes

### minor

-   New feature
-   Backward compatible API additions

### major

-   Breaking changes
-   Removed or modified API behavior

------------------------------------------------------------------------

## 5. Version Step (Prepare Release)

When ready to release:

``` bash
pnpm changeset version
```

This will:

-   Update versions in package.json files
-   Update internal dependency versions
-   Generate CHANGELOG.md files
-   Remove processed .changeset files

Commit the changes:

``` bash
git add .
git commit -m "chore: version packages"
```

------------------------------------------------------------------------

## 6. Publish Step

Publish packages:

``` bash
pnpm changeset publish
```

This will:

-   Publish updated packages to npm
-   Create git tags (e.g. @petr-ptacek/js-core@0.1.0)

------------------------------------------------------------------------

## 7. Typical Workflow

### During Development

1.  Make code changes
2.  Commit
3.  Run `pnpm changeset`
4.  Commit the generated changeset file

### Release

1.  Run `pnpm changeset version`
2.  Commit updated versions + changelog
3.  Run `pnpm changeset publish`

------------------------------------------------------------------------

## 8. Internal Dependency Handling

If:

-   js-core is updated
-   vue-core depends on js-core

Changesets automatically:

-   Updates vue-core dependency version
-   Bumps vue-core version if necessary

This ensures consistent dependency graphs.

------------------------------------------------------------------------

## 9. Rules

-   Never manually edit package.json version
-   Never manually edit CHANGELOG.md
-   Every releasable change must include a changeset
-   Every release is tag-based

------------------------------------------------------------------------

## 10. Summary

Changesets provides:

-   Deterministic versioning
-   Automated changelog management
-   Safe multi-package publishing
-   Proper semantic version control

It is the single source of truth for the release process.
