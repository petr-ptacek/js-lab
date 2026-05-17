# Publishing Guide

Step-by-step guide for releasing a new version of `@petr-ptacek/js-core` to npm.

## Prerequisites

- npm login: `npm whoami` should return your username. If not, run `npm login`.
- All changes committed and pushed to `main`.

---

## 1. Prepare changesets _(skip if already done during development)_

Every change that affects the public API needs a changeset. If you've been creating them during development,
**skip directly to step 2**. If not, create one now:

```bash
pnpm changeset
```

Select `@petr-ptacek/js-core`, choose the bump type:

- `patch` — bug fixes, internal changes
- `minor` — new features, non-breaking additions
- `major` — breaking changes

---

## 2. Dry run (optional but recommended)

Verify the build, types and tests pass, and preview what npm would publish:

```bash
pnpm --filter @petr-ptacek/js-core run release:dry
```

This runs `typecheck + test + build` and then `npm publish --dry-run` so you can inspect the package contents without
actually publishing.

---

## 3. Bump version

Apply all pending changesets — updates `package.json` version and generates/updates `CHANGELOG.md`:

```bash
pnpm changeset:version
```

Review the changes:

- `packages/js-core/package.json` — new version number
- `packages/js-core/CHANGELOG.md` — generated changelog entry

Commit the version bump:

```bash
git add packages/js-core/package.json packages/js-core/CHANGELOG.md
git commit -m "release(@petr-ptacek/js-core): v<version>"
```

---

## 4. Publish

```bash
pnpm changeset:publish
```

This runs `prepublishOnly` (`clean + typecheck + test + build`) automatically before publishing to npm.

---

## 5. Push with tags

Changesets creates a git tag for the release. Push both commits and tags:

```bash
git push --follow-tags
```

---

## Version bump reference

| Change type                | Example                         | Bump    |
| -------------------------- | ------------------------------- | ------- |
| Bug fix, internal refactor | fix a type error                | `patch` |
| New utility, new export    | add `DotPathKeys`               | `minor` |
| Breaking change            | remove array support from `get` | `major` |

Current version: check `packages/js-core/package.json`.
