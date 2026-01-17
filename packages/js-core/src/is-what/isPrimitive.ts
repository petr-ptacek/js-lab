import { isBigint }            from "./isBigint";
import { isBoolean }           from "./isBoolean";
import { isNull }              from "./isNull";
import { isNumber }            from "./isNumber";
import { isString }            from "./isString";
import { isSymbol }            from "./isSymbol";
import { isUndefined }         from "./isUndefined";
import type { PrimitiveValue } from "../types";

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
