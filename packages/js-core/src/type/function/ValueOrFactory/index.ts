import type { Factory } from "../Factory";

/**
 * Represents a value or a factory function that produces a value.
 *
 * This type allows for flexible value provision, where the value can be
 * provided directly or computed lazily via a factory function.
 *
 * @example
 * ```ts
 * const config: ValueOrFactory<string> = "default";
 * const configFactory: ValueOrFactory<string, [number]> = (n) => `computed ${n}`;
 * ```
 *
 * @since 1.0.0
 */
export type ValueOrFactory<TResult, TArgs extends unknown[] = []> =
  TResult | Factory<TResult, TArgs>;
