import { expectTypeOf } from "vitest";
import type { PrimitiveValue } from "../../types";
import { describeIs } from "./test-utils";
import { isPrimitive } from "./isPrimitive";

describeIs<PrimitiveValue>("isPrimitive", isPrimitive, {
  valid: [
    Symbol(),
    1,
    1.15,
    "",
    true,
    null,
    undefined,
    1n,
  ],
  invalid: [
    new Date(),
    {},
    [],
    new Set(),
    new Map(),
    Object(1n),
  ],
  typeTest: (value) => {
    expectTypeOf(value).toEqualTypeOf<PrimitiveValue>();
  },
});
