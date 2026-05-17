/**
 * A single CSS class binding atom — one of the shapes Vue's `:class` binding and `normalizeClass` accept.
 *
 * - `string` — a plain class name or space-separated list
 * - `Record<string, boolean>` — object where keys are class names and values toggle them
 * - `null | undefined` — explicitly absent, treated as no class
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * const cls: CSSClassAtom = "btn btn-primary";
 * const cls: CSSClassAtom = { active: true, disabled: false };
 * const cls: CSSClassAtom = null;
 * ```
 */
export type CSSClassAtom = string | Record<string, boolean> | null | undefined;
