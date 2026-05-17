import type { CSSClassAtom } from "../CSSClassAtom";

/**
 * A CSS class binding value — either a single atom or an array of atoms.
 *
 * Matches what Vue's `:class` binding and `normalizeClass` accept at the top level.
 * Use this as the type for `ui` prop entries in components that accept external class overrides.
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * const cls: CSSClassValue = "btn btn-primary";
 * const cls: CSSClassValue = { active: true };
 * const cls: CSSClassValue = ["btn", { active: true }, null];
 * ```
 */
export type CSSClassValue = CSSClassAtom | CSSClassAtom[];
