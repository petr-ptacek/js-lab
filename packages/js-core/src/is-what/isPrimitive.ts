import { isBigint }            from "./isBigint";
import { isBoolean }           from "./isBoolean";
import { isNull }              from "./isNull";
import { isNumber }            from "./isNumber";
import { isString }            from "./isString";
import { isSymbol }            from "./isSymbol";
import { isUndefined }         from "./isUndefined";
import type { PrimitiveValue } from "../types";

/**
 * Checks whether the given value is a JavaScript primitive.
 *
 * Acts as a type guard and narrows the value to `PrimitiveValue` when true.
 *
 * A primitive value is one of:
 * `string`, `number`, `boolean`, `symbol`, `bigint`, `null`, or `undefined`.
 *
 * @since 1.0.0
 *
 * @param value The value to test.
 * @returns `true` if the value is a primitive value, otherwise `false`.
 *
 * @example
 * ```ts
 * isPrimitive("text");     // true
 * isPrimitive(42);         // true
 * isPrimitive(null);       // true
 * isPrimitive({});         // false
 * isPrimitive([]);         // false
 * ```
 *
 * @example
 * ```ts
 * const value: unknown = Symbol("id");
 *
 * if (isPrimitive(value)) {
 *   // value is PrimitiveValue
 * }
 * ```
 */
export function isPrimitive(value: unknown): value is PrimitiveValue {
  return (
    isString(value) ||
    isNumber(value) ||
    isNull(value) ||
    isUndefined(value) ||
    isBoolean(value) ||
    isSymbol(value) ||
    isBigint(value)
  );
}
