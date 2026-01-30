/**
 * Returns the enumerable own property `[key, value]` pairs of an object
 * with preserved key and value types.
 *
 * This is a typed wrapper around `Object.entries`.
 *
 * @example
 * ```ts
 * const user = {
 *   id: 1,
 *   name: "John",
 * };
 *
 * for (const [key, value] of entries(user)) {
 *   // key: "id" | "name"
 *   // value: number | string
 * }
 * ```
 *
 * @since 1.0.0
 */
export function entries<T extends object>(obj: T) {
  return Object.entries(obj) as {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];
}
