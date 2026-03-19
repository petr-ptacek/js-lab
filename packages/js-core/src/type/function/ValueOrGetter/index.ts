import type { Getter } from "../Getter";

/**
 * Represents a value or a getter function that produces a value.
 *
 * This type allows for flexible value provision, where the value can be
 * provided directly or computed lazily via a getter function.
 *
 * @example
 * ```ts
 * const config: ValueOrGetter<string> = "default";
 * const configGetter: ValueOrGetter<string> = () => "computed";
 * ```
 *
 * @since 1.0.0
 */
export type ValueOrGetter<TResult> = TResult | Getter<TResult>;
